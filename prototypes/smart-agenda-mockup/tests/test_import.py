#!/usr/bin/env python3
"""RED→GREEN mapper for POST /api/imports/preview. No HTTP, no photos on disk."""

import os
import sys
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "server"))

from ops_import import preview_text  # noqa: E402

PEOPLE = [
    {"id": "jorge", "name": "Jorge", "role": "jefe", "roomId": "norte"},
    {"id": "rosa", "name": "Rosa", "role": "jefe", "roomId": "sur"},
    {"id": "ana", "name": "Ana", "role": "rep", "roomId": "norte"},
    {"id": "luis", "name": "Luis", "role": "rep", "roomId": "norte"},
    {"id": "mira", "name": "Mira", "role": "rep", "roomId": "sur"},
    {"id": "teo", "name": "Teo", "role": "rep", "roomId": "sur"},
]

V1 = {
    "id": "v1", "repId": "ana", "date": "2026-11-06",
    "start": "09:30", "end": "10:30", "lead": "Lead #4920", "status": "confirmado",
}


class ImportPreviewTest(unittest.TestCase):
    def test_csv_maps_ana_and_selects_row(self):
        text = (
            "rep,fecha,inicio,fin,lead,estado,nota\n"
            "Ana,06/11/2026,9:00,10:00,#8801,pendiente,Import CSV\n"
            "Luis,2026-11-06,11:00,12:00,Lead #8802,confirmado,\n"
        )
        result = preview_text(text, PEOPLE, default_date="2026-11-06", visits=[])
        self.assertEqual(result["engine"], "rules")
        self.assertEqual(len(result["rows"]), 2)
        first = result["rows"][0]
        self.assertEqual(first["visit"]["repId"], "ana")
        self.assertEqual(first["visit"]["lead"], "Lead #8801")
        self.assertEqual(first["visit"]["start"], "09:00")
        self.assertEqual(first["visit"]["date"], "2026-11-06")
        self.assertEqual(first["visit"]["note"], "Import CSV")
        self.assertFalse(first["issues"])
        self.assertTrue(first["selected"])
        self.assertEqual(result["rows"][1]["visit"]["repId"], "luis")
        self.assertEqual(result["rows"][1]["visit"]["status"], "confirmado")

    def test_unknown_rep_and_real_name_lead_are_issues(self):
        text = (
            "Pedro 09:00-10:00 Lead #8805\n"
            "Ana 10:00-11:00 Juan Pérez\n"
        )
        result = preview_text(text, PEOPLE, default_date="2026-11-06", visits=[])
        self.assertEqual(len(result["rows"]), 2)
        self.assertTrue(result["rows"][0]["issues"])
        self.assertFalse(result["rows"][0]["selected"])
        self.assertIn("directorio", " ".join(result["rows"][0]["issues"]).lower())
        self.assertTrue(result["rows"][1]["issues"])
        self.assertFalse(result["rows"][1]["selected"])
        self.assertEqual(result["rows"][1]["visit"]["repId"], "ana")

    def test_clash_with_existing_tour(self):
        text = "Ana 09:30-10:30 Lead #8806"
        result = preview_text(text, PEOPLE, default_date="2026-11-06", visits=[V1])
        row = result["rows"][0]
        self.assertTrue(row["clash"])
        self.assertFalse(row["selected"])
        self.assertEqual(row["visit"]["repId"], "ana")

    def test_json_and_default_end_hour(self):
        text = '[{"rep":"Mira","start":"14:00","lead":"Lead #8803"}]'
        result = preview_text(text, PEOPLE, default_date="2026-11-07", visits=[])
        row = result["rows"][0]
        self.assertEqual(row["visit"]["repId"], "mira")
        self.assertEqual(row["visit"]["end"], "15:00")
        self.assertEqual(row["visit"]["date"], "2026-11-07")
        self.assertTrue(row["selected"])

    def test_email_in_note_is_issue(self):
        text = "Teo,2026-11-06,16:00,17:00,Lead #8804,pendiente,escribir a ana@example.com"
        result = preview_text(text, PEOPLE, default_date="2026-11-06", visits=[])
        self.assertTrue(result["rows"][0]["issues"])
        self.assertFalse(result["rows"][0]["selected"])

    def test_caps_at_forty_rows(self):
        lines = ["rep,inicio,fin,lead"] + [
            f"Ana,09:00,10:00,Lead #{8000 + i}" for i in range(45)
        ]
        result = preview_text("\n".join(lines), PEOPLE, default_date="2026-11-06", visits=[])
        self.assertEqual(len(result["rows"]), 40)
        self.assertTrue(result["warnings"])


if __name__ == "__main__":
    unittest.main()
