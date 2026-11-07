#!/usr/bin/env python3
"""Demo JSON API for Sales Academy tours. Not authentication."""

import hashlib
import hmac
import json
import os
import re
import secrets
import tempfile
import threading
import time
from http.cookies import SimpleCookie
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

from ops_import import preview_payload

HOST = "127.0.0.1"
PORT = int(os.environ.get("OPS_PORT", "8026"))
ROOT = os.environ.get("OPS_DATA", "/var/lib/salesacademy-ops/ops.json")
LOCK = ROOT + ".lock"

# Login (historia login-demo, Excepción Ready aprobada por el PO 2026-11-07).
# Reps y jefes: contraseña demo pública. Admin: contraseña privada solo en el entorno del servidor.
DEMO_PASSWORD = os.environ.get("OPS_DEMO_PASSWORD", "Demo-2026")
ADMIN_PASSWORD = os.environ.get("OPS_ADMIN_PASSWORD", "")
COOKIE_NAME = "sa_session"
COOKIE_SECURE = os.environ.get("OPS_COOKIE_SECURE", "1") != "0"
ALLOW_ACTOR_HEADER = os.environ.get("OPS_ALLOW_ACTOR_HEADER") == "1"
SESSION_TTL = 12 * 60 * 60
LOGIN_MAX_FAILS = 5
LOGIN_WINDOW = 10 * 60
LOGIN_FAILS = {}
LOGIN_LOCK = threading.Lock()
BAD_LOGIN = "Usuario o contraseña incorrectos."

LEAD = re.compile(r"^Lead #\d{3,4}$")
CLOCK_IN = re.compile(r"^(\d{1,2}):([0-5]\d)(?::[0-5]\d)?$")
DAY = re.compile(r"^\d{4}-\d{2}-\d{2}$")
STATUSES = {"confirmado", "en_curso", "pendiente", "cancelado"}

# Resultado comercial del tour (historia 2026-11-07). Catálogos aprobados por el PO.
OUTCOMES = [
    {"id": "venta", "label": "Venta"},
    {"id": "no_venta", "label": "No venta"},
    {"id": "abandono", "label": "Abandono"},
]
OBJECTIONS = [
    {"id": "confianza", "label": "Confianza"},
    {"id": "dinero_cuota", "label": "Dinero o cuota"},
    {"id": "pareja_decision", "label": "Pareja o decisión"},
    {"id": "uso_tiempo", "label": "Uso o tiempo"},
    {"id": "valor_producto", "label": "Valor del producto"},
    {"id": "ya_tiene_tc", "label": "Ya tiene tiempo compartido"},
    {"id": "otra", "label": "Otra"},
]
ACTIONS = [
    {"id": "llamada", "label": "Llamada"},
    {"id": "segunda_visita", "label": "Segunda visita"},
    {"id": "enviar_propuesta", "label": "Enviar propuesta"},
    {"id": "otra", "label": "Otra"},
]
FAIL_STEPS = [
    {"n": 1, "title": "Meet & Greet"},
    {"n": 2, "title": "Control de agenda"},
    {"n": 3, "title": "Rapport (FORM)"},
    {"n": 4, "title": "Descubrimiento"},
    {"n": 5, "title": "Renovar el pacto"},
    {"n": 6, "title": "Presentación a tres"},
    {"n": 7, "title": "Recorrido"},
    {"n": 8, "title": "Casos de éxito"},
    {"n": 9, "title": "Punto de confirmación"},
    {"n": 10, "title": "Precio y negociación"},
    {"n": 11, "title": "Cierre y bienvenida"},
]
CURRENCIES = {"USD", "MXN"}
OUTCOME_IDS = {item["id"] for item in OUTCOMES}
OBJECTION_IDS = {item["id"] for item in OBJECTIONS}
ACTION_IDS = {item["id"] for item in ACTIONS}
RESULT_NOTE_MAX = 120
RESULT_HISTORY_MAX = 20
AMOUNT_MAX = 1_000_000
EMAIL_RE = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+")
PHONE_RE = re.compile(r"(?:\d[ \-]?){7,}")
CONFLICT_ERROR = "Alguien más actualizó este resultado. Actualiza y vuelve a intentar."


def parse_clock(raw):
    match = CLOCK_IN.match(str(raw or "").strip())
    if not match:
        return None
    hour = int(match.group(1))
    if hour > 23:
        return None
    return f"{hour:02d}:{match.group(2)}"


