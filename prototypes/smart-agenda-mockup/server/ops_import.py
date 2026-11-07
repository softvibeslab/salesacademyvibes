"""Map CSV, JSON, pasted text or local OCR into tour preview rows. No writes."""

from __future__ import annotations

import base64
import csv
import io
import json
import os
import re
import shutil
import subprocess
import tempfile
from datetime import datetime

MAX_ROWS = 40
MAX_IMAGE = 1_500_000
MAX_NOTE = 80
CLOCK_IN = re.compile(r"^(\d{1,2}):([0-5]\d)(?::[0-5]\d)?$")
CLOCK_RANGE = re.compile(
    r"(\d{1,2}:[0-5]\d(?::[0-5]\d)?)\s*[-–aàA]\s*(\d{1,2}:[0-5]\d(?::[0-5]\d)?)"
)
CLOCK_ONE = re.compile(r"\b(\d{1,2}:[0-5]\d(?::[0-5]\d)?)\b")
LEAD_FULL = re.compile(r"Lead\s*#\s*(\d{3,4})", re.I)
LEAD_HASH = re.compile(r"#(\d{3,4})\b")
DAY = re.compile(r"^(\d{4})-(\d{2})-(\d{2})$")
DAY_DMY = re.compile(r"^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$")
EMAIL_RE = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+")
PHONE_RE = re.compile(r"(?:\d[ \-]?){7,}")
STATUSES = {"confirmado", "en_curso", "pendiente", "cancelado"}
STATUS_MAP = {
    "confirmado": "confirmado",
    "confirmed": "confirmado",
    "en curso": "en_curso",
    "en_curso": "en_curso",
    "curso": "en_curso",
    "pendiente": "pendiente",
    "pending": "pendiente",
    "cancelado": "cancelado",
    "cancelled": "cancelado",
    "canceled": "cancelado",
}
HEADER_ALIASES = {
    "rep": "rep",
    "repid": "rep",
    "nombre": "rep",
    "asesor": "rep",
    "vendedor": "rep",
    "fecha": "date",
    "date": "date",
    "dia": "date",
    "día": "date",
    "inicio": "start",
    "start": "start",
    "hora": "start",
    "fin": "end",
    "end": "end",
    "hasta": "end",
    "lead": "lead",
    "prospecto": "lead",
    "cliente": "lead",
    "estado": "status",
    "status": "status",
    "nota": "note",
    "note": "note",
    "notas": "note",
}
MONTHS = {
    "ene": 1, "enero": 1, "jan": 1, "january": 1,
    "feb": 2, "febrero": 2, "february": 2,
    "mar": 3, "marzo": 3, "march": 3,
    "abr": 4, "abril": 4, "apr": 4, "april": 4,
    "may": 5, "mayo": 5,
    "jun": 6, "junio": 6, "june": 6,
    "jul": 7, "julio": 7, "july": 7,
    "ago": 8, "agosto": 8, "aug": 8, "august": 8,
    "sep": 9, "septiembre": 9, "september": 9,
    "oct": 10, "octubre": 10, "october": 10,
    "nov": 11, "noviembre": 11, "november": 11,
    "dic": 12, "diciembre": 12, "dec": 12, "december": 12,
}


def parse_clock(raw):
    match = CLOCK_IN.match(str(raw or "").strip())
    if not match:
        return None
    hour = int(match.group(1))
    if hour > 23:
        return None
    return f"{hour:02d}:{match.group(2)}"


def add_hour(start):
    parsed = parse_clock(start)
    if not parsed:
        return None
    hour, minute = (int(part) for part in parsed.split(":"))
    hour = min(hour + 1, 23)
    if hour == 0 and parsed == "23:00":
        return None
    end = f"{hour:02d}:{minute:02d}"
    return end if end > parsed else None


def parse_date(raw, default_date):
    text = str(raw or "").strip()
    if not text:
        return default_date
    if DAY.match(text):
        return text
    dmy = DAY_DMY.match(text)
    if dmy:
        day, month, year = (int(dmy.group(1)), int(dmy.group(2)), int(dmy.group(3)))
        if month > 12 and day <= 12:
            day, month = month, day
        try:
            return datetime(year, month, day).strftime("%Y-%m-%d")
        except ValueError:
            return default_date
    month_match = re.search(
        r"(\d{1,2})\s+([A-Za-zñáéíóú]+)\s+(\d{4})",
        text,
        re.I,
    )
    if month_match:
        month = MONTHS.get(month_match.group(2).lower()[:3]) or MONTHS.get(month_match.group(2).lower())
        if month:
            try:
                return datetime(int(month_match.group(3)), month, int(month_match.group(1))).strftime("%Y-%m-%d")
            except ValueError:
                return default_date
    return default_date


