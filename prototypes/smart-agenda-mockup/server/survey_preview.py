"""Local, bounded survey OCR. Images and raw recognized text are never persisted."""
import base64
import binascii
import os
import re
import shutil
import struct
import subprocess
import tempfile
import threading
import time
import unicodedata
import zlib

MAX_IMAGE = 1_500_000
MAX_PIXELS = 20_000_000
SLOTS = threading.BoundedSemaphore(2)
RATE = {}
RATE_LOCK = threading.Lock()
WARNINGS = {
    "ocr_unavailable": "La lectura no está disponible. Puedes ingresar la información manualmente.",
    "ocr_unreadable": "No pudimos leer bien el survey. Toma otra foto o ingresa la información.",
    "ocr_timeout": "La lectura tardó demasiado. Puedes volver a intentar o ingresar la información.",
}


def available():
    return bool(shutil.which("tesseract"))


def empty_candidates():
    return {key: {"value": [] if key == "interests" else "", "source": "survey", "state": "missing"}
            for key in ("primaryName", "companionName", "language", "interests", "notes")}


def normalize(value):
    return "".join(c for c in unicodedata.normalize("NFKD", value.casefold()) if not unicodedata.combining(c)).strip()


def parse_text(text):
    candidates = empty_candidates()
    labels = {"nombre": "primaryName", "nombre visitante 1": "primaryName", "visitante 1": "primaryName",
              "nombre principal": "primaryName", "acompanante": "companionName", "nombre visitante 2": "companionName",
              "visitante 2": "companionName", "idioma": "language", "idioma preferido": "language",
              "intereses": "interests", "notas": "notes"}
    seen = set()
    for line in text[:30_000].splitlines():
        if ":" not in line:
            continue
        label, value = line.split(":", 1)
        key = labels.get(normalize(label))
        value = value.strip()
        if not key or key in seen or not value or any(ord(c) < 32 for c in value):
            continue
        seen.add(key)
        if key == "language":
            value = {"es": "es", "espanol": "es", "spanish": "es", "en": "en", "ingles": "en", "english": "en", "otro": "otro"}.get(normalize(value), "")
        elif key == "interests":
            value = [v.strip() for v in re.split(r"[,;]", value) if v.strip()]
            if len(value) > 5 or any(len(v) > 60 for v in value):
                value = []
        elif len(value) > (400 if key == "notes" else 80):
            value = ""
        if value:
            candidates[key] = {"value": value, "source": "survey", "state": "review"}
    return candidates


def png_dimensions(raw):
    """Validate PNG container/chunk checksums, not optical readability or full decoding."""
    if raw[:8] != b"\x89PNG\r\n\x1a\n":
        return 0, 0
    offset, width, height, color, chunks = 8, 0, 0, -1, 0
    seen_header = seen_data = seen_palette = data_ended = False
    while offset + 12 <= len(raw):
        chunks += 1
        length = int.from_bytes(raw[offset:offset + 4], "big")
        tag = raw[offset + 4:offset + 8]
        end = offset + 12 + length
        if chunks > 4096 or end > len(raw) or not re.fullmatch(rb"[A-Za-z]{4}", tag):
            return 0, 0
        payload = raw[offset + 8:offset + 8 + length]
        if zlib.crc32(tag + payload) != int.from_bytes(raw[end - 4:end], "big"):
            return 0, 0
        if not seen_header and tag != b"IHDR":
            return 0, 0
        if tag == b"IHDR":
            if seen_header or length != 13:
                return 0, 0
            width, height, depth, color, compression, filtering, interlace = struct.unpack(">IIBBBBB", payload)
            valid_depths = {0: {1, 2, 4, 8, 16}, 2: {8, 16}, 3: {1, 2, 4, 8}, 4: {8, 16}, 6: {8, 16}}
            if depth not in valid_depths.get(color, set()) or compression or filtering or interlace not in (0, 1):
                return 0, 0
            seen_header = True
        elif tag == b"PLTE":
            if seen_palette or seen_data or not length or length > 768 or length % 3:
                return 0, 0
            seen_palette = True
        elif tag == b"IDAT":
            if data_ended or (color == 3 and not seen_palette):
                return 0, 0
            seen_data = seen_data or length > 0
        elif tag == b"IEND":
            return (width, height) if length == 0 and seen_data and end == len(raw) else (0, 0)
        elif 65 <= tag[0] <= 90:
            return 0, 0
        elif seen_data:
            data_ended = True
        offset = end
    return 0, 0


