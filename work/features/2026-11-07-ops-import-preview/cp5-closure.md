# Closure (CP5)

**Status:** done
**Feature:** `ops-import-preview`
**Date:** `2026-11-07`

## Entrega

- Tablero live: https://salesacademy.softvibes.art/ops/ botón **Importar** (caché `20261107w`).
- API: `POST /api/imports/preview` en `ops_api.py` + `ops_import.py`. Confirmar con `POST /api/tours`.
- OCR local: Tesseract `eng` + `spa` en el VPS. Sin vendedor.

## Archivos

`server/ops_import.py`, `server/ops_api.py`, `ops/ops.js`, `ops/ops.css`, `ops/index.html`, `tests/test_import.py`, `tests/e2e-ops.mjs`, docs del tablero y stack.

## Evidencia

- RED: `ModuleNotFoundError: No module named 'ops_import'`
- GREEN local: `python3 tests/test_import.py` OK; `node tests/e2e-ops.mjs` OK
- GREEN live: `OPS_BASE=https://salesacademy.softvibes.art node tests/e2e-ops.mjs` OK
- UAT: Jorge pegó Luis + Pedro; preview marcó a Pedro; confirmar creó `Lead #8812` 18:00–19:00 en Luis; Pedro no se guardó.
