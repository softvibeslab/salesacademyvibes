# Implementation Plan (CP3)

**Status:** approved
**Feature:** `ops-import-preview`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`
**Spec:** `cp2-spec.md`

## 1. Tasks By Team

| Layer | Task | Owner | Depends On | Estimate |
|---|---|---|---|---|
| backend | Mapper stdlib CSV/JSON/texto + OCR opcional | agente | - | M |
| backend | `POST /api/imports/preview` sin save | agente | mapper | S |
| frontend | Dropzone, cámara, tabla de preview, confirmar | agente | contrato | M |
| docs | stack-y-api + guía tablero | agente | GREEN | S |

## 1b. Test-First Pairs (TDD)

| ID | AC / REQ | Tarea | Hecha cuando |
|---|---|---|---|
| T01-test/impl | AC-01, AC-02 / REQ-001 | CSV mapea Ana Lead #8801 | `preview_text` 1 fila selected |
| T02-test/impl | AC-03 / REQ-002 | Pedro y Juan Pérez → issues | selected false |
| T03-test/impl | REQ-003 | choque con v1 | clash true |
| T04-test/impl | AC-01 / REQ-001 | HTTP preview no cambia tours | GET count igual |
| T05-test/impl | AC-04 / REQ-004 | POST tours de la fila | 201 y GET del rep |
| T06-test/impl | AC-05 / REQ-005 | rep → 403 | status 403 |
| T07-test/impl | AC-06 / REQ-006 | cuerpo enorme → 413; imagen no se persiste | 413; ops.json sin base64 |

## 2. Contracts

| Contract | Producer | Consumer | Version | Status |
|---|---|---|---|---|
| `POST /api/imports/preview` | backend | `/ops/` | v1 | agreed (CP2) |
| `POST /api/tours` | backend | `/ops/` confirm | existente | unchanged |

## 3. Repo Paths

| Layer | Path |
|---|---|
| backend | `prototypes/smart-agenda-mockup/server/ops_import.py`, `ops_api.py` |
| frontend | `prototypes/smart-agenda-mockup/ops/ops.js`, `ops.css`, `index.html` |
| tests | `prototypes/smart-agenda-mockup/tests/test_import.py`, `tests/e2e-ops.mjs` |
