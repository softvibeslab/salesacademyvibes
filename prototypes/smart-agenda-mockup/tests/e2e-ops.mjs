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
  const data = await response.json();
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

  step = await api("POST", "/api/reset", "admin", {});
  assert.equal(step.status, 200);
  console.log("e2e-ops ok", base);
} finally {
  if (child) child.kill();
  rmSync(TMP, { recursive: true, force: true });
}