def parse_lead(raw):
    text = str(raw or "").strip()
    match = LEAD_FULL.search(text)
    if match:
        return f"Lead #{match.group(1)}"
    match = LEAD_HASH.search(text)
    if match:
        return f"Lead #{match.group(1)}"
    if re.fullmatch(r"\d{3,4}", text):
        return f"Lead #{text}"
    return ""


def parse_status(raw):
    key = re.sub(r"\s+", " ", str(raw or "").strip().lower())
    return STATUS_MAP.get(key, "")


def fold(value):
    return re.sub(r"[^a-z0-9]", "", str(value or "").lower())


def match_rep(raw, people):
    token = str(raw or "").strip()
    if not token:
        return ""
    folded = fold(token)
    reps = [person for person in people if person.get("role") == "rep"]
    for person in reps:
        if person["id"] == folded or fold(person["name"]) == folded:
            return person["id"]
    first = fold(token.split()[0])
    hits = [person for person in reps if fold(person["name"]) == first or person["id"] == first]
    if len(hits) == 1:
        return hits[0]["id"]
    return ""


def clean_note(raw):
    note = re.sub(r"\s+", " ", str(raw or "")).strip()[:MAX_NOTE]
    if note and (EMAIL_RE.search(note) or PHONE_RE.search(note)):
        return note, "Quita los correos o teléfonos de la nota."
    return note, ""


def empty_visit(default_date):
    return {
        "repId": "",
        "date": default_date,
        "start": "",
        "end": "",
        "lead": "",
        "status": "pendiente",
        "note": "",
    }


def issues_for(visit, people):
    issues = []
    reps = {person["id"] for person in people if person.get("role") == "rep"}
    if visit["repId"] not in reps:
        issues.append("No está en el directorio. Usa Ana, Luis, Mira o Teo.")
    if not re.fullmatch(r"Lead #\d{3,4}", visit.get("lead") or ""):
        issues.append("Usa un Lead # de ejemplo, por ejemplo Lead #4920.")
    start = parse_clock(visit.get("start"))
    end = parse_clock(visit.get("end"))
    if not start or not end:
        issues.append("La hora no es válida.")
    elif start >= end:
        issues.append("La hora de fin va después del inicio.")
    else:
        visit["start"] = start
        visit["end"] = end
    if not DAY.match(visit.get("date") or ""):
        issues.append("La fecha no es válida.")
    if visit.get("status") not in STATUSES:
        visit["status"] = "pendiente"
    note, note_error = clean_note(visit.get("note"))
    visit["note"] = note
    if note_error:
        issues.append(note_error)
    return issues


def clashes(visit, visits, siblings):
    start = parse_clock(visit.get("start"))
    end = parse_clock(visit.get("end"))
    if not start or not end or not visit.get("repId"):
        return False
    probe = {**visit, "start": start, "end": end, "status": visit.get("status") or "pendiente"}
    for other in list(visits) + list(siblings):
        if other.get("repId") != probe["repId"] or other.get("date") != probe["date"]:
            continue
        if other.get("status") == "cancelado" or probe["status"] == "cancelado":
            continue
        other_start = parse_clock(other.get("start")) or other.get("start")
        other_end = parse_clock(other.get("end")) or other.get("end")
        if other_start and other_end and start < other_end and end > other_start:
            return True
    return False


def finalize_row(index, source, raw_visit, people, default_date):
    visit = empty_visit(default_date)
    visit.update({key: raw_visit[key] for key in visit if key in raw_visit and raw_visit[key] not in (None, "")})
    if visit.get("start") and not visit.get("end"):
        visit["end"] = add_hour(visit["start"]) or ""
    visit["date"] = parse_date(visit.get("date"), default_date)
    if visit.get("lead"):
        visit["lead"] = parse_lead(visit["lead"]) or str(visit["lead"]).strip()
    if visit.get("status"):
        visit["status"] = parse_status(visit["status"]) or "pendiente"
    if visit.get("repId"):
        visit["repId"] = match_rep(visit["repId"], people) or fold(visit["repId"])
    issues = issues_for(visit, people)
    return {
        "index": index,
        "selected": not issues,
        "source": str(source or "")[:180],
        "clash": False,
        "issues": issues,
        "visit": visit,
    }


