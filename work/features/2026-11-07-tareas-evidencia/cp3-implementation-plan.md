# Implementation Plan (CP3)

**Status:** approved
**Feature:** `tareas-evidencia`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`
**Spec:** `cp2-spec.md`

## 1. Tasks By Team

| Layer | Task | Owner | Depends On | Estimate |
|---|---|---|---|---|
| backend | `server/ops_tasks.py` (validación, firma, retención, siembra) + rutas en `ops_api.py` | agente | - | M |
| backend | Tareas en el contexto de Hermes | agente | tareas | XS |
| frontend | App: `tasks.js` + Home y detalle con foto comprimida / audio / consentimiento | agente | API | M |
| frontend | Tablero: tareas por rep, «Ver evidencia», asignar | agente | API | S |
| frontend | Copiloto: sugerencia «Tarea pendiente» | agente | contexto | XS |
| ops | Deploy copia `ops_tasks.py` | agente | - | XS |

## 1b. Test-First Pairs (TDD)

| ID | AC / REQ | Tarea | Hecha cuando |
|---|---|---|---|
| T01-test/impl | AC-003, AC-004, AC-006, NFR-002/003 | `tests/test_tasks.py` | RED `ModuleNotFoundError: ops_tasks` → GREEN 5 OK |
| T02-test/impl | AC-001, AC-002, AC-005, AC-007, NFR-001/004 | E0–E7 en `tests/e2e-ops.mjs` | RED 404 → GREEN `e2e-ops ok` |
| T03-test/impl | REQ-009 | contexto con tareas (`test_context.py`) y P7 (`proactive.test.mjs`) | RED → GREEN |
| T04-test/impl | REQ-007, AC-008 | `tests/tasks.mjs` | RED `ERR_MODULE_NOT_FOUND` → GREEN `tasks ok` |
| T05 | AC-001..008 | Playwright `phase3.mjs` + UAT en vivo | foto y audio reales; jefe ve evidencia |