def seed():
    return {
        "rooms": [
            {"id": "norte", "name": "Sala Norte"},
            {"id": "sur", "name": "Sala Sur"},
        ],
        "people": [
            {"id": "jorge", "name": "Jorge", "role": "jefe", "roomId": "norte"},
            {"id": "rosa", "name": "Rosa", "role": "jefe", "roomId": "sur"},
            {"id": "ana", "name": "Ana", "role": "rep", "roomId": "norte"},
            {"id": "luis", "name": "Luis", "role": "rep", "roomId": "norte"},
            {"id": "mira", "name": "Mira", "role": "rep", "roomId": "sur"},
            {"id": "teo", "name": "Teo", "role": "rep", "roomId": "sur"},
        ],
        "visits": [
            {"id": "v1", "repId": "ana", "date": "2026-11-06", "start": "09:30", "end": "10:30", "lead": "Lead #4920", "status": "confirmado", "note": "Objeción de cuota"},
            {"id": "v2", "repId": "ana", "date": "2026-11-06", "start": "11:30", "end": "12:30", "lead": "Lead #302", "status": "en_curso", "note": "Seguimiento"},
            {"id": "v3", "repId": "ana", "date": "2026-11-06", "start": "15:30", "end": "16:30", "lead": "Lead #188", "status": "pendiente", "note": "Visita de demostración"},
            {"id": "v4", "repId": "luis", "date": "2026-11-06", "start": "10:00", "end": "11:00", "lead": "Lead #210", "status": "confirmado", "note": ""},
            {"id": "v5", "repId": "mira", "date": "2026-11-06", "start": "13:00", "end": "14:00", "lead": "Lead #077", "status": "pendiente", "note": ""},
            {"id": "v6", "repId": "ana", "date": "2026-11-07", "start": "10:00", "end": "11:00", "lead": "Lead #441", "status": "pendiente", "note": "Día siguiente"},
        ],
    }


def person(data, ident):
    return next((item for item in data["people"] if item["id"] == ident), None)


def room_of(data, rep_id):
    rep = person(data, rep_id)
    return rep["roomId"] if rep else ""


def parse_actor(header, data):
    raw = (header or "").strip()
    if raw == "admin":
        return {"role": "admin", "id": "admin"}
    if raw.count(":") != 1:
        return None
    role, ident = raw.split(":", 1)
    who = person(data, ident)
    if not who or who["role"] != role or role not in {"jefe", "rep"}:
        return None
    return {"role": role, "id": ident}


def token_hash(token):
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def session_actor(data, token, now=None):
    if not token:
        return None
    now = now or time.time()
    entry = (data.get("sessions") or {}).get(token_hash(token))
    if not entry or entry.get("exp", 0) < now:
        return None
    who = entry.get("who")
    if who == "admin":
        return {"role": "admin", "id": "admin"}
    person_row = person(data, who)
    if not person_row:
        return None
    return {"role": person_row["role"], "id": who}


def user_view(data, actor):
    if actor["role"] == "admin":
        return {"id": "admin", "name": "Administrador", "role": "admin", "roomId": "todas"}
    row = person(data, actor["id"])
    return {"id": row["id"], "name": row["name"], "role": row["role"], "roomId": row["roomId"]}


def login_locked(username, now=None):
    now = now or time.time()
    with LOGIN_LOCK:
        recent = [at for at in LOGIN_FAILS.get(username, []) if now - at < LOGIN_WINDOW]
        LOGIN_FAILS[username] = recent
        return len(recent) >= LOGIN_MAX_FAILS


def login_failed(username):
    with LOGIN_LOCK:
        LOGIN_FAILS.setdefault(username, []).append(time.time())


def login_cleared(username):
    with LOGIN_LOCK:
        LOGIN_FAILS.pop(username, None)


def check_password(data, username, password):
    if username == "admin":
        return bool(ADMIN_PASSWORD) and hmac.compare_digest(password, ADMIN_PASSWORD)
    row = person(data, username)
    return bool(row) and hmac.compare_digest(password, DEMO_PASSWORD)


def session_cookie(token, max_age):
    parts = [f"{COOKIE_NAME}={token}", "Path=/", "HttpOnly", "SameSite=Lax", f"Max-Age={max_age}"]
    if COOKIE_SECURE:
        parts.append("Secure")
    return "; ".join(parts)