def from_mapping(item, people, default_date):
    if not isinstance(item, dict):
        return None
    lowered = {str(key).strip().lower(): item[key] for key in item}
    mapped = {}
    for key, value in lowered.items():
        alias = HEADER_ALIASES.get(re.sub(r"[^a-z0-9áéíóúñ]", "", key))
        if alias == "rep":
            mapped["repId"] = value
        elif alias:
            mapped[alias] = value
    if "repid" in lowered and "repId" not in mapped:
        mapped["repId"] = lowered["repid"]
    return mapped


def looks_header(cells):
    aliases = 0
    for cell in cells:
        token = re.sub(r"[^a-z0-9áéíóúñ]", "", str(cell).strip().lower())
        if token in HEADER_ALIASES:
            aliases += 1
    return aliases >= 2


def parse_json(text, people, default_date):
    stripped = text.strip()
    if stripped[:1] not in "[{":
        return None
    try:
        payload = json.loads(stripped)
    except json.JSONDecodeError:
        return None
    if isinstance(payload, dict):
        for key in ("rows", "tours", "visits", "items"):
            if isinstance(payload.get(key), list):
                payload = payload[key]
                break
        else:
            payload = [payload]
    if not isinstance(payload, list):
        return None
    rows = []
    for item in payload:
        mapped = from_mapping(item, people, default_date)
        if mapped:
            rows.append((json.dumps(item, ensure_ascii=False)[:180], mapped))
    return rows


def parse_delimited(text, people, default_date):
    sample = text.lstrip()
    if not sample:
        return None
    dialect = csv.excel
    if "\t" in sample.splitlines()[0]:
        dialect = csv.excel_tab
    reader = csv.reader(io.StringIO(sample), dialect)
    table = [row for row in reader if any(str(cell).strip() for cell in row)]
    if not table:
        return None
    header = None
    body = table
    if looks_header(table[0]):
        header = [HEADER_ALIASES.get(re.sub(r"[^a-z0-9áéíóúñ]", "", str(cell).strip().lower()), "") for cell in table[0]]
        body = table[1:]
    elif max(len(row) for row in table) < 4:
        return None
    rows = []
    for raw in body:
        cells = [str(cell).strip() for cell in raw]
        mapped = {}
        if header:
            for index, alias in enumerate(header):
                if not alias or index >= len(cells):
                    continue
                if alias == "rep":
                    mapped["repId"] = cells[index]
                else:
                    mapped[alias] = cells[index]
        else:
            positional = ["repId", "date", "start", "end", "lead", "status", "note"]
            if parse_clock(cells[1] if len(cells) > 1 else ""):
                positional = ["repId", "start", "end", "lead", "status", "note"]
            for index, key in enumerate(positional):
                if index < len(cells) and cells[index]:
                    mapped[key] = cells[index]
        if mapped:
            rows.append((",".join(cells)[:180], mapped))
    return rows or None


def parse_lines(text, people, default_date):
    rows = []
    for line in text.splitlines():
        source = line.strip()
        if not source:
            continue
        mapped = {}
        range_match = CLOCK_RANGE.search(source)
        clocks = CLOCK_ONE.findall(source)
        if range_match:
            mapped["start"] = range_match.group(1)
            mapped["end"] = range_match.group(2)
        elif len(clocks) >= 2:
            mapped["start"] = clocks[0]
            mapped["end"] = clocks[1]
        elif clocks:
            mapped["start"] = clocks[0]
        lead = parse_lead(source)
        if lead:
            mapped["lead"] = lead
        date = parse_date(source, "")
        if date:
            mapped["date"] = date
        leftover = CLOCK_RANGE.sub(" ", source)
        leftover = LEAD_FULL.sub(" ", leftover)
        leftover = LEAD_HASH.sub(" ", leftover)
        leftover = CLOCK_ONE.sub(" ", leftover)
        leftover = re.sub(r"\d{4}-\d{2}-\d{2}", " ", leftover)
        leftover = DAY_DMY.sub(" ", leftover)
        words = leftover.split()
        status = ""
        kept = []
        for word in words:
            maybe = parse_status(word)
            if maybe:
                status = maybe
            else:
                kept.append(word)
        if status:
            mapped["status"] = status
        if kept:
            mapped["repId"] = kept[0]
            if len(kept) > 1:
                mapped["note"] = " ".join(kept[1:])
        rows.append((source, mapped))
    return rows


