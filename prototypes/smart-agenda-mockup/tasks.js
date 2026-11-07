// Tareas con evidencia (feature tareas-evidencia): lógica pura del detalle de tarea.
// «Marcar hecha» exige una foto, captura o audio; la ven solo el rep y su jefe y se borra a los 30 días.

export const EVIDENCE_LIMITS = {
  pickMB: 5,          // tamaño máximo del archivo que el rep elige
  maxSide: 1280,      // la foto se reduce a este lado mayor (JPEG)
  jpegQuality: 0.72,
  audioSec: 60,
  audioBps: 32000,    // 60 s ≈ 240 KB
  uploadBytes: 700000, // tope del servidor tras comprimir
  retentionDays: 30,
};

const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export function taskToPriority(task) {
  const [, m, d] = String(task.due || "").split("-").map(Number);
  return {
    id: task.id,
    title: task.title,
    when: task.when || (m && d ? `${d} ${MONTHS[m - 1]}` : ""),
    detail: task.detail || "",
    done: task.status === "hecha",
    origin: task.origin || "Agenda",
    server: true,
    evidence: task.evidence || null,
    due: task.due,
  };
}

export function canComplete({ evidence, consent, busy = false } = {}) {
  return Boolean(evidence && evidence.data && consent === true && !busy);
}

export function pickAudioMime(isTypeSupported) {
  for (const mime of ["audio/webm;codecs=opus", "audio/mp4", "audio/ogg;codecs=opus"]) {
    try { if (isTypeSupported(mime)) return mime; } catch { /* navegador sin soporte */ }
  }
  return "";
}

export function fitInside(w, h, max) {
  const scale = Math.min(1, max / Math.max(w, h));
  return { w: Math.round(w * scale), h: Math.round(h * scale) };
}