def allowed(actor, data, visit):
    if actor["role"] == "admin":
        return True
    if actor["role"] == "rep":
        return visit["repId"] == actor["id"]
    jefe = person(data, actor["id"])
    return bool(jefe) and room_of(data, visit["repId"]) == jefe["roomId"]


def clean_visit(payload, data, actor, current=None):
    rep_id = str(payload.get("repId") or "").strip()
    date = str(payload.get("date") or "").strip()
    start = str(payload.get("start") or "").strip()
    end = str(payload.get("end") or "").strip()
    lead = str(payload.get("lead") or "").strip()
    status = str(payload.get("status") or "").strip()
    note = str(payload.get("note") or "").strip()[:80]
    rep = person(data, rep_id)
    if not rep or rep["role"] != "rep":
        return None, "No encontré a ese rep."
    if not allowed(actor, data, {"repId": rep_id}):
        return None, "Ese rep no está en tu sala."
    if current and not allowed(actor, data, current):
        return None, "Ese tour no está en tu sala."
    start = parse_clock(start)
    end = parse_clock(end)
    if not DAY.match(date):
        return None, "La fecha no es válida."
    if not start or not end:
        return None, "La hora no es válida."
    if start >= end:
        return None, "La hora de fin va después del inicio."
    if not LEAD.match(lead):
        return None, "Usa un Lead # de ejemplo, por ejemplo Lead #4920."
    if status not in STATUSES:
        return None, "El estado no es válido."
    visit = {
        "id": current["id"] if current else "v" + str(time.time_ns()),
        "repId": rep_id,
        "date": date,
        "start": start,
        "end": end,
        "lead": lead,
        "status": status,
        "note": note,
        "updatedBy": actor["id"],
        "updatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }
    return visit, ""


def clean_result(payload, data, visit):
    """Valida el cuerpo del resultado. Devuelve (result, error). Sin persistencia parcial."""
    outcome = str(payload.get("outcome") or "").strip()
    if outcome not in OUTCOME_IDS:
        return None, "El resultado no es válido."
    note = str(payload.get("note") or "").strip()
    if len(note) > RESULT_NOTE_MAX:
        return None, "La nota es muy larga (máximo 120)."
    if note and (EMAIL_RE.search(note) or PHONE_RE.search(note)):
        return None, "Quita los correos o teléfonos de la nota."
    result = {"outcome": outcome, "note": note}
    if outcome == "venta":
        currency = str(payload.get("currency") or "").strip()
        if currency not in CURRENCIES:
            return None, "La divisa no es válida."
        raw = payload.get("amount")
        if raw is None or raw == "":
            return None, "Falta el volumen de la venta."
        try:
            amount = float(raw)
        except (TypeError, ValueError):
            return None, "El volumen no es válido."
        if not 0 < amount <= AMOUNT_MAX:
            return None, "El volumen no es válido."
        result.update({"currency": currency, "amount": round(amount, 2)})
    elif outcome == "no_venta":
        objection = str(payload.get("objection") or "").strip()
        if objection not in OBJECTION_IDS:
            return None, "Elige la objeción principal."
        other = str(payload.get("objectionOther") or "").strip()
        if objection == "otra" and (not other or len(other) > 60):
            return None, "Describe la objeción (máximo 60)."
        if objection != "otra":
            other = ""
        recoverable = payload.get("recoverable")
        if not isinstance(recoverable, bool):
            return None, "Indica si se puede recuperar."
        result.update({"objection": objection, "objectionOther": other, "recoverable": recoverable})
        if recoverable:
            step = payload.get("nextStep")
            step = step if isinstance(step, dict) else {}
            action = str(step.get("action") or "").strip()
            date = str(step.get("date") or "").strip()
            owner = str(step.get("ownerId") or "").strip()
            if action not in ACTION_IDS or not DAY.match(date) or not owner:
                return None, "Falta el siguiente paso."
            if date < visit["date"]:
                return None, "La fecha del siguiente paso no puede ser anterior al tour."
            who = person(data, owner)
            room = room_of(data, visit["repId"])
            owner_ok = owner == visit["repId"] or (who and who["role"] == "jefe" and who["roomId"] == room)
            if not owner_ok:
                return None, "Ese responsable no está en la sala del tour."
            result["nextStep"] = {"action": action, "date": date, "ownerId": owner}
    else:
        raw = payload.get("failStep")
        try:
            fail = int(raw)
        except (TypeError, ValueError):
            return None, "Elige el paso donde se cortó."
        if not 1 <= fail <= 11:
            return None, "Elige el paso donde se cortó."
        result["failStep"] = fail
    return result, ""


def append_result_history(visit, actor, now):
    history = list(visit.get("resultHistory") or [])
    history.append({"at": now, "by": actor["id"], "previous": visit.get("result")})
    visit["resultHistory"] = history[-RESULT_HISTORY_MAX:]


def read_store():
    if not os.path.exists(ROOT):
        return seed()
    with open(ROOT, encoding="utf-8") as handle:
        data = json.load(handle)
    if not isinstance(data, dict) or not isinstance(data.get("visits"), list):
        return seed()
    return data


def write_store(data):
    folder = os.path.dirname(ROOT)
    os.makedirs(folder, exist_ok=True)
    fd, tmp = tempfile.mkstemp(dir=folder, suffix=".tmp")
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as handle:
            json.dump(data, handle, ensure_ascii=False)
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(tmp, ROOT)
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)


