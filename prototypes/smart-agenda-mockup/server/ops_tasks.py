"""Tareas con evidencia (feature tareas-evidencia, Excepción Ready del PO 2026-11-07).

«Marcar hecha» exige una evidencia (foto, captura o audio) que ven solo el rep, su jefe y
admin, y que se borra a los 30 días. Aquí viven las reglas puras; el HTTP está en ops_api.py.
"""

import base64
import binascii
import os
import re
import secrets
import time
from datetime import date

RETENTION_DAYS = 30
MAX_EVIDENCE_BYTES = 700_000  # cabe en el límite de 1 MB de nginx con base64
AUDIO_MAX_SEC = 60
TITLE_MAX = 80
DETAIL_MAX = 160
ORIGIN_MAX = 40
DAY = re.compile(r"^\d{4}-\d{2}-\d{2}$")
CLOCK = re.compile(r"^([01]\d|2[0-3]):[0-5]\d$")
EMAIL_RE = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+")
PHONE_RE = re.compile(r"(?:\d[ \-]?){7,}")

# mime → (tipo, extensión, verificador de firma)
TYPES = {
    "image/jpeg": ("imagen", "jpg", lambda b: b[:3] == b"\xff\xd8\xff"),
    "image/png": ("imagen", "png", lambda b: b[:8] == b"\x89PNG\r\n\x1a\n"),
    "image/webp": ("imagen", "webp", lambda b: b[:4] == b"RIFF" and b[8:12] == b"WEBP"),
    "audio/webm": ("audio", "webm", lambda b: b[:4] == b"\x1a\x45\xdf\xa3"),
    "audio/mp4": ("audio", "m4a", lambda b: b[4:8] == b"ftyp"),
    "audio/mpeg": ("audio", "mp3", lambda b: b[:3] == b"ID3" or b[:2] in (b"\xff\xfb", b"\xff\xf3", b"\xff\xf2")),
    "audio/ogg": ("audio", "ogg", lambda b: b[:4] == b"OggS"),
}
MIME_OF_EXT = {ext: mime for mime, (_k, ext, _c) in TYPES.items()}


def _valid_day(raw):
    if not DAY.match(raw or ""):
        return False
    try:
        date.fromisoformat(raw)
        return True
    except ValueError:
        return False


def _person(people, ident):
    return next((p for p in people if p["id"] == ident), None)


def clean_task(payload, people, actor):
    """Valida una tarea nueva. Devuelve (task, error)."""
    rep_id = str(payload.get("repId") or (actor["id"] if actor["role"] == "rep" else "")).strip()
    rep = _person(people, rep_id)
    if not rep or rep.get("role") != "rep":
        return None, "Elige un rep."
    if actor["role"] == "rep" and rep_id != actor["id"]:
        return None, "Solo puedes crear tareas para ti."
    if actor["role"] == "jefe":
        me = _person(people, actor["id"])
        if not me or me.get("roomId") != rep.get("roomId"):
            return None, "Ese rep no está en tu sala."
    title = str(payload.get("title") or "").strip()
    detail = str(payload.get("detail") or "").strip()
    origin = str(payload.get("origin") or "").strip() or ("Jefe de sala" if actor["role"] == "jefe" else "Agenda")
    if not title or len(title) > TITLE_MAX:
        return None, "Escribe un título (máximo 80)."
    if len(detail) > DETAIL_MAX or len(origin) > ORIGIN_MAX:
        return None, "El detalle es muy largo (máximo 160)."
    if any(EMAIL_RE.search(text) or PHONE_RE.search(text) for text in (title, detail)):
        return None, "Quita los correos o teléfonos de la tarea."
    due = str(payload.get("due") or "").strip()
    if not _valid_day(due):
        return None, "La fecha no es válida."
    when = str(payload.get("when") or "").strip()
    if when and not CLOCK.match(when):
        return None, "La hora no es válida."
    return {
        "id": "t" + secrets.token_hex(6),
        "repId": rep_id,
        "title": title,
        "detail": detail,
        "due": due,
        "when": when,
        "origin": origin,
        "createdBy": actor["id"],
        "createdAt": int(time.time()),
        "status": "pendiente",
        "doneAt": None,
        "evidence": None,
    }, ""


