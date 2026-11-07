import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LIVE = process.env.OPS_BASE || "";
const PORT = 18000 + Math.floor(Math.random() * 1000);
const TMP = mkdtempSync(path.join(tmpdir(), "ops-e2e-"));

let child = null;
const base = LIVE.replace(/\/$/, "") || `http://127.0.0.1:${PORT}`;

async function api(method, url, actor, body) {
  const headers = { Accept: "application/json" };
  if (actor) headers["X-Ops-Actor"] = actor;
  if (body) headers["Content-Type"] = "application/json";
  const response = await fetch(base + url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { ok: false, raw: text.slice(0, 120) }; }
  return { status: response.status, data };
}

async function waitHealth() {
  for (let i = 0; i < 50; i += 1) {
    try {
      const probe = await fetch(`${base}/api/health`);
      if (probe.ok) return;
    } catch { /* still booting */ }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error("el API no arrancó");
}

if (!LIVE) {
  child = spawn("python3", [path.join(ROOT, "server/ops_api.py")], {
    env: { ...process.env, OPS_DATA: path.join(TMP, "ops.json"), OPS_PORT: String(PORT) },
    stdio: ["ignore", "ignore", "inherit"],
  });
}

try {
  await waitHealth();
  let step = await api("POST", "/api/reset", "admin", {});
  assert.equal(step.status, 200, step.data);

  step = await api("GET", "/api/directory");
  assert.equal(step.status, 200);
  assert.ok(step.data.people.some((person) => person.id === "teo"));

  step = await api("POST", "/api/tours", "jefe:jorge", {
    repId: "ana", date: "2026-11-06", start: "17:00", end: "18:00",
    lead: "Lead #4777", status: "pendiente", note: "Norte",
  });
  assert.equal(step.status, 201, step.data);
  const anaTour = step.data.visit.id;

  step = await api("GET", "/api/tours?rep=ana", "rep:ana");
  assert.equal(step.status, 200);
  assert.ok(step.data.visits.some((visit) => visit.id === anaTour));

  step = await api("GET", "/api/tours?rep=ana", "rep:luis");
  assert.equal(step.status, 403);

  step = await api("POST", "/api/tours", "jefe:rosa", {
    repId: "ana", date: "2026-11-06", start: "18:00", end: "19:00",
    lead: "Lead #302", status: "pendiente", note: "",
  });
  assert.equal(step.status, 403);

  step = await api("POST", "/api/tours", "jefe:rosa", {
    repId: "teo", date: "2026-11-06", start: "09:00:00", end: "10:00:00",
    lead: "Lead #210", status: "pendiente", note: "Sur",
  });
  assert.equal(step.status, 201, step.data);
  assert.equal(step.data.visit.start, "09:00");
  const teoTour = step.data.visit.id;

  step = await api("GET", "/api/tours?rep=teo", "rep:teo");
  assert.ok(step.data.visits.some((visit) => visit.id === teoTour && visit.note === "Sur"));

  step = await api("GET", "/api/tours?rep=teo", "rep:ana");
  assert.equal(step.status, 403);

  step = await api("POST", "/api/tours", "admin", {
    repId: "teo", date: "2026-11-06", start: "9:30", end: "10:30",
    lead: "Cliente real", status: "pendiente", note: "",
  });
  assert.equal(step.status, 400);

  step = await api("POST", "/api/tours", "jefe:rosa", {
    repId: "teo", date: "2026-11-06", start: "09:30", end: "10:30",
    lead: "Lead #077", status: "pendiente", note: "",
  });
  assert.equal(step.status, 409);

  step = await api("PATCH", `/api/tours/${teoTour}`, "jefe:rosa", {
    repId: "teo", date: "2026-11-06", start: "11:00", end: "12:00",
    lead: "Lead #210", status: "confirmado", note: "Sur",
  });
  assert.equal(step.status, 200, step.data);

  step = await api("GET", "/api/tours?rep=teo", "rep:teo");
  assert.ok(step.data.visits.some((visit) => visit.id === teoTour && visit.status === "confirmado" && visit.start === "11:00"));

  step = await api("DELETE", `/api/tours/${teoTour}`, "jefe:rosa");
  assert.equal(step.status, 200);
  step = await api("GET", "/api/tours?rep=teo", "rep:teo");
  assert.ok(!step.data.visits.some((visit) => visit.id === teoTour));

  step = await api("PATCH", "/api/people/luis", "admin", { roomId: "sur" });
  assert.equal(step.status, 200);
  step = await api("GET", "/api/tours?rep=luis", "jefe:rosa");
  assert.equal(step.status, 200);
  step = await api("GET", "/api/tours?rep=luis", "jefe:jorge");
  assert.equal(step.status, 403);
  step = await api("POST", "/api/tours", "jefe:jorge", {
    repId: "luis", date: "2026-11-06", start: "18:00", end: "19:00",
    lead: "Lead #210", status: "pendiente", note: "",
  });
  assert.equal(step.status, 403);

  // ---- Resultado del tour (historia 2026-11-07, REQ-001..REQ-007) ----
  step = await api("POST", "/api/reset", "admin", {});
  assert.equal(step.status, 200);

  // T01: el rep registra una venta en su tour y el jefe la lee (AC-01)
  const saleBody = { outcome: "venta", currency: "USD", amount: 8000, version: 0 };
  step = await api("PUT", "/api/tours/v1/result", "rep:ana", saleBody);
  assert.equal(step.status, 200, JSON.stringify(step.data));
  assert.equal(step.data.visit.result.version, 1);
  step = await api("GET", "/api/tours?date=2026-11-06", "jefe:jorge");
  let v1jefe = step.data.visits.find((visit) => visit.id === "v1");
  assert.equal(v1jefe.result.outcome, "venta");
  assert.equal(v1jefe.result.amount, 8000);
  assert.ok(v1jefe.resultHistory && v1jefe.resultHistory.length === 1);

  // T13: tour sin resultado no trae el campo; el rep no ve resultHistory (AC-03)
  step = await api("GET", "/api/tours?rep=ana", "rep:ana");
  assert.equal(step.data.visits.find((visit) => visit.id === "v3").result, undefined);
  const v1rep = step.data.visits.find((visit) => visit.id === "v1");
  assert.ok(v1rep.result);
  assert.equal(v1rep.resultHistory, undefined);

  // T02: validación de venta (AC-04, DS-02 filas 1-6)
  for (const body of [
    { outcome: "venta", currency: "USD", version: 1 },
    { outcome: "venta", currency: "USD", amount: 0, version: 1 },
    { outcome: "venta", currency: "USD", amount: -5, version: 1 },
    { outcome: "venta", currency: "USD", amount: 1000001, version: 1 },
    { outcome: "venta", currency: "EUR", amount: 8000, version: 1 },
  ]) {
    step = await api("PUT", "/api/tours/v1/result", "rep:ana", body);
    assert.equal(step.status, 400, JSON.stringify(step.data));
  }
  step = await api("PUT", "/api/tours/v1/result", "rep:ana", { outcome: "venta", currency: "USD", amount: 1000000, version: 1 });
  assert.equal(step.status, 200, JSON.stringify(step.data));
  assert.equal(step.data.visit.result.version, 2);

  // T03: no venta exige objeción, recuperable y siguiente paso completo (AC-05, DS-02 filas 7-13)
  for (const body of [
    { outcome: "no_venta", version: 0 },
    { outcome: "no_venta", objection: "otra", recoverable: false, version: 0 },
    { outcome: "no_venta", objection: "dinero_cuota", version: 0 },
    { outcome: "no_venta", objection: "dinero_cuota", recoverable: true, version: 0 },
    { outcome: "no_venta", objection: "dinero_cuota", recoverable: true, nextStep: { action: "segunda_visita", date: "2026-11-05", ownerId: "ana" }, version: 0 },
    { outcome: "no_venta", objection: "dinero_cuota", recoverable: true, nextStep: { action: "segunda_visita", date: "2026-11-08", ownerId: "mira" }, version: 0 },
  ]) {
    step = await api("PUT", "/api/tours/v2/result", "rep:ana", body);
    assert.equal(step.status, 400, JSON.stringify(step.data));
  }
  step = await api("GET", "/api/tours?rep=ana", "rep:ana");
  assert.equal(step.data.visits.find((visit) => visit.id === "v2").result, undefined);
  step = await api("PUT", "/api/tours/v2/result", "rep:ana", {
    outcome: "no_venta", objection: "dinero_cuota", recoverable: true,
    nextStep: { action: "segunda_visita", date: "2026-11-06", ownerId: "jorge" }, version: 0,
  });
  assert.equal(step.status, 200, JSON.stringify(step.data));

  // T04: abandono exige paso 1..11 (AC-06)
  for (const failStep of [0, 12, undefined]) {
    step = await api("PUT", "/api/tours/v5/result", "jefe:rosa", { outcome: "abandono", failStep, version: 0 });
    assert.equal(step.status, 400, JSON.stringify(step.data));
  }
  step = await api("PUT", "/api/tours/v5/result", "jefe:rosa", { outcome: "abandono", failStep: 1, version: 0 });
  assert.equal(step.status, 200, JSON.stringify(step.data));
  step = await api("PUT", "/api/tours/v5/result", "jefe:rosa", { outcome: "abandono", failStep: 11, version: 1 });
  assert.equal(step.status, 200, JSON.stringify(step.data));

  // T05: fuera de catálogo → 400; el catálogo se sirve (AC-07, REQ-006)
  step = await api("PUT", "/api/tours/v4/result", "jefe:jorge", { outcome: "seguimiento", version: 0 });
  assert.equal(step.status, 400);
  step = await api("PUT", "/api/tours/v4/result", "jefe:jorge", { outcome: "no_venta", objection: "precio_alto", recoverable: false, version: 0 });
  assert.equal(step.status, 400);
  step = await api("GET", "/api/catalog");
  assert.equal(step.status, 200, JSON.stringify(step.data));
  assert.ok(step.data.outcomes.some((item) => item.id === "abandono"));
  assert.ok(step.data.objections.some((item) => item.id === "ya_tiene_tc"));
  assert.ok(step.data.actions.some((item) => item.id === "segunda_visita"));
  assert.equal(step.data.failSteps.length, 11);

  // T06: matriz de permisos (AC-08, DS-03)
  step = await api("POST", "/api/reset", "admin", {});
  step = await api("PUT", "/api/tours/v1/result", "rep:ana", saleBody);
  assert.equal(step.status, 200);
  step = await api("PUT", "/api/tours/v4/result", "rep:ana", saleBody);
  assert.equal(step.status, 403);
  step = await api("PUT", "/api/tours/v1/result", "rep:luis", { ...saleBody, version: 1 });
  assert.equal(step.status, 403);
  step = await api("PUT", "/api/tours/v4/result", "jefe:jorge", { outcome: "no_venta", objection: "pareja_decision", recoverable: false, version: 0 });
  assert.equal(step.status, 200);
  step = await api("PUT", "/api/tours/v1/result", "jefe:rosa", { ...saleBody, version: 1 });
  assert.equal(step.status, 403);
  step = await api("PUT", "/api/tours/v5/result", "admin", { outcome: "abandono", failStep: 6, version: 0 });
  assert.equal(step.status, 200);
  step = await api("DELETE", "/api/tours/v1/result", "rep:ana");
  assert.equal(step.status, 403);
  step = await api("DELETE", "/api/tours/v1/result", "jefe:jorge");
  assert.equal(step.status, 200);
  step = await api("PUT", "/api/tours/v1/result", "", saleBody);
  assert.equal(step.status, 401);

  // T07: cancelado → 409; futuro → 400 (AC-09)
  step = await api("POST", "/api/tours", "jefe:jorge", {
    repId: "ana", date: "2026-11-06", start: "20:00", end: "21:00",
    lead: "Lead #4777", status: "cancelado", note: "",
  });
  assert.equal(step.status, 201, JSON.stringify(step.data));
  step = await api("PUT", `/api/tours/${step.data.visit.id}/result`, "jefe:jorge", saleBody);
  assert.equal(step.status, 409, JSON.stringify(step.data));
  const futureDay = new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10);
  step = await api("POST", "/api/tours", "jefe:jorge", {
    repId: "ana", date: futureDay, start: "10:00", end: "11:00",
    lead: "Lead #4777", status: "pendiente", note: "",
  });
  assert.equal(step.status, 201, JSON.stringify(step.data));
  step = await api("PUT", `/api/tours/${step.data.visit.id}/result`, "jefe:jorge", saleBody);
  assert.equal(step.status, 400, JSON.stringify(step.data));

  // T08: editar el tour conserva el resultado; cancelar exige quitarlo (AC-10)
  step = await api("POST", "/api/reset", "admin", {});
  step = await api("PUT", "/api/tours/v1/result", "jefe:jorge", saleBody);
  assert.equal(step.status, 200);
  const keptResult = step.data.visit.result;
  const v1Edit = {
    repId: "ana", date: "2026-11-06", start: "09:45", end: "10:45",
    lead: "Lead #4920", status: "confirmado", note: "Objeción de cuota",
  };
  step = await api("PATCH", "/api/tours/v1", "jefe:jorge", v1Edit);
  assert.equal(step.status, 200, JSON.stringify(step.data));
  assert.deepEqual(step.data.visit.result, keptResult);
  step = await api("PATCH", "/api/tours/v1", "jefe:jorge", { ...v1Edit, status: "cancelado" });
  assert.equal(step.status, 409, JSON.stringify(step.data));
  step = await api("DELETE", "/api/tours/v1/result", "jefe:jorge");
  assert.equal(step.status, 200);
  step = await api("PATCH", "/api/tours/v1", "jefe:jorge", { ...v1Edit, status: "cancelado" });
  assert.equal(step.status, 200, JSON.stringify(step.data));

  // T09 + T10: versión optimista e historial con valor anterior (AC-11, AC-12)
  step = await api("POST", "/api/reset", "admin", {});
  step = await api("PUT", "/api/tours/v1/result", "rep:ana", saleBody);
  assert.equal(step.status, 200);
  step = await api("PUT", "/api/tours/v1/result", "jefe:jorge", { outcome: "no_venta", objection: "dinero_cuota", recoverable: false, version: 0 });
  assert.equal(step.status, 409, JSON.stringify(step.data));
  step = await api("GET", "/api/tours?rep=ana", "jefe:jorge");
  let v1now = step.data.visits.find((visit) => visit.id === "v1");
  assert.equal(v1now.result.outcome, "venta");
  step = await api("PUT", "/api/tours/v1/result", "jefe:jorge", { outcome: "no_venta", objection: "dinero_cuota", recoverable: false, version: 1 });
  assert.equal(step.status, 200);
  assert.equal(step.data.visit.result.version, 2);
  step = await api("GET", "/api/tours?rep=ana", "jefe:jorge");
  v1now = step.data.visits.find((visit) => visit.id === "v1");
  assert.equal(v1now.resultHistory.length, 2);
  assert.equal(v1now.resultHistory[1].by, "jorge");
  assert.equal(v1now.resultHistory[1].previous.outcome, "venta");

  // T11: la nota rechaza correo, teléfono y más de 120 caracteres (AC-13, DS-02 filas 14-17)
  const noSale = { outcome: "no_venta", objection: "dinero_cuota", recoverable: false, version: 0 };
  for (const note of ["Llamar a ana@example.com", "Su número es 998 123 4567", "x".repeat(121)]) {
    step = await api("PUT", "/api/tours/v2/result", "rep:ana", { ...noSale, note });
    assert.equal(step.status, 400, JSON.stringify(step.data));
  }
  step = await api("PUT", "/api/tours/v2/result", "rep:ana", { ...noSale, note: "q".repeat(120) });
  assert.equal(step.status, 200, JSON.stringify(step.data));

  step = await api("POST", "/api/reset", "admin", {});
  assert.equal(step.status, 200);
  console.log("e2e-ops ok", base);
} finally {
  if (child) child.kill();
  rmSync(TMP, { recursive: true, force: true });
}
