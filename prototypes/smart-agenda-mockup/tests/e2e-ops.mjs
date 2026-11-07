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
// Login (historia login-demo): la suite se autentica con sesión real, no con encabezado.
const DEMO_PASSWORD = "Demo-2026";
const ADMIN_PASSWORD = process.env.OPS_ADMIN_PASSWORD || (LIVE ? "" : "test-admin-pass");

if (LIVE && !ADMIN_PASSWORD) {
  console.log("e2e-ops: contra el sitio necesita OPS_ADMIN_PASSWORD (la suite restaura el ejemplo). Usa tests/live-smoke.mjs para la prueba sin admin.");
  process.exit(0);
}

let child = null;
const base = LIVE.replace(/\/$/, "") || `http://127.0.0.1:${PORT}`;
const cookies = new Map();

function userOf(actor) {
  if (actor === "admin") return "admin";
  return actor.split(":")[1];
}

async function login(username, password) {
  const response = await fetch(`${base}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { ok: false, raw: text.slice(0, 120) }; }
  const raw = response.headers.get("set-cookie") || "";
  const cookie = (raw.match(/sa_session=[^;]*/) || [""])[0];
  return { status: response.status, data, cookie, raw };
}

async function cookieFor(actor) {
  if (!cookies.has(actor)) {
    const user = userOf(actor);
    const step = await login(user, user === "admin" ? ADMIN_PASSWORD : DEMO_PASSWORD);
    assert.equal(step.status, 200, `login de ${user}: ${JSON.stringify(step.data)}`);
    cookies.set(actor, step.cookie);
  }
  return cookies.get(actor);
}

async function raw(method, url, { cookie, headers = {}, body } = {}) {
  const h = { Accept: "application/json", ...headers };
  if (cookie) h.Cookie = cookie;
  if (body) h["Content-Type"] = "application/json";
  const response = await fetch(base + url, { method, headers: h, body: body ? JSON.stringify(body) : undefined });
  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { ok: false, raw: text.slice(0, 120) }; }
  return { status: response.status, data };
}

async function api(method, url, actor, body) {
  const cookie = actor ? await cookieFor(actor) : undefined;
  return raw(method, url, { cookie, body });
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
    env: { ...process.env, OPS_DATA: path.join(TMP, "ops.json"), OPS_PORT: String(PORT), OPS_ADMIN_PASSWORD: ADMIN_PASSWORD, OPS_COOKIE_SECURE: "0" },
    stdio: ["ignore", "ignore", "inherit"],
  });
}

try {
  await waitHealth();
  let step;

  // ---- Login (historia login-demo) ----
  // A1: login correcto entrega cookie de sesión HttpOnly
  step = await login("ana", DEMO_PASSWORD);
  assert.equal(step.status, 200, JSON.stringify(step.data));
  assert.equal(step.data.user.id, "ana");
  assert.equal(step.data.user.role, "rep");
  assert.match(step.raw, /sa_session=/);
  assert.match(step.raw, /HttpOnly/i);
  assert.match(step.raw, /SameSite=Lax/i);
  const anaCookie = step.cookie;
  // A2: contraseña incorrecta o usuario inexistente → 401 con el mismo mensaje, sin cookie
  step = await login("ana", "otra-cosa");
  assert.equal(step.status, 401);
  assert.equal(step.cookie, "");
  const wrongMsg = step.data.error;
  step = await login("nadie", DEMO_PASSWORD);
  assert.equal(step.status, 401);
  assert.equal(step.data.error, wrongMsg, "no revela si el usuario existe");
  // A3: /api/me con y sin sesión
  step = await raw("GET", "/api/me", { cookie: anaCookie });
  assert.equal(step.status, 200);
  assert.equal(step.data.user.id, "ana");
  step = await raw("GET", "/api/me");
  assert.equal(step.status, 401);
  // A4: el encabezado X-Ops-Actor ya no autentica
  step = await raw("GET", "/api/tours", { headers: { "X-Ops-Actor": "admin" } });
  assert.equal(step.status, 401, "el encabezado de rol no debe dar acceso");
  // A5: cookie inventada → 401
  step = await raw("GET", "/api/me", { cookie: "sa_session=inventada123" });
  assert.equal(step.status, 401);
  // A6: admin solo con su contraseña privada
  step = await login("admin", DEMO_PASSWORD);
  assert.equal(step.status, 401, "el admin no usa la contraseña demo");
  step = await login("admin", ADMIN_PASSWORD);
  assert.equal(step.status, 200);
  assert.equal(step.data.user.role, "admin");
  // A7: cerrar sesión invalida la cookie
  step = await raw("POST", "/api/logout", { cookie: anaCookie, body: {} });
  assert.equal(step.status, 200);
  step = await raw("GET", "/api/me", { cookie: anaCookie });
  assert.equal(step.status, 401);
  // A8: 5 intentos fallidos bloquean al usuario (429), aun con la contraseña correcta
  for (let i = 0; i < 5; i += 1) await login("mira", "mala");
  step = await login("mira", DEMO_PASSWORD);
  assert.equal(step.status, 429);

  step = await api("POST", "/api/reset", "admin", {});
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
  step = await raw("PUT", "/api/tours/v1/result", { body: saleBody });
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

  // ---- Import preview (2026-11-07) ----
  const listed = await api("GET", "/api/tours?date=2026-11-06", "admin");
  const countBefore = listed.data.visits.length;
  const csv = "rep,fecha,inicio,fin,lead,estado,nota\nAna,2026-11-06,17:00,18:00,Lead #8801,pendiente,Import e2e\n";
  step = await api("POST", "/api/imports/preview", "jefe:jorge", {
    text: csv, filename: "tours.csv", defaultDate: "2026-11-06",
  });
  assert.equal(step.status, 200, JSON.stringify(step.data));
  assert.equal(step.data.rows.length, 1);
  assert.equal(step.data.rows[0].visit.repId, "ana");
  assert.equal(step.data.rows[0].visit.lead, "Lead #8801");
  assert.equal(step.data.rows[0].selected, true);
  const mappedVisit = step.data.rows[0].visit;
  const afterPreview = await api("GET", "/api/tours?date=2026-11-06", "admin");
  assert.equal(afterPreview.data.visits.length, countBefore);

  step = await api("POST", "/api/tours", "jefe:jorge", mappedVisit);
  assert.equal(step.status, 201, step.data);
  const importedId = step.data.visit.id;
  step = await api("GET", "/api/tours?rep=ana", "rep:ana");
  assert.ok(step.data.visits.some((visit) => visit.id === importedId && visit.lead === "Lead #8801"));

  step = await api("POST", "/api/imports/preview", "rep:ana", { text: csv, defaultDate: "2026-11-06" });
  assert.equal(step.status, 403);

  step = await api("POST", "/api/imports/preview", "jefe:rosa", {
    text: "Ana 17:00-18:00 Lead #8809", defaultDate: "2026-11-06",
  });
  assert.equal(step.status, 200, JSON.stringify(step.data));
  assert.ok(step.data.rows[0].issues.join(" ").includes("sala"));

  step = await api("POST", "/api/imports/preview", "jefe:jorge", { text: "", defaultDate: "2026-11-06" });
  assert.equal(step.status, 400);

  const tinyPng = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
  step = await api("POST", "/api/imports/preview", "jefe:jorge", {
    image: tinyPng, mime: "image/png", defaultDate: "2026-11-06",
  });
  assert.equal(step.status, 200, JSON.stringify(step.data));
  const afterImage = await api("GET", "/api/tours?date=2026-11-06", "admin");
  assert.equal(afterImage.data.visits.length, countBefore + 1);

  // C1–C4: contexto para Hermes (feature hermes-contexto)
  step = await raw("GET", "/api/context?today=2026-11-06");
  assert.equal(step.status, 401, "C1 sin sesión");
  step = await api("GET", "/api/context?today=2026-11-06", "rep:ana");
  assert.equal(step.status, 200, JSON.stringify(step.data));
  assert.equal(step.data.context.user.name, "Ana");
  assert.ok(step.data.context.agenda.length >= 1, "C2 agenda de Ana");
  assert.ok(step.data.context.agenda.every((a) => !a.rep), "C2 rep sin columna de otros reps");
  assert.ok(!JSON.stringify(step.data).includes("Lead #210"), "C2 Ana no ve el tour de Luis");
  assert.ok(step.data.text.includes("Agenda de hoy"), "C2 texto para el prompt");
  step = await api("GET", "/api/context?today=06-11-2026", "rep:ana");
  assert.equal(step.status, 400, "C3 fecha inválida");
  step = await api("GET", "/api/context?today=2026-13-45", "rep:ana");
  assert.equal(step.status, 400, "C3 fecha imposible");
  step = await api("GET", "/api/context?today=2026-11-06", "jefe:jorge");
  assert.equal(step.status, 200);
  assert.ok(JSON.stringify(step.data).includes("Lead #210"), "C4 el jefe ve su sala");
  assert.ok(!JSON.stringify(step.data).includes("Lead #077"), "C4 el jefe no ve otra sala");

  // E1–E6: tareas con evidencia (feature tareas-evidencia)
  step = await api("GET", "/api/tasks?rep=ana", "rep:ana");
  assert.equal(step.status, 200, JSON.stringify(step.data));
  assert.ok(step.data.tasks.length >= 3, "E0 tareas sembradas de Ana");
  step = await api("GET", "/api/tasks?rep=mira", "rep:ana");
  assert.equal(step.status, 403, "E0 Ana no ve tareas de Mira");
  step = await api("POST", "/api/tasks", "jefe:jorge", { repId: "mira", title: "Otra sala", due: "2026-11-06" });
  assert.equal(step.status, 403, "E1 jefe no asigna fuera de su sala");
  step = await api("POST", "/api/tasks", "jefe:jorge", { repId: "ana", title: "Enviar resumen de mesa", detail: "Sala Norte", due: "2026-11-06", when: "16:10" });
  assert.equal(step.status, 201, JSON.stringify(step.data));
  const taskId = step.data.task.id;
  step = await api("POST", `/api/tasks/${taskId}/complete`, "rep:ana", {});
  assert.equal(step.status, 400, "E2 sin evidencia no se marca");
  step = await api("GET", "/api/tasks?rep=ana", "rep:ana");
  assert.equal(step.data.tasks.find((t) => t.id === taskId).status, "pendiente", "E2 sigue pendiente");
  step = await api("POST", `/api/tasks/${taskId}/complete`, "rep:ana", { kind: "imagen", mime: "image/png", data: Buffer.from("<svg onload=alert(1)>").toString("base64"), consent: true });
  assert.equal(step.status, 400, "E4 firma que no coincide");
  step = await api("POST", `/api/tasks/${taskId}/complete`, "rep:luis", { kind: "imagen", mime: "image/png", data: tinyPng, consent: true });
  assert.equal(step.status, 403, "E3 solo el dueño marca");
  step = await api("POST", `/api/tasks/${taskId}/complete`, "rep:ana", { kind: "imagen", mime: "image/png", data: tinyPng, consent: true });
  assert.equal(step.status, 200, JSON.stringify(step.data));
  assert.equal(step.data.task.status, "hecha", "E3 hecha con evidencia");
  assert.equal(step.data.task.evidence.kind, "imagen");
  for (const [actor, expected] of [["rep:ana", 200], ["jefe:jorge", 200], ["rep:luis", 403], ["jefe:rosa", 403]]) {
    const cookie = await cookieFor(actor);
    const r = await fetch(`${base}/api/tasks/${taskId}/evidence`, { headers: { Cookie: cookie } });
    assert.equal(r.status, expected, `E5 evidencia para ${actor}`);
    if (expected === 200) {
      assert.equal(r.headers.get("content-type"), "image/png");
      assert.equal(r.headers.get("cache-control"), "no-store");
      assert.equal(r.headers.get("x-content-type-options"), "nosniff");
      assert.equal(Buffer.from(await r.arrayBuffer()).toString("base64"), tinyPng);
    } else await r.arrayBuffer();
  }
  const anon = await fetch(`${base}/api/tasks/${taskId}/evidence`);
  assert.equal(anon.status, 401, "E5 sin sesión");
  await anon.arrayBuffer();
  const big = await fetch(`${base}/api/tasks/${taskId}/complete`, { method: "POST", headers: { Cookie: await cookieFor("rep:ana"), "Content-Type": "application/json" }, body: JSON.stringify({ data: "A".repeat(1_100_000) }) });
  assert.equal(big.status, 413, "E6 cuerpo mayor a 1 MB");
  await big.arrayBuffer();
  step = await api("POST", `/api/tasks/${taskId}/reopen`, "jefe:jorge", {});
  assert.equal(step.status, 200);
  assert.equal(step.data.task.status, "pendiente");
  const gone = await fetch(`${base}/api/tasks/${taskId}/evidence`, { headers: { Cookie: await cookieFor("jefe:jorge") } });
  assert.equal(gone.status, 404, "E5 reabrir borra la evidencia");
  await gone.arrayBuffer();
  step = await api("GET", "/api/context?today=2026-11-06", "rep:ana");
  assert.ok(step.data.text.includes("Tareas pendientes"), "E7 Hermes ve las tareas pendientes");

  step = await api("POST", "/api/reset", "admin", {});
  assert.equal(step.status, 200);
  console.log("e2e-ops ok", base);
} finally {
  if (child) child.kill();
  rmSync(TMP, { recursive: true, force: true });
}
