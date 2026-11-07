#!/usr/bin/env python3
"""RED→GREEN: validación de evidencia y retención (feature tareas-evidencia). Sin HTTP."""

import base64
import os
import sys
import tempfile
import time
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "server"))

from ops_tasks import clean_task, validate_evidence, purge_expired, seed_tasks, RETENTION_DAYS  # noqa: E402

PNG = base64.b64decode("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==")
JPEG = b"\xff\xd8\xff\xe0" + b"\x00" * 60
WEBM = b"\x1a\x45\xdf\xa3" + b"\x00" * 60
MP4 = b"\x00\x00\x00\x18ftypM4A " + b"\x00" * 60
b64 = lambda raw: base64.b64encode(raw).decode()
PEOPLE = [
    {"id": "jorge", "role": "jefe", "roomId": "norte"},
    {"id": "ana", "role": "rep", "roomId": "norte"},
    {"id": "mira", "role": "rep", "roomId": "sur"},
]


class EvidenceTest(unittest.TestCase):
    def test_valid_image_and_audio(self):
        raw, meta, err = validate_evidence({"kind": "imagen", "mime": "image/png", "data": b64(PNG), "consent": True})
        self.assertEqual(err, "")
        self.assertEqual(raw, PNG)
        self.assertEqual(meta["ext"], "png")
        raw, meta, err = validate_evidence({"kind": "imagen", "mime": "image/jpeg", "data": b64(JPEG), "consent": True})
        self.assertEqual(err, "")
        raw, meta, err = validate_evidence({"kind": "audio", "mime": "audio/webm;codecs=opus", "data": b64(WEBM), "durationSec": 42, "consent": True})
        self.assertEqual((err, meta["mime"], meta["durationSec"]), ("", "audio/webm", 42))
        raw, meta, err = validate_evidence({"kind": "audio", "mime": "audio/mp4", "data": b64(MP4), "durationSec": 10, "consent": True})
        self.assertEqual(err, "")

    def test_rejections(self):
        base = {"kind": "imagen", "mime": "image/png", "data": b64(PNG), "consent": True}
        self.assertIn("consentimiento", validate_evidence({**base, "consent": False})[2])
        self.assertIn("tipo", validate_evidence({**base, "mime": "application/pdf"})[2])
        self.assertIn("no coincide", validate_evidence({**base, "data": b64(b"<svg onload=alert(1)>")})[2])
        self.assertIn("no coincide", validate_evidence({**base, "mime": "image/jpeg"})[2])
        self.assertIn("evidencia", validate_evidence({**base, "data": "%%%"})[2])
        self.assertIn("grande", validate_evidence({**base, "data": b64(PNG + b"\x00" * 700_001)})[2])
        audio = {"kind": "audio", "mime": "audio/webm", "data": b64(WEBM), "consent": True}
        self.assertIn("60", validate_evidence({**audio, "durationSec": 61})[2])
        self.assertIn("60", validate_evidence({**audio, "durationSec": 0})[2])
        self.assertIn("tipo", validate_evidence({**audio, "kind": "video"})[2])


class TaskTest(unittest.TestCase):
    def test_clean_task_rules(self):
        jefe = {"id": "jorge", "role": "jefe"}
        task, err = clean_task({"repId": "ana", "title": "Llamar a Lead #302", "detail": "Propuesta", "due": "2026-11-06", "when": "10:45"}, PEOPLE, jefe)
        self.assertEqual(err, "")
        self.assertEqual((task["repId"], task["status"], task["evidence"]), ("ana", "pendiente", None))
        self.assertIn("sala", clean_task({"repId": "mira", "title": "x", "due": "2026-11-06"}, PEOPLE, jefe)[1])
        rep = {"id": "ana", "role": "rep"}
        self.assertIn("ti", clean_task({"repId": "mira", "title": "x", "due": "2026-11-06"}, PEOPLE, rep)[1])
        self.assertIn("título", clean_task({"repId": "ana", "title": "", "due": "2026-11-06"}, PEOPLE, rep)[1])
        self.assertIn("fecha", clean_task({"repId": "ana", "title": "x", "due": "2026-13-45"}, PEOPLE, rep)[1])
        self.assertIn("teléfonos", clean_task({"repId": "ana", "title": "Llamar al 998 123 4567", "due": "2026-11-06"}, PEOPLE, rep)[1])

    def test_seed(self):
        tasks = seed_tasks()
        self.assertTrue(any(t["repId"] == "ana" for t in tasks))
        self.assertTrue(all(t["status"] == "pendiente" and t["evidence"] is None for t in tasks))


class RetentionTest(unittest.TestCase):
    def test_purge_after_30_days(self):
        self.assertEqual(RETENTION_DAYS, 30)
        with tempfile.TemporaryDirectory() as folder:
            now = time.time()
            old = {"id": "t1", "status": "hecha", "evidence": {"kind": "imagen", "mime": "image/png", "ext": "png", "at": now - 31 * 86400, "expired": False}}
            new = {"id": "t2", "status": "hecha", "evidence": {"kind": "imagen", "mime": "image/png", "ext": "png", "at": now - 2 * 86400, "expired": False}}
            for t in (old, new):
                open(os.path.join(folder, f"{t['id']}.png"), "wb").write(PNG)
            data = {"tasks": [old, new]}
            changed = purge_expired(data, folder, now)
            self.assertTrue(changed)
            self.assertFalse(os.path.exists(os.path.join(folder, "t1.png")))
            self.assertTrue(os.path.exists(os.path.join(folder, "t2.png")))
            self.assertTrue(old["evidence"]["expired"])
            self.assertEqual(old["status"], "hecha")
            self.assertFalse(purge_expired(data, folder, now), "segunda pasada sin cambios")


if __name__ == "__main__":
    unittest.main()
