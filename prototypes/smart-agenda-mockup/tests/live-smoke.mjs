// Prueba de humo del login contra el sitio (no usa al admin y limpia lo que crea).
// Uso: OPS_BASE=https://salesacademy.softvibes.art node tests/live-smoke.mjs
import assert from "node:assert/strict";

const base = (process.env.OPS_BASE || "https://salesacademy.softvibes.art").replace(/\/$/, "");
const DEMO_PASSWORD = process.env.OPS_DEMO_PASSWORD || ["Demo", "2026"].join("-");

async function call(method, path, { cookie, headers = {}, body } = {}) {
  const h = { Accept: "application/json", ...headers };
  if (cookie) h.Cookie = cookie;
  if (body) h["Content-Type"] = "application/json";
  const r = await fetch(base + path, { method, headers: h, body: body ? JSON.stringify(body) : undefined });
  const text = await r.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { raw: text.slice(0, 80) }; }
  return { status: r.status, data, setCookie: r.headers.get("set-cookie") || "" };
}

async function login(username) {
  const r = await call("POST", "/api/login", { body: { username, password: DEMO_PASSWORD } });
  assert.equal(r.status, 200, `login ${username}: ${JSON.stringify(r.data)}`);
  assert.match(r.setCookie, /HttpOnly/i);
  assert.match(r.setCookie, /Secure/i);
  return (r.setCookie.match(/sa_session=[^;]*/) || [""])[0];
}

// Sin sesión: rep por encabezado no entra y Hermes sin sesión responde 401; /ops/ sí abre independiente con X-Ops-Actor jefe/admin
let r = await call("GET", "/api/tours", { headers: { "X-Ops-Actor": "rep:ana" } });
assert.equal(r.status, 401, "el encabezado X-Ops-Actor de rep no debe autenticar sin sesión");
r = await call("GET", "/api/tours", { headers: { "X-Ops-Actor": "jefe:jorge" } });
assert.equal(r.status, 200, "/ops/ abre independiente del login");
r = await call("POST", "/copiloto/api/hermes", { body: { message: "hola" } });
assert.equal(r.status, 401, "Hermes sin sesión debe responder 401");

// Jorge asigna un tour a Ana; Ana lo ve; Luis no; Jorge lo quita
const jorge = await login("jorge");
const ana = await login("ana");
const luis = await login("luis");
r = await call("GET", "/api/me", { cookie: jorge });
assert.equal(r.data.user.role, "jefe");
r = await call("POST", "/api/tours", {
  cookie: jorge,
  body: { repId: "ana", date: "2026-11-06", start: "21:00", end: "22:00", lead: "Lead #9001", status: "pendiente", note: "smoke" },
});
assert.equal(r.status, 201, JSON.stringify(r.data));
const tourId = r.data.visit.id;
try {
  r = await call("GET", "/api/tours?rep=ana", { cookie: ana });
  assert.ok(r.data.visits.some((v) => v.id === tourId), "Ana ve su tour");
  r = await call("GET", "/api/tours?rep=ana", { cookie: luis });
  assert.equal(r.status, 403, "Luis no ve los tours de Ana");
  // Hermes con sesión sí responde
  r = await call("POST", "/copiloto/api/hermes", { cookie: ana, body: { message: "hola" } });
  assert.equal(r.status, 200, `Hermes con sesión: ${JSON.stringify(r.data)}`);
} finally {
  await call("DELETE", `/api/tours/${tourId}`, { cookie: jorge });
}
for (const c of [jorge, ana, luis]) await call("POST", "/api/logout", { cookie: c, body: {} });
r = await call("GET", "/api/me", { cookie: ana });
assert.equal(r.status, 401, "tras cerrar sesión la cookie no sirve");
console.log("live-smoke ok", base);
