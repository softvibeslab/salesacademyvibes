"""Validated intake, private scope, public projections and retention. No HTTP or OCR."""
import copy
import datetime as dt
import hashlib
import json
import re
import secrets
import time
import uuid

RETENTION_SECONDS = 30 * 86400
PUBLIC_VISIT_KEYS = {"id", "repId", "date", "start", "end", "lead", "status", "note", "updatedBy", "updatedAt", "result", "resultHistory"}
REGISTRATION_KEYS = {"tourId", "repId", "roomId", "lead", "date", "start", "end", "source", "visitors", "preferences", "contact", "createdAt", "reviewedAt"}


def response(status, code, message, fields=None):
    body = {"ok": False, "code": code, "error": message}
    if fields:
        body["fields"] = fields
    return {"status": status, "body": body}


def public_visit(visit):
    return {key: copy.deepcopy(value) for key, value in visit.items() if key in PUBLIC_VISIT_KEYS}


def public_response(value):
    """Project every legacy response returning visit(s), including result mutations."""
    if not isinstance(value, dict):
        return value
    result = dict(value)
    if isinstance(result.get("visit"), dict):
        result["visit"] = public_visit(result["visit"])
    if isinstance(result.get("visits"), list):
        result["visits"] = [public_visit(v) for v in result["visits"]]
    result.pop("tourRegistrations", None)
    result.pop("tourRegistrationRequests", None)
    return result


def view(registration):
    return {key: copy.deepcopy(value) for key, value in registration.items() if key in REGISTRATION_KEYS}


def person(data, ident):
    return next((p for p in data.get("people", []) if p["id"] == ident), None)


def in_scope(data, actor, registration):
    if not actor:
        return False
    if actor["role"] == "admin":
        return True
    who = person(data, actor["id"])
    if not who or who.get("roomId") != registration.get("roomId"):
        return False
    return actor["role"] == "jefe" or (actor["role"] == "rep" and actor["id"] == registration.get("repId"))


