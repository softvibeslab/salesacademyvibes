#!/usr/bin/env python3
"""Demo JSON API for Sales Academy tours. Not authentication."""

import json
import os
import re
import tempfile
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

HOST = "127.0.0.1"
PORT = int(os.environ.get("OPS_PORT", "8026"))
ROOT = os.environ.get("OPS_DATA", "/var/lib/salesacademy-ops/ops.json")
LOCK = ROOT + ".lock"

LEAD = re.compile(r"^Lead #\d{3,4}$")
CLOCK_IN = re.compile(r"^(\d{1,2}):([0-5]\d)(?::[0-5]\d)?$")
DAY = re.compile(r"^\d{4}-\d{2}-\d{2}$")
STATUSES = {"confirmado", "en_curso", "pendiente", "cancelado"}


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
    return visits, ""


class Handler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, fmt, *args):
        return

    def actor(self, data):
        return parse_actor(self.headers.get("X-Ops-Actor"), data)

    def send_json(self, status, payload):
        raw = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(raw)

    def read_json(self):
        length = int(self.headers.get("Content-Length") or "0")
        if length < 0 or length > 8192:
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
            actor = self.actor(data)
            if not actor:
                return {"status": 401, "body": {"ok": False, "error": "Falta el rol."}}
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
        payload = self.read_json()
        if payload is None:
            self.send_json(400, {"ok": False, "error": "El cuerpo no es válido."})
            return

        def run(data):
            actor = self.actor(data)
            if not actor:
                return {"status": 401, "body": {"ok": False, "error": "Falta el rol."}}
            if path == "/reset":
                if actor["role"] != "admin":
                    return {"status": 403, "body": {"ok": False, "error": "Solo el administrador restaura el ejemplo."}}
                fresh = seed()
                data.clear()
                data.update(fresh)
                return {"status": 200, "save": True, "body": {"ok": True}}
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
        self.send_json(result["status"], result["body"])

    def do_PATCH(self):
        path, _query = self.route()
        payload = self.read_json()
        if payload is None:
            self.send_json(400, {"ok": False, "error": "El cuerpo no es válido."})
            return

        def run(data):
            actor = self.actor(data)
            if not actor:
                return {"status": 401, "body": {"ok": False, "error": "Falta el rol."}}
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
            data["visits"] = [visit if item["id"] == visit["id"] else item for item in data["visits"]]
            return {"status": 200, "save": True, "body": {"ok": True, "visit": visit}}

        result = mutate(run)
        self.send_json(result["status"], result["body"])

    def do_DELETE(self):
        path, _query = self.route()

        def run(data):
            actor = self.actor(data)
            if not actor:
                return {"status": 401, "body": {"ok": False, "error": "Falta el rol."}}
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
    global ROOT, LOCK
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
