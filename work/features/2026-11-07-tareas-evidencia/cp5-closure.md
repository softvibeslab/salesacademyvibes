# Closure (CP5)

**Status:** approved
**Feature:** `tareas-evidencia`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`
**Validation:** `cp4-validation.md`

## 1. Summary

Las tareas del rep viven en el servidor. «Marcar hecha» pide una foto, captura o audio (≤ 60 s) con aviso de privacidad y consentimiento; la evidencia la ven el rep, su jefe y admin y se borra a los 30 días. El jefe ve el cumplimiento por rep y asigna tareas; Hermes conoce las pendientes y las sugiere.

## 2. Shared Memory

- Archivos: `server/ops_tasks.py`, `server/ops_api.py`, `server/ops_context.py`, `tasks.js`, `agenda.js`, `styles.css`, `ops/ops.js`, `ops/ops.css`, pruebas `test_tasks.py`, `tasks.mjs`, `e2e-ops.mjs`, `test_context.py`; copiloto `src/skills/proactive.js` + P7.
- Evidencias en producción: `/var/lib/salesacademy-ops/evidence/` (www-data, 700).

## 3. Decisions Recorded

| Decision | Type | Link |
|---|---|---|
| Valores de retención, audio y tamaño; compresión en el cliente | decision-log | `decision-log.md` |

## 4. Learnings

| What worked | What to improve | Action |
|---|---|---|
| Micrófono simulado de Chrome permitió probar la grabación real | El tablero aún no previsualiza la evidencia dentro de la tarjeta | Vista previa en línea en un siguiente ajuste |