def mutate(change):
    os.makedirs(os.path.dirname(ROOT), exist_ok=True)
    with open(LOCK, "a", encoding="utf-8") as lock:
        import fcntl
        fcntl.flock(lock, fcntl.LOCK_EX)
        data = read_store()
        result = change(data)
        if result.get("save"):
            write_store(data)
        return result


def overlaps(data, visit, ignore_id=""):
    for other in data["visits"]:
        if other["id"] == ignore_id:
            continue
        if other["repId"] != visit["repId"] or other["date"] != visit["date"]:
            continue
        if other["status"] == "cancelado" or visit["status"] == "cancelado":
            continue
        if visit["start"] < other["end"] and visit["end"] > other["start"]:
            return True
    return False


def clash(error="Ese horario se empalma con otro tour del mismo rep."):
    return {"status": 409, "body": {"ok": False, "error": error}}


def reject(error):
    scoped = error in {"Ese rep no está en tu sala.", "Ese tour no está en tu sala."}
    return {"status": 403 if scoped else 400, "body": {"ok": False, "error": error}}


def rooms_for(actor, data):
    if actor["role"] == "admin":
        return data["rooms"], data["people"]
    if actor["role"] == "rep":
        return data["rooms"], [person(data, actor["id"])]
    jefe = person(data, actor["id"])
    jefes = [item for item in data["people"] if item["role"] == "jefe"]
    reps = [item for item in data["people"] if item["role"] == "rep" and item["roomId"] == jefe["roomId"]]
    return data["rooms"], jefes + reps


def tours_for(actor, data, query):
    visits = [visit for visit in data["visits"] if allowed(actor, data, visit)]
    wanted_rep = (query.get("rep") or [""])[0]
    wanted_room = (query.get("room") or [""])[0]
    wanted_date = (query.get("date") or [""])[0]
    start = (query.get("from") or [""])[0]
    end = (query.get("to") or [""])[0]
    if wanted_rep:
        if actor["role"] == "rep" and wanted_rep != actor["id"]:
            return None, "Solo puedes ver tus tours."
        if actor["role"] == "jefe" and room_of(data, wanted_rep) != person(data, actor["id"])["roomId"]:
            return None, "Ese rep no está en tu sala."
        visits = [visit for visit in visits if visit["repId"] == wanted_rep]
    if wanted_room and wanted_room != "todas":
        if actor["role"] == "jefe" and wanted_room != person(data, actor["id"])["roomId"]:
            return None, "Esa sala no es la tuya."
        visits = [visit for visit in visits if room_of(data, visit["repId"]) == wanted_room]
    if wanted_date:
        visits = [visit for visit in visits if visit["date"] == wanted_date]
    if start:
        visits = [visit for visit in visits if visit["date"] >= start]
    if end:
        visits = [visit for visit in visits if visit["date"] <= end]
    visits.sort(key=lambda visit: (visit["date"], visit["start"], visit["repId"]))
    if actor["role"] == "rep":
        visits = [{key: value for key, value in visit.items() if key != "resultHistory"} for visit in visits]
    return visits, ""