def validate_evidence(payload):
    """Devuelve (bytes, meta, error). La firma de los bytes debe coincidir con el tipo declarado."""
    if payload.get("consent") is not True:
        return None, None, "Confirma el aviso de privacidad (consentimiento) para subir la evidencia."
    mime = str(payload.get("mime") or "").split(";")[0].strip().lower()
    kind = str(payload.get("kind") or "").strip()
    spec = TYPES.get(mime)
    if not spec or spec[0] != kind:
        return None, None, "Ese tipo de archivo no se acepta: usa foto, captura o audio."
    raw_b64 = str(payload.get("data") or "")
    if len(raw_b64) > (MAX_EVIDENCE_BYTES * 4) // 3 + 8:
        return None, None, "La evidencia es muy grande (máximo 700 KB después de comprimir)."
    try:
        raw = base64.b64decode(raw_b64, validate=True)
    except (binascii.Error, ValueError):
        return None, None, "La evidencia no se pudo leer."
    if not raw:
        return None, None, "La evidencia está vacía."
    if len(raw) > MAX_EVIDENCE_BYTES:
        return None, None, "La evidencia es muy grande (máximo 700 KB después de comprimir)."
    if not spec[2](raw):
        return None, None, "El archivo no coincide con su tipo."
    duration = 0
    if kind == "audio":
        try:
            duration = float(payload.get("durationSec"))
        except (TypeError, ValueError):
            duration = 0
        if not 0 < duration <= AUDIO_MAX_SEC:
            return None, None, "El audio debe durar entre 1 y 60 segundos."
    return raw, {"kind": kind, "mime": mime, "ext": spec[1], "size": len(raw), "durationSec": round(duration, 1)}, ""


def evidence_path(folder, task):
    ev = task.get("evidence") or {}
    ext = ev.get("ext") or ""
    if ext not in MIME_OF_EXT or not re.fullmatch(r"[a-z0-9-]{1,40}", str(task.get("id", ""))):
        return None
    return os.path.join(folder, f"{task['id']}.{ext}")


def purge_expired(data, folder, now=None):
    """Borra evidencias con más de RETENTION_DAYS días. Devuelve True si cambió algo."""
    now = now or time.time()
    limit = now - RETENTION_DAYS * 86400
    changed = False
    for task in data.get("tasks", []):
        ev = task.get("evidence")
        if not ev or ev.get("expired") or ev.get("at", now) > limit:
            continue
        path = evidence_path(folder, task)
        if path and os.path.exists(path):
            os.remove(path)
        ev["expired"] = True
        changed = True
    return changed


def seed_tasks():
    rows = [
        ("ana", "Confirmar seguimiento", "Lead #302 · Propuesta enviada ayer", "10:45", "Historial de ayer"),
        ("ana", "Practicar preguntas de descubrimiento", "Acuerdo de coaching · Foco en objeción de precio", "11:00", "Coaching"),
        ("ana", "Preparar tour presencial", "Desde nota #12 · Demo con equipo de compras", "15:00", "Nota #12"),
        ("luis", "Revisar objeción de cuota", "Lead #210 · Ensayar el reencuadre", "12:00", "Coaching"),
        ("mira", "Confirmar segunda visita", "Lead #077 · Validar fecha", "11:30", "Jefe de sala"),
        ("teo", "Practicar Meet & Greet", "Primeros dos minutos del tour", "10:00", "Coaching"),
    ]
    return [{
        "id": f"seed-{rep}-{i}", "repId": rep, "title": title, "detail": detail, "due": "2026-11-06", "when": when,
        "origin": origin, "createdBy": "sistema", "createdAt": 0, "status": "pendiente", "doneAt": None, "evidence": None,
    } for i, (rep, title, detail, when, origin) in enumerate(rows, 1)]


def task_view(task):
    """Lo que viaja al cliente: sin ruta de archivo."""
    out = {k: v for k, v in task.items() if k != "evidence"}
    ev = task.get("evidence")
    out["evidence"] = None if not ev else {k: ev.get(k) for k in ("kind", "mime", "size", "durationSec", "at", "by", "expired")}
    return out