def preview_text(text, people, default_date, visits=None):
    visits = visits or []
    warnings = []
    parsed = parse_json(text, people, default_date)
    if parsed is None:
        parsed = parse_delimited(text, people, default_date)
    if parsed is None:
        parsed = parse_lines(text, people, default_date)
    if len(parsed) > MAX_ROWS:
        warnings.append(f"Solo se muestran las primeras {MAX_ROWS} filas.")
        parsed = parsed[:MAX_ROWS]
    rows = []
    accepted = []
    for index, (source, mapped) in enumerate(parsed):
        row = finalize_row(index, source, mapped, people, default_date)
        row["clash"] = clashes(row["visit"], visits, accepted)
        if row["clash"]:
            row["issues"] = list(row["issues"]) + ["Ese horario se empalma con otro tour del mismo rep."]
            row["selected"] = False
        if row["selected"]:
            accepted.append(row["visit"])
        rows.append(row)
    return {"engine": "rules", "warnings": warnings, "rows": rows}


def decode_image(raw):
    blob = str(raw or "").strip()
    if not blob:
        return b""
    if "," in blob and blob.lower().startswith("data:"):
        blob = blob.split(",", 1)[1]
    try:
        return base64.b64decode(blob, validate=False)
    except (ValueError, TypeError):
        return b""


def ocr_image(image, mime=""):
    data = decode_image(image)
    if not data:
        return "", "none"
    if len(data) > MAX_IMAGE:
        return "", "too_large"
    if not shutil.which("tesseract"):
        return "", "ocr_missing"
    suffix = ".jpg"
    lowered = (mime or "").lower()
    if "png" in lowered:
        suffix = ".png"
    handle = tempfile.NamedTemporaryFile(suffix=suffix, delete=False)
    try:
        handle.write(data)
        handle.close()
        langs = "spa+eng" if os.path.exists("/usr/share/tesseract-ocr/5/tessdata/spa.traineddata") or os.path.exists("/usr/share/tessdata/spa.traineddata") else "eng"
        proc = subprocess.run(
            ["tesseract", handle.name, "stdout", "-l", langs, "--psm", "6"],
            capture_output=True,
            timeout=20,
            check=False,
        )
        text = (proc.stdout or b"").decode("utf-8", "replace").strip()
        if not text and langs != "eng":
            proc = subprocess.run(
                ["tesseract", handle.name, "stdout", "-l", "eng", "--psm", "6"],
                capture_output=True,
                timeout=20,
                check=False,
            )
            text = (proc.stdout or b"").decode("utf-8", "replace").strip()
        return text, "tesseract"
    except (subprocess.TimeoutExpired, OSError):
        return "", "ocr_missing"
    finally:
        try:
            os.unlink(handle.name)
        except OSError:
            pass


def preview_payload(payload, people, visits, default_date):
    payload = payload if isinstance(payload, dict) else {}
    text = str(payload.get("text") or "")
    filename = str(payload.get("filename") or "")[:120]
    mime = str(payload.get("mime") or "")
    warnings = []
    engine = "rules"
    image = payload.get("image")
    if image:
        extracted, engine_name = ocr_image(image, mime)
        if engine_name == "too_large":
            return {"ok": False, "error": "La foto es muy grande (máximo 1.5 MB)."}
        if engine_name == "ocr_missing":
            engine = "none"
            warnings.append("Esta foto se lee en el servidor. Si no hay OCR local, pega el texto o sube un CSV.")
        elif engine_name == "tesseract":
            engine = "tesseract"
            if extracted:
                text = f"{text}\n{extracted}".strip()
            else:
                warnings.append("No pude leer texto en la foto. Prueba con más luz o pega el texto.")
        else:
            engine = "none"
            warnings.append("No pude leer la foto. Pega el texto o sube un CSV.")
    if not text.strip():
        if image:
            return {"ok": True, "engine": engine, "warnings": warnings or ["No hay texto para mapear."], "rows": [], "filename": filename}
        return {"ok": False, "error": "Pega texto, sube un CSV o una foto."}
    wanted = str(payload.get("defaultDate") or default_date)
    if not DAY.match(wanted):
        wanted = default_date
    result = preview_text(text, people, wanted, visits)
    result["ok"] = True
    result["filename"] = filename
    if engine != "rules":
        result["engine"] = engine
    result["warnings"] = warnings + list(result.get("warnings") or [])
    return result
