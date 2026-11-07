// T12 (AC-14, BR-12, DS-05): contadores de Home a partir de los resultados.
import assert from "node:assert/strict";
import { homeCounters } from "../home-counters.js";

const DATE = "2026-11-06";
const visits = [
  { id: "v1", repId: "ana", date: DATE, status: "confirmado", result: { outcome: "venta", currency: "USD", amount: 8000 } },
  { id: "v2", repId: "ana", date: DATE, status: "en_curso", result: { outcome: "no_venta", objection: "dinero_cuota", recoverable: true } },
  { id: "v3", repId: "ana", date: DATE, status: "pendiente" },
  { id: "v4", repId: "luis", date: DATE, status: "confirmado", result: { outcome: "no_venta", objection: "pareja_decision", recoverable: false } },
  { id: "v5", repId: "mira", date: DATE, status: "pendiente", result: { outcome: "abandono", failStep: 6 } },
  { id: "v6", repId: "ana", date: "2026-11-07", status: "pendiente", result: { outcome: "venta", currency: "USD", amount: 500 } },
  { id: "v7", repId: "ana", date: DATE, status: "cancelado", result: { outcome: "venta", currency: "USD", amount: 999 } },
  { id: "v8", repId: "teo", date: DATE, status: "pendiente", result: { outcome: "venta", currency: "MXN", amount: 100000 } },
];

// DS-05: Ana 2 presentaciones, 1 cierre, $8,000 USD (v6 es otro día; v7 cancelado no cuenta).
assert.deepEqual(homeCounters(visits, "ana", DATE), { presentations: 2, closes: 1, volumeUSD: 8000 });
// Luis: 1 presentación (no venta), 0 cierres, $0.
assert.deepEqual(homeCounters(visits, "luis", DATE), { presentations: 1, closes: 0, volumeUSD: 0 });
// Mira: el abandono cuenta como presentación (Q-07).
assert.deepEqual(homeCounters(visits, "mira", DATE), { presentations: 1, closes: 0, volumeUSD: 0 });
// Teo: venta en MXN cuenta como cierre pero no suma al volumen USD (BR-12).
assert.deepEqual(homeCounters(visits, "teo", DATE), { presentations: 1, closes: 1, volumeUSD: 0 });

// ESC-13: corrección de venta a no venta baja los cierres.
const corrected = visits.map((visit) => (visit.id === "v1"
  ? { ...visit, result: { outcome: "no_venta", objection: "dinero_cuota", recoverable: false } }
  : visit));
assert.deepEqual(homeCounters(corrected, "ana", DATE), { presentations: 2, closes: 0, volumeUSD: 0 });

console.log("home-counters ok");
