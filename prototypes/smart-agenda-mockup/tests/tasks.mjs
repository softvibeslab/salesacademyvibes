// tareas-evidencia — lógica pura del detalle de tarea (REQ-007).
import assert from "node:assert/strict";
import { taskToPriority, canComplete, pickAudioMime, fitInside, EVIDENCE_LIMITS } from "../tasks.js";

const t = { id: "seed-ana-1", title: "Confirmar seguimiento", detail: "Lead #302", due: "2026-11-06", when: "10:45", origin: "Historial", status: "pendiente", evidence: null };
assert.deepEqual(taskToPriority(t), { id: "seed-ana-1", title: "Confirmar seguimiento", when: "10:45", detail: "Lead #302", done: false, origin: "Historial", server: true, evidence: null, due: "2026-11-06" });
assert.equal(taskToPriority({ ...t, status: "hecha", when: "" }).when, "6 nov");

// «Marcar hecha» solo con evidencia + consentimiento y sin envío en curso
assert.equal(canComplete({ evidence: null, consent: true }), false);
assert.equal(canComplete({ evidence: { data: "x" }, consent: false }), false);
assert.equal(canComplete({ evidence: { data: "x" }, consent: true, busy: true }), false);
assert.equal(canComplete({ evidence: { data: "x" }, consent: true }), true);

// Audio: el primer formato que soporte el navegador (Chrome webm, Safari mp4)
assert.equal(pickAudioMime((m) => m.startsWith("audio/webm")), "audio/webm;codecs=opus");
assert.equal(pickAudioMime((m) => m === "audio/mp4"), "audio/mp4");
assert.equal(pickAudioMime(() => false), "");

// Foto: se reduce a 1280 px por lado, sin agrandar
assert.deepEqual(fitInside(4032, 3024, 1280), { w: 1280, h: 960 });
assert.deepEqual(fitInside(1080, 2340, 1280), { w: 591, h: 1280 });
assert.deepEqual(fitInside(800, 600, 1280), { w: 800, h: 600 });
assert.equal(EVIDENCE_LIMITS.audioSec, 60);
assert.equal(EVIDENCE_LIMITS.pickMB, 5);
console.log("tasks ok");