def stamp(now=None):
    return dt.datetime.fromtimestamp(time.time() if now is None else now, dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def purge(data, now=None):
    now = time.time() if now is None else now
    registrations = data.get("tourRegistrations", {})
    changed = False
    for ident, row in list(registrations.items()):
        try:
            created = dt.datetime.fromisoformat(row["createdAt"].replace("Z", "+00:00")).timestamp()
        except (KeyError, TypeError, ValueError):
            created = 0
        if now - created >= RETENTION_SECONDS:
            remove(data, ident)
            changed = True
    return changed


def remove(data, ident):
    data.get("tourRegistrations", {}).pop(ident, None)
    for item in data.get("tourRegistrationRequests", {}).values():
        if item.get("tourId") == ident:
            item.pop("payloadHash", None)
            item["state"] = "expired"


def valid_date(value):
    if not isinstance(value, str) or not re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
        return False
    try:
        dt.date.fromisoformat(value)
        return True
    except ValueError:
        return False


def clean(payload, data, actor):
    allowed = {"requestId", "source", "date", "start", "end", "visitors", "preferences", "contact", "reviewConfirmed", "repId"}
    bad = lambda field: (None, response(400, "validation_error", "Revisa la información del formulario.", {field: "Dato no válido."}))
    if not isinstance(payload, dict) or set(payload) - allowed:
        return bad("form")
    if payload.get("reviewConfirmed") is not True:
        return bad("reviewConfirmed")
    request_id = payload.get("requestId")
    try:
        if not isinstance(request_id, str) or str(uuid.UUID(request_id)) != request_id.lower():
            return bad("requestId")
    except (ValueError, AttributeError):
        return bad("requestId")
    source = payload.get("source")
    if source not in ("manual", "survey"):
        return bad("source")
    rep_id = payload.get("repId", actor["id"])
    if not isinstance(rep_id, str):
        return bad("repId")
    rep = person(data, rep_id)
    if not rep or rep["role"] != "rep":
        return bad("repId")
    me = person(data, actor["id"])
    if (actor["role"] == "rep" and rep_id != actor["id"]) or (actor["role"] == "jefe" and (not me or me["roomId"] != rep["roomId"])):
        return None, response(403, "forbidden", "No puedes registrar un tour para ese asesor.")
    date = payload.get("date")
    start, end = payload.get("start"), payload.get("end")
    if not valid_date(date):
        return bad("date")
    for key, value in (("start", start), ("end", end)):
        if not isinstance(value, str) or not re.fullmatch(r"(?:[01]\d|2[0-3]):[0-5]\d", value):
            return bad(key)
    if start >= end:
        return bad("end")
    visitors = payload.get("visitors")
    if not isinstance(visitors, dict) or set(visitors) - {"primaryName", "companionName"}:
        return bad("visitors")
    normalized_visitors = {}
    for key in ("primaryName", "companionName"):
        value = visitors.get(key, "")
        if not isinstance(value, str) or len(value.strip()) > 80 or any(ord(c) < 32 for c in value):
            return bad(key)
        normalized_visitors[key] = value.strip()
    if not normalized_visitors["primaryName"]:
        return bad("primaryName")
    preferences = payload.get("preferences", {})
    if not isinstance(preferences, dict) or set(preferences) - {"language", "interests", "notes"}:
        return bad("preferences")
    language = preferences.get("language", "")
    if language not in ("", "es", "en", "otro"):
        return bad("language")
    interests = preferences.get("interests", [])
    if not isinstance(interests, list) or len(interests) > 5 or any(not isinstance(i, str) or not i.strip() or len(i.strip()) > 60 or any(ord(c) < 32 for c in i) for i in interests):
        return bad("interests")
    notes = preferences.get("notes", "")
    if not isinstance(notes, str) or len(notes.strip()) > 400 or any(ord(c) < 32 and c not in "\n\t" for c in notes):
        return bad("notes")
    contact = payload.get("contact")
    if contact is not None:
        if not isinstance(contact, dict) or set(contact) != {"type", "value"} or contact.get("type") not in ("email", "phone"):
            return bad("contact")
        value = contact.get("value")
        if not isinstance(value, str) or len(value) > 254:
            return bad("contact")
        value = value.strip()
        valid = bool(re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", value)) if contact["type"] == "email" else bool(re.fullmatch(r"\+?[0-9 ()-]{7,25}", value)) and 7 <= len(re.sub(r"\D", "", value)) <= 15
        if not valid:
            return bad("contact")
        contact = {"type": contact["type"], "value": value}
    return {"requestId": request_id.lower(), "source": source, "repId": rep_id, "roomId": rep["roomId"], "date": date,
            "start": start, "end": end, "visitors": normalized_visitors,
            "preferences": {"language": language, "interests": [i.strip() for i in interests], "notes": notes.strip()},
            "contact": contact}, None


def create(data, actor, payload, overlaps, privacy_mode="private"):
    cleaned, error = clean(payload, data, actor)
    if error:
        return error
    key = hashlib.sha256((actor["id"] + ":" + cleaned["requestId"]).encode()).hexdigest()
    digest = hashlib.sha256(json.dumps(cleaned, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode()).hexdigest()
    existing = data.get("tourRegistrationRequests", {}).get(key)
    if existing:
        if existing.get("state") == "expired":
            return response(409, "registration_expired", "Este registro ya venció. No se puede volver a crear con la misma solicitud.")
        row = data.get("tourRegistrations", {}).get(existing["tourId"])
        visit = next((v for v in data["visits"] if v["id"] == existing["tourId"]), None)
        if not row or not visit or not in_scope(data, actor, row) or (row.get("privacyMode", "private") == "private" and privacy_mode != "private"):
            return response(404, "not_found", "El registro no está disponible.")
        if existing.get("payloadHash") != digest:
            return response(409, "idempotency_conflict", "La solicitud cambió. Revisa los datos antes de registrar.")
        return {"status": 200, "body": {"ok": True, "visit": public_visit(visit), "registration": view(row)}}
    if overlaps(data, {**cleaned, "status": "pendiente"}):
        return response(409, "schedule_conflict", "Ese horario se cruza con otro tour. Revisa la agenda o cambia el horario.")
    used = {v["lead"] for v in data["visits"]}
    available = [f"Lead #{i:04}" for i in range(1000, 10000) if f"Lead #{i:04}" not in used]
    if not available:
        return response(503, "lead_capacity", "No hay referencias disponibles. Contacta al administrador.")
    ident, now, lead = "v" + str(time.time_ns()), stamp(), secrets.choice(available)
    visit = {"id": ident, "repId": cleaned["repId"], "date": cleaned["date"], "start": cleaned["start"], "end": cleaned["end"],
             "lead": lead, "status": "pendiente", "note": "", "updatedBy": actor["id"], "updatedAt": now}
    registration = {**cleaned, "tourId": ident, "lead": lead, "createdAt": now, "reviewedAt": now, "createdBy": actor["id"], "privacyMode": privacy_mode}
    data["visits"].append(visit)
    data.setdefault("tourRegistrations", {})[ident] = registration
    data.setdefault("tourRegistrationRequests", {})[key] = {"tourId": ident, "payloadHash": digest, "state": "active", "createdAt": now}
    return {"status": 201, "save": True, "body": {"ok": True, "visit": public_visit(visit), "registration": view(registration)}}