def jpeg_dimensions(raw):
    """Validate bounded JPEG segments/frame/scan framing; Tesseract still decodes pixels."""
    if raw[:2] != b"\xff\xd8":
        return 0, 0
    offset, width, height, components, entropy, segments = 2, 0, 0, 0, 0, 0
    seen_scan = False
    while offset + 1 < len(raw):
        if raw[offset] != 255:
            return 0, 0
        while offset < len(raw) and raw[offset] == 255:
            offset += 1
        if offset >= len(raw):
            return 0, 0
        marker = raw[offset]
        offset += 1
        segments += 1
        if segments > 4096:
            return 0, 0
        if marker == 0xD9:
            return (width, height) if seen_scan and entropy and offset == len(raw) else (0, 0)
        if marker in (0, 0xD8) or 0xD0 <= marker <= 0xD7 or offset + 2 > len(raw):
            return 0, 0
        length = int.from_bytes(raw[offset:offset + 2], "big")
        if length < 2 or offset + length > len(raw):
            return 0, 0
        body = raw[offset + 2:offset + length]
        if marker in (0xC0, 0xC1, 0xC2):
            if width or len(body) < 6 or body[0] not in (8, 12):
                return 0, 0
            height, width = int.from_bytes(body[1:3], "big"), int.from_bytes(body[3:5], "big")
            components = body[5]
            if components not in (1, 2, 3, 4) or length != 8 + 3 * components:
                return 0, 0
        elif marker == 0xDA:
            if not width or not body or not 1 <= body[0] <= components or length != 6 + 2 * body[0]:
                return 0, 0
            seen_scan = True
        offset += length
        if marker == 0xDA:
            while offset < len(raw):
                if raw[offset] != 255:
                    entropy += 1
                    offset += 1
                elif offset + 1 < len(raw) and (raw[offset + 1] == 0 or 0xD0 <= raw[offset + 1] <= 0xD7):
                    entropy += raw[offset + 1] == 0
                    offset += 2
                else:
                    break
    return 0, 0


def image_bytes(payload):
    if not isinstance(payload, dict) or set(payload) != {"image", "mime"}:
        return None, "invalid_image"
    mime, blob = payload.get("mime"), payload.get("image")
    if mime not in ("image/jpeg", "image/png") or not isinstance(blob, str):
        return None, "invalid_image"
    if blob.startswith("data:"):
        prefix = f"data:{mime};base64,"
        if not blob.startswith(prefix):
            return None, "invalid_image"
        blob = blob[len(prefix):]
    try:
        raw = base64.b64decode(blob, validate=True)
    except (binascii.Error, ValueError):
        return None, "invalid_image"
    if len(raw) > MAX_IMAGE:
        return None, "image_too_large"
    if mime == "image/png":
        width, height = png_dimensions(raw)
    else:
        width, height = jpeg_dimensions(raw)
    if not width or not height or width * height > MAX_PIXELS or max(width, height) > 12000:
        return None, "invalid_image"
    return raw, ""


def rate_allowed(actor):
    now = time.monotonic()
    with RATE_LOCK:
        for key in list(RATE):
            RATE[key] = [t for t in RATE[key] if now - t < 60]
            if not RATE[key]:
                del RATE[key]
        recent = RATE.setdefault(actor, [])
        if len(recent) >= 6:
            return False
        recent.append(now)
        return True


def preview(raw, mime):
    result = {"ok": True, "engine": "none", "candidates": empty_candidates(), "warnings": []}
    def warn(code):
        result["warnings"] = [{"code": code, "message": WARNINGS[code]}]
        return result
    binary = shutil.which("tesseract")
    if not binary:
        return warn("ocr_unavailable")
    if not SLOTS.acquire(blocking=False):
        return {"busy": True}
    path = None
    deadline = time.monotonic() + 20
    try:
        fd, path = tempfile.mkstemp(prefix="sa-survey-", suffix=".png" if mime == "image/png" else ".jpg")
        with os.fdopen(fd, "wb") as handle:
            handle.write(raw)
        languages = subprocess.run([binary, "--list-langs"], capture_output=True, timeout=max(0.01, deadline - time.monotonic()), check=False)
        lang = "spa+eng" if b"spa" in languages.stdout.splitlines() else "eng"
        process = subprocess.run([binary, path, "stdout", "-l", lang, "--psm", "6"], capture_output=True,
                                 timeout=max(0.01, deadline - time.monotonic()), check=False)
        result["engine"] = "tesseract"
        result["candidates"] = parse_text(process.stdout[:120_000].decode("utf-8", "replace"))
        if not any(c["state"] == "review" for c in result["candidates"].values()):
            return warn("ocr_unreadable")
        return result
    except subprocess.TimeoutExpired:
        return warn("ocr_timeout")
    except OSError:
        return warn("ocr_unavailable")
    finally:
        if path:
            try:
                os.unlink(path)
            except OSError:
                pass
        SLOTS.release()
