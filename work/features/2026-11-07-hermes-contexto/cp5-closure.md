# Closure (CP5)

**Status:** approved
**Feature:** `hermes-contexto`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`
**Validation:** `cp4-validation.md`

## 1. Summary

Hermes (Copiloto) ya trabaja con los datos reales del usuario con sesión —agenda del día, resultados, ventas, objeciones, seguimientos y mes— y el chat propone qué hacer según la hora: registrar, preparar, dar seguimiento, practicar, planear o cerrar el día. Un resumen de Hermes aparece al abrir el chat (máx. 3 al día).

## 2. Shared Memory

- Archivos: `server/ops_context.py`, `server/ops_api.py` (`/api/context`), `tests/test_context.py`, `tests/e2e-ops.mjs`, `agenda.js` (`today`, `sa:go`); copiloto `server.mjs`, `soul/sales-academy.md`, `src/skills/proactive.js`, `src/app.js`, `src/launch.js`, `index.html`, `styles.css`, `tests/hermes.test.mjs`, `tests/proactive.test.mjs`, `tests/e2e.mjs`.
- Decisiones: `decision-log.md`. Evidencia: `cp4-validation.md`.

## 3. Decisions Recorded

| Decision | Type | Link |
|---|---|---|
| Personalidad propia como prompt versionado (SOUL global intacto) | decision-log | `decision-log.md` |
| Reglas sin costo + resumen de Hermes por franja | decision-log | `decision-log.md` |

## 4. Learnings

| What worked | What to improve | Action |
|---|---|---|
| Hermes simulado que «hace eco» del prompt probó la cadena completa sin gastar modelo | El deploy lista archivos a mano (segunda vez que casi falta uno) | Copiar `server/*.py` y el Copiloto completo en el próximo ajuste del script |

## 5. Backlog

- Perfil `sales-academy` dentro de Hermes en el VPS (runbook del operador), si se quiere memoria propia del canal.
- Tarjetas estructuradas en las respuestas (video, tour + herramientas, tarea, recurso) — siguiente corte de la fase 4.
- Tareas con evidencia (fase 3) alimentarán `followUps`/pendientes del contexto.