class Handler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, fmt, *args):
        return

    def cookie_token(self):
        raw = self.headers.get("Cookie")
        if not raw:
            return ""
        jar = SimpleCookie()
        try:
            jar.load(raw)
        except Exception:
            return ""
        morsel = jar.get(COOKIE_NAME)
        return morsel.value if morsel else ""

    def actor(self, data):
        found = session_actor(data, self.cookie_token())
        if found:
            return found
        if ALLOW_ACTOR_HEADER:
            return parse_actor(self.headers.get("X-Ops-Actor"), data)
        return None

    def send_json(self, status, payload, cookie=None):
        raw = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        if cookie:
            self.send_header("Set-Cookie", cookie)
        self.send_header("Content-Length", str(len(raw)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(raw)

    def read_json(self, limit=8192, length=None):
        if length is None:
            length = int(self.headers.get("Content-Length") or "0")
        if length < 0 or length > limit:
            return None
        if length == 0:
            return {}
        try:
            return json.loads(self.rfile.read(length).decode("utf-8"))
        except (UnicodeError, json.JSONDecodeError):
            return None

    def route(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/") or "/"
        if path.startswith("/api/"):
            path = path[4:]
        return path, parse_qs(parsed.query)

    def do_GET(self):
        path, query = self.route()
        if path == "/health":
            self.send_json(200, {"ok": True})
            return

        def run(data):
            if path == "/directory":
                return {"status": 200, "body": {"ok": True, "rooms": data["rooms"], "people": data["people"]}}
            if path == "/catalog":
                return {"status": 200, "body": {
                    "ok": True,
                    "outcomes": OUTCOMES,
                    "objections": OBJECTIONS,
                    "actions": ACTIONS,
                    "failSteps": FAIL_STEPS,
                    "currencies": sorted(CURRENCIES),
                }}
            actor = self.actor(data)
            if not actor:
                return {"status": 401, "body": {"ok": False, "error": "Inicia sesión."}}
            if path == "/me":
                return {"status": 200, "body": {"ok": True, "user": user_view(data, actor)}}
            if path == "/rooms":
                rooms, people = rooms_for(actor, data)
                return {"status": 200, "body": {"ok": True, "rooms": rooms, "people": people}}
            if path == "/tours":
                visits, error = tours_for(actor, data, query)
                if error:
                    return {"status": 403, "body": {"ok": False, "error": error}}
                return {"status": 200, "body": {"ok": True, "visits": visits}}
            return {"status": 404, "body": {"ok": False, "error": "No existe."}}

        result = mutate(lambda data: run(data))
        self.send_json(result["status"], result["body"])

    def do_POST(self):
        path, _query = self.route()
        try:
            length = int(self.headers.get("Content-Length") or "0")
        except ValueError:
            length = -1
        limit = 2_000_000 if path == "/imports/preview" else 8192
        if length < 0 or length > limit:
            error = "El archivo es muy grande (máximo 1.5 MB)." if path == "/imports/preview" else "El cuerpo no es válido."
            self.send_json(413 if path == "/imports/preview" else 400, {"ok": False, "error": error})
            return
        payload = self.read_json(limit, length)
        if payload is None:
            self.send_json(400, {"ok": False, "error": "El cuerpo no es válido."})
            return

        def run(data):
            if path == "/login":
                username = str(payload.get("username") or "").strip().lower()[:40]
                password = str(payload.get("password") or "")[:200]
                if login_locked(username):
                    return {"status": 429, "body": {"ok": False, "error": "Demasiados intentos. Espera unos minutos."}}
                if not check_password(data, username, password):
                    login_failed(username)
                    return {"status": 401, "body": {"ok": False, "error": BAD_LOGIN}}
                login_cleared(username)
                now = time.time()
                sessions = {k: v for k, v in (data.get("sessions") or {}).items() if v.get("exp", 0) > now}
                token = secrets.token_urlsafe(32)
                sessions[token_hash(token)] = {"who": username, "exp": now + SESSION_TTL}
                data["sessions"] = sessions
                found = session_actor(data, token, now)
                return {"status": 200, "save": True, "cookie": session_cookie(token, SESSION_TTL),
                        "body": {"ok": True, "user": user_view(data, found)}}
            if path == "/logout":
                token = self.cookie_token()
                sessions = data.get("sessions") or {}
                if token and token_hash(token) in sessions:
                    del sessions[token_hash(token)]
                    data["sessions"] = sessions
                    return {"status": 200, "save": True, "cookie": session_cookie("", 0), "body": {"ok": True}}
                return {"status": 200, "cookie": session_cookie("", 0), "body": {"ok": True}}
            actor = self.actor(data)
            if not actor:
                return {"status": 401, "body": {"ok": False, "error": "Inicia sesión."}}
            if path == "/reset":
                if actor["role"] != "admin":
                    return {"status": 403, "body": {"ok": False, "error": "Solo el administrador restaura el ejemplo."}}
                fresh = seed()
                kept_sessions = data.get("sessions") or {}
                data.clear()
                data.update(fresh)
                data["sessions"] = kept_sessions
                return {"status": 200, "save": True, "body": {"ok": True}}
            if path == "/imports/preview":
                if actor["role"] == "rep":
                    return {"status": 403, "body": {"ok": False, "error": "El rep solo consulta sus tours."}}
                default_date = str(payload.get("defaultDate") or time.strftime("%Y-%m-%d"))
                result = preview_payload(payload, data["people"], data["visits"], default_date)
                if not result.get("ok"):
                    return {"status": 400, "body": result}
                for row in result.get("rows") or []:
                    visit = row.get("visit") or {}
                    if visit.get("repId") and not allowed(actor, data, {"repId": visit["repId"]}):
                        row["issues"] = list(row.get("issues") or []) + ["Ese rep no está en tu sala."]
                        row["selected"] = False
                return {"status": 200, "body": result}
            if path != "/tours":
                return {"status": 404, "body": {"ok": False, "error": "No existe."}}
            if actor["role"] == "rep":
                return {"status": 403, "body": {"ok": False, "error": "El rep solo consulta sus tours."}}
            visit, error = clean_visit(payload, data, actor)
            if error:
                return reject(error)
            if overlaps(data, visit):
                return clash()
            data["visits"].append(visit)
            return {"status": 201, "save": True, "body": {"ok": True, "visit": visit}}

        result = mutate(run)
        self.send_json(result["status"], result["body"], result.get("cookie"))

    def do_PATCH(self):
        path, _query = self.route()
        payload = self.read_json()
        if payload is None:
            self.send_json(400, {"ok": False, "error": "El cuerpo no es válido."})
            return

        def run(data):
            actor = self.actor(data)
            if not actor:
                return {"status": 401, "body": {"ok": False, "error": "Inicia sesión."}}
            people = re.fullmatch(r"/people/([a-z]{2,12})", path)
            tours = re.fullmatch(r"/tours/(v[0-9]+)", path)
            if people:
                if actor["role"] != "admin":
                    return {"status": 403, "body": {"ok": False, "error": "Solo el administrador mueve reps de sala."}}
                who = person(data, people.group(1))
                room_id = str(payload.get("roomId") or "")
                if not who or who["role"] != "rep":
                    return {"status": 404, "body": {"ok": False, "error": "No encontré a ese rep."}}
                if not any(room["id"] == room_id for room in data["rooms"]):
                    return {"status": 400, "body": {"ok": False, "error": "Esa sala no existe."}}
                who["roomId"] = room_id
                return {"status": 200, "save": True, "body": {"ok": True, "person": who}}
            if not tours:
                return {"status": 404, "body": {"ok": False, "error": "No existe."}}
            if actor["role"] == "rep":
                return {"status": 403, "body": {"ok": False, "error": "El rep solo consulta sus tours."}}
            current = next((visit for visit in data["visits"] if visit["id"] == tours.group(1)), None)
            if not current:
                return {"status": 404, "body": {"ok": False, "error": "No encontré ese tour."}}
            visit, error = clean_visit(payload, data, actor, current)
            if error:
                return reject(error)
            if overlaps(data, visit, current["id"]):
                return clash()
            if current.get("result"):
                if visit["status"] == "cancelado":
                    return clash("Quita el resultado antes de cancelar el tour.")
                visit["result"] = current["result"]
            if current.get("resultHistory"):
                visit["resultHistory"] = current["resultHistory"]
            data["visits"] = [visit if item["id"] == visit["id"] else item for item in data["visits"]]
            return {"status": 200, "save": True, "body": {"ok": True, "visit": visit}}

        result = mutate(run)
        self.send_json(result["status"], result["body"])

    def do_PUT(self):
        path, _query = self.route()
        payload = self.read_json()
        if payload is None:
            self.send_json(400, {"ok": False, "error": "El cuerpo no es válido."})
            return

        def run(data):
            actor = self.actor(data)
            if not actor:
                return {"status": 401, "body": {"ok": False, "error": "Inicia sesión."}}
            match = re.fullmatch(r"/tours/(v[0-9]+)/result", path)
            if not match:
                return {"status": 404, "body": {"ok": False, "error": "No existe."}}
            current = next((visit for visit in data["visits"] if visit["id"] == match.group(1)), None)
            if not current:
                return {"status": 404, "body": {"ok": False, "error": "No encontré ese tour."}}
            if not allowed(actor, data, current):
                return {"status": 403, "body": {"ok": False, "error": "Ese tour no está en tu sala."}}
            if current["status"] == "cancelado":
                return clash("Un tour cancelado no lleva resultado.")
            today = time.strftime("%Y-%m-%d", time.localtime())
            if current["date"] > today:
                return {"status": 400, "body": {"ok": False, "error": "Ese tour todavía no ocurre."}}
            result, error = clean_result(payload, data, current)
            if error:
                return {"status": 400, "body": {"ok": False, "error": error}}
            expected = (current.get("result") or {}).get("version", 0)
            try:
                sent = int(payload.get("version") or 0)
            except (TypeError, ValueError):
                return {"status": 400, "body": {"ok": False, "error": "La versión no es válida."}}
            if sent != expected:
                return clash(CONFLICT_ERROR)
            now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            append_result_history(current, actor, now)
            result.update({"version": expected + 1, "by": actor["id"], "at": now})
            current["result"] = result
            return {"status": 200, "save": True, "body": {"ok": True, "visit": current}}

        result = mutate(run)
        self.send_json(result["status"], result["body"])

    def do_DELETE(self):
        path, _query = self.route()

        def run(data):
            actor = self.actor(data)
            if not actor:
                return {"status": 401, "body": {"ok": False, "error": "Inicia sesión."}}
            result_match = re.fullmatch(r"/tours/(v[0-9]+)/result", path)
            if result_match:
                if actor["role"] == "rep":
                    return {"status": 403, "body": {"ok": False, "error": "Solo el jefe o el administrador quitan un resultado."}}
                current = next((visit for visit in data["visits"] if visit["id"] == result_match.group(1)), None)
                if not current:
                    return {"status": 404, "body": {"ok": False, "error": "No encontré ese tour."}}
                if not allowed(actor, data, current):
                    return {"status": 403, "body": {"ok": False, "error": "Ese tour no está en tu sala."}}
                if not current.get("result"):
                    return {"status": 404, "body": {"ok": False, "error": "Ese tour no tiene resultado."}}
                now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
                append_result_history(current, actor, now)
                del current["result"]
                return {"status": 200, "save": True, "body": {"ok": True, "visit": current}}
            match = re.fullmatch(r"/tours/(v[0-9]+)", path)
            if not match:
                return {"status": 404, "body": {"ok": False, "error": "No existe."}}
            if actor["role"] == "rep":
                return {"status": 403, "body": {"ok": False, "error": "El rep solo consulta sus tours."}}
            current = next((visit for visit in data["visits"] if visit["id"] == match.group(1)), None)
            if not current:
                return {"status": 404, "body": {"ok": False, "error": "No encontré ese tour."}}
            if not allowed(actor, data, current):
                return {"status": 403, "body": {"ok": False, "error": "Ese tour no está en tu sala."}}
            data["visits"] = [visit for visit in data["visits"] if visit["id"] != current["id"]]
            return {"status": 200, "save": True, "body": {"ok": True}}

        result = mutate(run)
        self.send_json(result["status"], result["body"])


def serve():
    os.makedirs(os.path.dirname(ROOT), exist_ok=True)
    if not os.path.exists(ROOT):
        write_store(seed())
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()


def selftest():
    global ROOT, LOCK, ALLOW_ACTOR_HEADER
    ALLOW_ACTOR_HEADER = True
    folder = tempfile.mkdtemp()
    ROOT = os.path.join(folder, "ops.json")
    LOCK = ROOT + ".lock"
    write_store(seed())
    server = ThreadingHTTPServer((HOST, 0), Handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    port = server.server_address[1]

    def call(method, path, actor, body=None):
        import urllib.request
        req = urllib.request.Request(
            f"http://{HOST}:{port}{path}",
            data=None if body is None else json.dumps(body).encode(),
            method=method,
            headers={"X-Ops-Actor": actor, "Content-Type": "application/json"},
        )
        try:
            with urllib.request.urlopen(req) as res:
                return res.status, json.load(res)
        except urllib.error.HTTPError as error:
            return error.code, json.load(error)

    status, created = call("POST", "/api/tours", "jefe:jorge", {
        "repId": "ana", "date": "2026-11-06", "start": "17:00", "end": "18:00",
        "lead": "Lead #4777", "status": "pendiente", "note": "Prueba",
    })
    assert status == 201, created
    status, ana = call("GET", "/api/tours?rep=ana", "rep:ana")
    assert status == 200 and any(visit["lead"] == "Lead #4777" for visit in ana["visits"])
    status, blocked = call("GET", "/api/tours?rep=ana", "rep:luis")
    assert status == 403, blocked
    status, denied = call("PATCH", "/api/tours/" + created["visit"]["id"], "jefe:rosa", {
        "repId": "ana", "date": "2026-11-06", "start": "17:00", "end": "18:00",
        "lead": "Lead #4777", "status": "pendiente", "note": "",
    })
    assert status == 403, denied
    status, bad = call("POST", "/api/tours", "admin", {
        "repId": "ana", "date": "2026-11-06", "start": "17:00", "end": "18:00",
        "lead": "Cliente real", "status": "pendiente", "note": "",
    })
    assert status == 400, bad
    status, rep_write = call("POST", "/api/tours", "rep:ana", {
        "repId": "ana", "date": "2026-11-06", "start": "17:00", "end": "18:00",
        "lead": "Lead #4777", "status": "pendiente", "note": "",
    })
    assert status == 403, rep_write
    status, moved = call("PATCH", "/api/people/luis", "admin", {"roomId": "sur"})
    assert status == 200 and moved["person"]["roomId"] == "sur"
    status, rosa = call("GET", "/api/tours?date=2026-11-06", "jefe:rosa")
    assert status == 200 and any(visit["repId"] == "luis" for visit in rosa["visits"])
    status, directory = call("GET", "/api/directory", "")
    assert status == 200 and {person["id"] for person in directory["people"]} >= {"ana", "teo", "rosa"}
    status, seconds = call("POST", "/api/tours", "jefe:jorge", {
        "repId": "ana", "date": "2026-11-06", "start": "18:00:00", "end": "19:00:00",
        "lead": "Lead #188", "status": "pendiente", "note": "",
    })
    assert status == 201 and seconds["visit"]["start"] == "18:00", seconds
    status, short = call("POST", "/api/tours", "jefe:rosa", {
        "repId": "teo", "date": "2026-11-06", "start": "9:00", "end": "10:00",
        "lead": "Lead #210", "status": "pendiente", "note": "Sur",
    })
    assert status == 201 and short["visit"]["start"] == "09:00", short
    status, teo = call("GET", "/api/tours?rep=teo", "rep:teo")
    assert status == 200 and any(visit["note"] == "Sur" for visit in teo["visits"])
    status, jorge_teo = call("POST", "/api/tours", "jefe:jorge", {
        "repId": "teo", "date": "2026-11-06", "start": "11:00", "end": "12:00",
        "lead": "Lead #210", "status": "pendiente", "note": "",
    })
    assert status == 403, jorge_teo
    status, clash_hit = call("POST", "/api/tours", "jefe:jorge", {
        "repId": "ana", "date": "2026-11-06", "start": "09:30", "end": "10:00",
        "lead": "Lead #302", "status": "pendiente", "note": "",
    })
    assert status == 409, clash_hit
    status, reset = call("POST", "/api/reset", "admin", {})
    assert status == 200, reset
    status, ana = call("GET", "/api/tours?rep=ana", "rep:ana")
    assert not any(visit["lead"] == "Lead #4777" for visit in ana["visits"])
    server.shutdown()
    print("ops api selftest ok")


if __name__ == "__main__":
    if os.environ.get("OPS_SELFTEST") == "1":
        selftest()
    else:
        serve()
