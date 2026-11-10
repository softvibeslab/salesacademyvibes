"""Contract integration tests: isolated JSON, synthetic private users, localhost only."""
import base64
import concurrent.futures
import copy
import datetime
import hashlib
import http.client
import json
import os
from pathlib import Path
import sys
import tempfile
import threading
import time
import unittest
import uuid
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "server"))
import ops_api as api

PASSWORD = "Synthetic-test-only-2026!"
PNG = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4nGP4DwQACfsD/fteaysAAAAASUVORK5CYII="


def credentials(version="1"):
    salt = b"synthetic-salt-for-test"
    digest = hashlib.scrypt(PASSWORD.encode(), salt=salt, n=16384, r=8, p=1, dklen=32).hex()
    entry = {"version": version, "salt": salt.hex(), "hash": digest, "n": 16384, "r": 8, "p": 1}
    return {"users": {name: dict(entry) for name in ("ana", "luis", "mira", "jorge", "rosa", "admin")}}


class RegistrationHTTPTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory(prefix="sa-private-test-")
        cls.root = Path(cls.tmp.name)
        cls.cred = cls.root / "credentials.json"
        cls.base_credentials = credentials()
        cls.env = patch.dict(os.environ, {
            "OPS_AUTH_MODE": "private", "OPS_PRIVATE_CREDENTIALS_FILE": str(cls.cred),
            "OPS_TOUR_REGISTRATION_ENABLED": "1", "OPS_TOUR_REGISTRATION_MODE": "private",
            "OPS_TIME_ZONE": "America/Cancun", "OPS_TOUR_REGISTRATION_ORIGIN": "http://127.0.0.1",
        })
        cls.env.start()
        cls.old = (api.ROOT, api.LOCK)
        api.ROOT = str(cls.root / "ops.json")
        api.LOCK = api.ROOT + ".lock"
        cls.server = api.ThreadingHTTPServer(("127.0.0.1", 0), api.Handler)
        cls.port = cls.server.server_address[1]
        cls.origin = f"http://127.0.0.1:{cls.port}"
        os.environ["OPS_TOUR_REGISTRATION_ORIGIN"] = cls.origin
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join()
        api.ROOT, api.LOCK = cls.old
        cls.env.stop()
        cls.tmp.cleanup()

    def setUp(self):
        self.cred.write_text(json.dumps(self.base_credentials))
        self.cred.chmod(0o600)
        api.write_store(api.seed())
        api.LOGIN_FAILS.clear()
        os.environ["OPS_TOUR_REGISTRATION_ENABLED"] = "1"
        os.environ["OPS_AUTH_MODE"] = "private"
        os.environ["OPS_TOUR_REGISTRATION_MODE"] = "private"

    def call(self, method, path, body=None, cookie="", headers=None):
        h = {"Content-Type": "application/json", "Origin": self.origin}
        if cookie:
            h["Cookie"] = cookie
        h.update(headers or {})
        conn = http.client.HTTPConnection("127.0.0.1", self.port, timeout=30)
        conn.request(method, "/api" + path, json.dumps(body) if body is not None else None, h)
        response = conn.getresponse()
        raw = response.read()
        status, output_headers = response.status, dict(response.getheaders())
        conn.close()
        return status, json.loads(raw or b"{}"), output_headers

    def login(self, user="ana"):
        status, body, headers = self.call("POST", "/login", {"username": user, "password": PASSWORD})
        self.assertEqual(status, 200, body)
        return headers["Set-Cookie"].split(";", 1)[0]

    def payload(self, **changes):
        value = {"requestId": str(uuid.uuid4()), "source": "manual", "date": "2026-11-09",
                 "start": "10:00", "end": "11:00", "visitors": {"primaryName": "Synthetic Alpha", "companionName": "Synthetic Beta"},
                 "preferences": {"language": "es", "interests": ["Viajar"], "notes": "PRIVATE-NOTE-SENTINEL"},
                 "contact": {"type": "email", "value": "synthetic@example.invalid"}, "reviewConfirmed": True}
        value.update(changes)
        return value

    def create(self, cookie=None, payload=None):
        cookie = cookie or self.login()
        status, body, _ = self.call("POST", "/tour-registrations", payload or self.payload(), cookie)
        self.assertEqual(status, 201, body)
        return cookie, body

    def test_01_private_login_and_capabilities(self):
        cookie = self.login()
        status, body, _ = self.call("GET", "/tour-registrations/capabilities", cookie=cookie)
        self.assertEqual(status, 200)
        self.assertTrue(body["canRegister"])
        self.assertEqual(body["mode"], "private")
        status, body, _ = self.call("GET", "/tour-registrations/capabilities", headers={"X-Ops-Actor": "admin"})
        self.assertFalse(body["canRegister"])
        self.assertEqual(self.call("POST", "/login", {"username": "ana", "password": api.DEMO_PASSWORD})[0], 401)

    def test_02_create_persists_and_public_projection(self):
        cookie, body = self.create()
        ident = body["visit"]["id"]
        self.assertRegex(body["visit"]["lead"], r"^Lead #\d{4}$")
        self.assertEqual(body["registration"]["visitors"]["primaryName"], "Synthetic Alpha")
        persisted = api.read_store()
        self.assertIn(ident, persisted["tourRegistrations"])
        status, detail, headers = self.call("GET", "/tour-registrations/" + ident, cookie=cookie)
        self.assertEqual(status, 200)
        self.assertEqual(headers["Cache-Control"], "no-store")
        self.assertNotIn("payloadHash", detail["registration"])
        for route in ("/tours", "/context?today=2026-11-09", "/directory"):
            text = json.dumps(self.call("GET", route, headers={"X-Ops-Actor": "admin"})[1])
            for private in ("Synthetic Alpha", "PRIVATE-NOTE-SENTINEL", "synthetic@example.invalid"):
                self.assertNotIn(private, text)

    def test_03_scope_and_actor_spoofing(self):
        ana, body = self.create()
        ident = body["visit"]["id"]
        for other in (self.login("luis"), self.login("rosa"), ""):
            status, _, _ = self.call("GET", "/tour-registrations/" + ident, cookie=other, headers={"X-Ops-Actor": "admin"})
            self.assertIn(status, (401, 404))
        self.assertEqual(self.call("POST", "/tour-registrations", self.payload(repId="mira"), ana)[0], 403)
        self.assertEqual(self.call("GET", "/tour-registrations/" + ident, cookie=self.login("jorge"))[0], 200)

    def test_04_validation_and_no_writes(self):
        cookie = self.login()
        invalid = [self.payload(reviewConfirmed=False), self.payload(date="2026-02-30"), self.payload(end="09:00"),
                   self.payload(visitors={"primaryName": ""}), self.payload(visitors=[]),
                   self.payload(preferences={"interests": [1]}), self.payload(contact={"type": "email", "value": "bad"}),
                   self.payload(passport="forbidden"), [], "bad"]
        before = len(api.read_store()["visits"])
        for value in invalid:
            self.assertEqual(self.call("POST", "/tour-registrations", value, cookie)[0], 400)
        self.assertEqual(len(api.read_store()["visits"]), before)

    def test_05_idempotency_and_schedule_conflict(self):
        cookie = self.login()
        payload = self.payload()
        _, created = self.create(cookie, payload)
        status, repeated, _ = self.call("POST", "/tour-registrations", payload, cookie)
        self.assertEqual(status, 200)
        self.assertEqual(repeated["visit"]["id"], created["visit"]["id"])
        changed = copy.deepcopy(payload)
        changed["visitors"]["primaryName"] = "Different synthetic"
        self.assertEqual(self.call("POST", "/tour-registrations", changed, cookie)[1]["code"], "idempotency_conflict")
        self.assertEqual(self.call("POST", "/tour-registrations", self.payload(), cookie)[1]["code"], "schedule_conflict")

    def test_06_concurrent_create_and_actor_scoped_idempotency(self):
        cookie = self.login()
        payload = self.payload()
        with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
            results = list(pool.map(lambda _: self.call("POST", "/tour-registrations", payload, cookie), range(2)))
        self.assertEqual(sorted(r[0] for r in results), [200, 201])
        other = self.login("luis")
        self.assertEqual(self.call("POST", "/tour-registrations", payload, other)[0], 201)

    def test_07_origin_json_and_disabled(self):
        cookie = self.login()
        for origin in ("https://other.invalid", "null", ""):
            self.assertEqual(self.call("POST", "/tour-registrations", self.payload(), cookie, {"Origin": origin})[0], 403)
        self.assertEqual(self.call("POST", "/tour-registrations", self.payload(), cookie, {"Content-Type": "text/plain"})[0], 415)
        os.environ["OPS_TOUR_REGISTRATION_ENABLED"] = "0"
        self.assertEqual(self.call("POST", "/tour-registrations", self.payload(), cookie)[0], 503)
        self.assertFalse(self.call("GET", "/tour-registrations/capabilities", cookie=cookie)[1]["canRegister"])

    def test_08_protected_legacy_mutations_even_disabled(self):
        cookie, body = self.create()
        ident = body["visit"]["id"]
        os.environ["OPS_TOUR_REGISTRATION_ENABLED"] = "0"
        cases = [("DELETE", "/tours/" + ident, None), ("PATCH", "/tours/" + ident, body["visit"]),
                 ("PUT", "/tours/" + ident + "/result", {}), ("DELETE", "/tours/" + ident + "/result", None),
                 ("PATCH", "/people/ana", {"roomId": "sur"}), ("POST", "/reset", {})]
        for method, route, value in cases:
            self.assertIn(self.call(method, route, value, headers={"X-Ops-Actor": "admin"})[0], (401, 403))
        self.assertEqual(self.call("DELETE", "/tours/" + ident, cookie=cookie, headers={"X-Ops-Actor": "admin"})[0], 403)
        self.assertIn(ident, api.read_store()["tourRegistrations"])

    def test_09_private_move_does_not_transfer_history(self):
        ana, body = self.create()
        ident = body["visit"]["id"]
        admin = self.login("admin")
        self.assertEqual(self.call("PATCH", "/people/ana", {"roomId": "sur"}, admin)[0], 200)
        self.assertEqual(self.call("GET", "/tour-registrations/" + ident, cookie=ana)[0], 404)
        self.assertEqual(self.call("GET", "/tour-registrations/" + ident, cookie=self.login("rosa"))[0], 404)
        self.assertEqual(self.call("GET", "/tour-registrations/" + ident, cookie=self.login("jorge"))[0], 200)

    def test_10_rotation_and_mode_revoke_session(self):
        cookie = self.login()
        rotated = copy.deepcopy(self.base_credentials)
        rotated["users"]["ana"]["version"] = "2"
        self.cred.write_text(json.dumps(rotated))
        self.assertEqual(self.call("GET", "/tour-registrations", cookie=cookie)[0], 401)
        self.assertEqual(self.call("GET", "/me", cookie=cookie)[0], 401)
        cookie = self.login()
        os.environ["OPS_AUTH_MODE"] = "demo"
        self.assertEqual(self.call("GET", "/tour-registrations", cookie=cookie)[0], 401)

    def test_11_retention_and_expired_idempotency(self):
        cookie = self.login()
        payload = self.payload()
        _, body = self.create(cookie, payload)
        ident = body["visit"]["id"]
        data = api.read_store()
        data["tourRegistrations"][ident]["createdAt"] = "2020-01-01T00:00:00Z"
        api.write_store(data)
        self.assertEqual(self.call("GET", "/tour-registrations/" + ident, cookie=cookie)[0], 404)
        self.assertEqual(self.call("POST", "/tour-registrations", payload, cookie)[1]["code"], "registration_expired")
        saved = json.dumps(api.read_store())
        self.assertNotIn("Synthetic Alpha", saved)
        self.assertNotIn("PRIVATE-NOTE-SENTINEL", saved)
        self.assertTrue(any(v["id"] == ident for v in api.read_store()["visits"]))

    def test_12_preview_invalid_unavailable_and_no_persistence(self):
        cookie = self.login()
        self.assertEqual(self.call("POST", "/tour-registrations/preview", {"image": "broken", "mime": "image/jpeg"}, cookie)[0], 415)
        with patch.dict(os.environ, {"PATH": ""}):
            status, body, _ = self.call("POST", "/tour-registrations/preview", {"image": PNG, "mime": "image/png"}, cookie)
        self.assertEqual(status, 200)
        self.assertEqual(body["candidates"]["primaryName"]["value"], "")
        self.assertEqual(body["warnings"][0]["code"], "ocr_unavailable")
        self.assertFalse(api.read_store().get("tourRegistrations"))
        self.assertNotIn(PNG, json.dumps(api.read_store()))

    def test_13_bad_credentials_permissions_fail_closed(self):
        cookie = self.login()
        self.cred.chmod(0o644)
        self.assertEqual(self.call("GET", "/tour-registrations", cookie=cookie)[0], 401)
        self.assertFalse(self.call("GET", "/tour-registrations/capabilities", cookie=cookie)[1]["canRegister"])

    def test_14_ocr_runs_without_lock_and_rechecks_logout(self):
        import survey_preview
        cookie = self.login()
        entered, release = threading.Event(), threading.Event()
        def slow_ocr(raw, mime):
            entered.set()
            release.wait(4)
            return {"ok": True, "engine": "tesseract", "candidates": survey_preview.empty_candidates(), "warnings": []}
        with patch.object(survey_preview, "preview", slow_ocr):
            with concurrent.futures.ThreadPoolExecutor(max_workers=1) as pool:
                future = pool.submit(self.call, "POST", "/tour-registrations/preview", {"image": PNG, "mime": "image/png"}, cookie)
                self.assertTrue(entered.wait(2))
                start = time.monotonic()
                self.assertEqual(self.call("GET", "/tours", cookie=cookie)[0], 200)
                self.assertLess(time.monotonic() - start, 1)
                self.assertEqual(self.call("POST", "/logout", {}, cookie)[0], 200)
                release.set()
                self.assertEqual(future.result()[0], 401)

    def test_15_preview_labels_and_timeout_cleanup(self):
        import survey_preview
        import subprocess
        result = survey_preview.parse_text("Nombre: Ana Demo\nAcompanante: Luis Demo\nIdioma: Espanol\nIntereses: Playa, descanso\nNotas: Nota sintetica\nPasaporte: No extraer\nTelefono: 0000000000")
        self.assertEqual(result["primaryName"]["value"], "Ana Demo")
        self.assertEqual(result["language"]["value"], "es")
        self.assertEqual(result["interests"]["value"], ["Playa", "descanso"])
        self.assertNotIn("No extraer", json.dumps(result))
        temporary_paths = []
        def fake_run(command, **kwargs):
            self.assertLessEqual(kwargs["timeout"], 20)
            if command[-1] == "--list-langs":
                return subprocess.CompletedProcess(command, 0, b"eng\nspa\n", b"")
            temporary_paths.append(command[1])
            self.assertEqual(os.stat(command[1]).st_mode & 0o777, 0o600)
            raise subprocess.TimeoutExpired(command, kwargs["timeout"])
        with patch.object(survey_preview.shutil, "which", return_value="/synthetic/tesseract"), patch.object(survey_preview.subprocess, "run", fake_run):
            timed = survey_preview.preview(base64.b64decode(PNG), "image/png")
        self.assertEqual(timed["warnings"][0]["code"], "ocr_timeout")
        self.assertTrue(temporary_paths)
        self.assertFalse(any(os.path.exists(path) for path in temporary_paths))

    def test_16_provision_cli_rotation_and_no_password_output(self):
        import subprocess
        path = self.root / "provision-test.json"
        path.unlink(missing_ok=True)
        command = [sys.executable, "-B", str(Path(api.__file__).parent / "provision_private_user.py"), "--file", str(path), "--user", "ana"]
        run = subprocess.run(command, input=PASSWORD + "\n", capture_output=True, text=True, check=False)
        self.assertEqual(run.returncode, 0, run.stderr)
        self.assertNotIn(PASSWORD, run.stdout + run.stderr)
        first = json.loads(path.read_text())["users"]["ana"]
        self.assertEqual(path.stat().st_mode & 0o777, 0o600)
        self.assertNotIn(first["hash"], run.stdout + run.stderr)
        second = subprocess.run(command, input=PASSWORD + "\n", capture_output=True, text=True, check=False)
        self.assertEqual(second.returncode, 0)
        self.assertNotEqual(first["version"], json.loads(path.read_text())["users"]["ana"]["version"])
        revoked = subprocess.run(command + ["--delete"], capture_output=True, text=True, check=False)
        self.assertEqual(revoked.returncode, 0)
        self.assertNotIn("ana", json.loads(path.read_text())["users"])

    def test_17_reset_tombstones_requires_private_admin(self):
        cookie = self.login()
        payload = self.payload()
        _, body = self.create(cookie, payload)
        data = api.read_store()
        data["tourRegistrations"][body["visit"]["id"]]["createdAt"] = "2020-01-01T00:00:00Z"
        api.write_store(data)
        self.call("GET", "/tour-registrations", cookie=cookie)
        self.assertFalse(api.read_store()["tourRegistrations"])
        self.assertIn(self.call("POST", "/reset", {}, headers={"X-Ops-Actor": "admin"})[0], (401, 403))
        self.assertEqual(self.call("POST", "/tour-registrations", payload, cookie)[1]["code"], "registration_expired")

    def test_18_idempotent_replay_cannot_downgrade_private_data(self):
        cookie = self.login()
        payload = self.payload()
        self.create(cookie, payload)
        os.environ["OPS_AUTH_MODE"] = "demo"
        os.environ["OPS_TOUR_REGISTRATION_MODE"] = "demo"
        status, _, headers = self.call("POST", "/login", {"username": "ana", "password": api.DEMO_PASSWORD})
        self.assertEqual(status, 200)
        demo = headers["Set-Cookie"].split(";", 1)[0]
        status, body, _ = self.call("POST", "/tour-registrations", payload, demo)
        self.assertIn(status, (403, 404))
        self.assertNotIn("Synthetic Alpha", json.dumps(body))

    def test_19_rotation_during_login_does_not_adopt_new_version(self):
        import private_auth
        original = private_auth.hashlib.scrypt
        def rotate_during_verify(*args, **kwargs):
            digest = original(*args, **kwargs)
            rotated = copy.deepcopy(self.base_credentials)
            rotated["users"]["ana"]["version"] = "rotated-during-password-check"
            self.cred.write_text(json.dumps(rotated))
            return digest
        with patch.object(private_auth.hashlib, "scrypt", rotate_during_verify):
            status, _, headers = self.call("POST", "/login", {"username": "ana", "password": PASSWORD})
        self.assertEqual(status, 401)
        self.assertNotIn("Set-Cookie", headers)

    def test_20_private_login_logout_reject_cross_origin(self):
        body = {"username": "ana", "password": PASSWORD}
        self.assertEqual(self.call("POST", "/login", body, headers={"Origin": "https://other.invalid"})[0], 403)
        self.assertEqual(self.call("POST", "/login", body, headers={"Content-Type": "text/plain"})[0], 415)
        cookie = self.login()
        self.assertEqual(self.call("POST", "/logout", {}, cookie, {"Origin": "null"})[0], 403)
        self.assertEqual(self.call("GET", "/me", cookie=cookie)[0], 200)

    def test_21_invalid_image_containers_rejected_before_subprocess(self):
        import survey_preview
        import struct
        forged_png = b"\x89PNG\r\n\x1a\n" + struct.pack(">I", 13) + b"IHDR" + struct.pack(">II", 1, 1) + b"X" * 13 + b"IEND\xaeB`\x82"
        forged_jpeg = b"\xff\xd8\xff\xc0\x00\x08\x08\x00\x01\x00\x01\x01\xff\xd9"
        for mime, value in (("image/png", forged_png), ("image/jpeg", forged_jpeg)):
            raw, error = survey_preview.image_bytes({"mime": mime, "image": base64.b64encode(value).decode()})
            self.assertIsNone(raw)
            self.assertEqual(error, "invalid_image")
        valid, error = survey_preview.image_bytes({"mime": "image/png", "image": PNG})
        self.assertTrue(valid)
        self.assertEqual(error, "")


if __name__ == "__main__":
    unittest.main()
