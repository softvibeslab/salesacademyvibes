# Implementation Plan (CP3)

**Status:** approved
**Feature:** `hermes-contexto`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`
**Spec:** `cp2-spec.md`

## 1. Tasks By Team

| Layer | Task | Owner | Depends On | Estimate |
|---|---|---|---|---|
| backend | `server/ops_context.py` + `GET /api/context` | agente | - | S |
| backend | Puente: contexto con la cookie, personalidad `soul/sales-academy.md`, `today`/`now` | agente | context | S |
| frontend | Copiloto: `proactive.js`, tarjetas «Hermes sugiere», resumen por franja, «Mi mes» real | agente | puente | M |
| frontend | App: `today` al Copiloto, `sa:go` | agente | - | XS |
| ops | Deploy copia `soul/` y `ops_context.py` | agente | - | XS |

## 1b. Test-First Pairs (TDD)

| ID | AC / REQ | Tarea | Hecha cuando |
|---|---|---|---|
| T01-test/impl | AC-001, AC-002, NFR-002, NFR-004 | `tests/test_context.py` | RED `ModuleNotFoundError: ops_context` → GREEN 6 OK |
| T02-test/impl | AC-002, AC-003 | C1–C4 en `tests/e2e-ops.mjs` | RED 404 «No existe.» → GREEN `e2e-ops ok` |
| T03-test/impl | AC-004, AC-005, REQ-003 | T06–T08 en `copiloto-rep/tests/hermes.test.mjs` | RED 4 fallas → GREEN 11 pass |
| T04-test/impl | AC-006, AC-007, NFR-003 | `copiloto-rep/tests/proactive.test.mjs` | RED `ERR_MODULE_NOT_FOUND` → GREEN 6 pass |
| T05 | AC-008 | UAT en vivo con el Hermes real | respuesta con las horas reales |
