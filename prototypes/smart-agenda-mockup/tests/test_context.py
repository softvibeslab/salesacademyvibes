#!/usr/bin/env python3
"""RED→GREEN: contexto del usuario para Hermes (feature hermes-contexto). Sin HTTP."""

import json
import os
import sys
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "server"))

from ops_context import build_context, context_text  # noqa: E402

DATA = {
    "rooms": [{"id": "norte", "name": "Sala Norte"}, {"id": "sur", "name": "Sala Sur"}],
    "people": [
        {"id": "jorge", "name": "Jorge", "role": "jefe", "roomId": "norte"},
        {"id": "ana", "name": "Ana", "role": "rep", "roomId": "norte"},
        {"id": "luis", "name": "Luis", "role": "rep", "roomId": "norte"},
    ],
}
ANA = {"id": "ana", "role": "rep", "name": "Ana"}


def visit(vid, date, start, end, lead, status="confirmado", result=None, rep="ana", note=""):
    v = {"id": vid, "repId": rep, "date": date, "start": start, "end": end, "lead": lead, "status": status, "note": note}
    if result:
        v["result"] = result
        v["resultHistory"] = [{"at": 1, "by": "ana", "previous": None}]
    return v


VISITS = [
    visit("a1", "2026-11-02", "10:00", "11:00", "Lead #100", result={"outcome": "no_venta", "objection": "dinero_cuota", "recoverable": True, "note": "tel 998 123 4567", "nextStep": {"action": "llamada", "date": "2026-11-06", "ownerId": "ana"}}),
    visit("a2", "2026-11-03", "10:00", "11:00", "Lead #101", result={"outcome": "no_venta", "objection": "dinero_cuota", "recoverable": False, "note": ""}),
    visit("a3", "2026-11-04", "10:00", "11:00", "Lead #102", result={"outcome": "abandono", "failStep": 7, "note": ""}),
    visit("a4", "2026-11-05", "10:00", "11:00", "Lead #103"),  # sin resultado: pendiente
    visit("a5", "2026-11-05", "12:00", "13:00", "Lead #104", status="cancelado"),
    visit("h1", "2026-11-06", "09:30", "10:30", "Lead #4920", result={"outcome": "venta", "currency": "USD", "amount": 8000, "note": "x"}),
    visit("h2", "2026-11-06", "11:30", "12:30", "Lead #302", status="en_curso", note="Seguimiento"),
    visit("h3", "2026-11-06", "15:30", "16:30", "Lead #188", status="pendiente"),
    visit("f1", "2026-11-07", "10:00", "11:00", "Lead #441", status="pendiente"),
    visit("o1", "2026-10-30", "10:00", "11:00", "Lead #900", result={"outcome": "venta", "currency": "USD", "amount": 5000, "note": ""}),
]


class ContextTest(unittest.TestCase):
    def setUp(self):
        self.ctx = build_context(DATA, ANA, VISITS, "2026-11-06")

    def test_user_and_agenda(self):
        c = self.ctx
        self.assertEqual(c["user"], {"name": "Ana", "role": "rep", "room": "Sala Norte"})
        self.assertEqual(c["today"], "2026-11-06")
        self.assertEqual([a["start"] for a in c["agenda"]], ["09:30", "11:30", "15:30"])
        self.assertEqual(c["agenda"][0]["result"], "Venta USD 8,000")
        self.assertIsNone(c["agenda"][1]["result"])
        self.assertEqual(c["agenda"][1]["note"], "Seguimiento")

    def test_month_summary_excludes_cancelled_future_and_other_months(self):
        m = self.ctx["month"]
        # nov 1–6 sin cancelados: a1 a2 a3 a4 h1 h2 h3 = 7
        self.assertEqual(m["tours"], 7)
        self.assertEqual(m["withResult"], 4)
        self.assertEqual(m["sales"], 1)
        self.assertEqual(m["noSales"], 2)
        self.assertEqual(m["abandons"], 1)
        self.assertEqual(m["volumeUSD"], 8000)
        self.assertEqual(m["volumeMXN"], 0)
        self.assertEqual(m["closePct"], 25)

    def test_objections_failsteps_pending_followups_upcoming(self):
        c = self.ctx
        self.assertEqual(c["topObjections"], [{"id": "dinero_cuota", "label": "Dinero o cuota", "count": 2}])
        self.assertEqual(c["failSteps"], [{"n": 7, "title": "Recorrido", "count": 1}])
        self.assertEqual([p["lead"] for p in c["pendingResults"]], ["Lead #103"])
        self.assertEqual(c["followUps"], [{"lead": "Lead #100", "action": "Llamada", "date": "2026-11-06", "owner": "Ana"}])
        self.assertEqual([u["lead"] for u in c["upcoming"]], ["Lead #441"])

    def test_privacy_no_result_notes_or_history(self):
        raw = json.dumps(self.ctx, ensure_ascii=False)
        self.assertNotIn("998 123 4567", raw)
        self.assertNotIn("resultHistory", raw)

    def test_rep_only_sees_own_visits(self):
        other = VISITS + [visit("l1", "2026-11-06", "08:00", "09:00", "Lead #555", rep="luis")]
        c = build_context(DATA, ANA, other, "2026-11-06")
        self.assertNotIn("Lead #555", json.dumps(c, ensure_ascii=False))

    def test_tasks_pending_due_today_or_before_and_done_count(self):
        data = {**DATA, "tasks": [
            {"id": "a", "repId": "ana", "title": "Confirmar seguimiento", "due": "2026-11-06", "when": "10:45", "status": "pendiente"},
            {"id": "b", "repId": "ana", "title": "Mañana", "due": "2026-11-07", "when": "", "status": "pendiente"},
            {"id": "c", "repId": "ana", "title": "Hecha", "due": "2026-11-05", "when": "", "status": "hecha"},
            {"id": "d", "repId": "luis", "title": "De Luis", "due": "2026-11-06", "when": "", "status": "pendiente"},
        ]}
        c = build_context(data, ANA, VISITS, "2026-11-06")
        self.assertEqual(c["tasks"], [{"title": "Confirmar seguimiento", "due": "2026-11-06", "when": "10:45"}])
        self.assertEqual(c["month"]["tasksDone"], 1)
        self.assertIn("Tareas pendientes: Confirmar seguimiento (2026-11-06 10:45)", context_text(c))

    def test_text_for_prompt_is_compact_and_readable(self):
        text = context_text(self.ctx)
        self.assertIn("Ana", text)
        self.assertIn("09:30", text)
        self.assertIn("Venta USD 8,000", text)
        self.assertIn("Dinero o cuota", text)
        self.assertLessEqual(len(text.encode("utf-8")), 4096)


if __name__ == "__main__":
    unittest.main()
