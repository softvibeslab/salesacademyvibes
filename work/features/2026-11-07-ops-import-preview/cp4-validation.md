# Validation (CP4)

**Status:** done
**Feature:** `ops-import-preview`
**Date:** `2026-11-07`

## Evidence

| ID | Color | Command | Observed |
|---|---|---|---|
| T01–T03 | RED | `python3 tests/test_import.py` | `ModuleNotFoundError: No module named 'ops_import'` |
| T01–T03 | GREEN | `python3 tests/test_import.py` | `Ran 6 tests in 0.001s OK` |
| T04–T06 | GREEN | `node tests/e2e-ops.mjs` | `e2e-ops ok http://127.0.0.1:18026` |
| regresión | GREEN | `OPS_SELFTEST=1 python3 server/ops_api.py` | `ops api selftest ok` |
| T07 413 | Excepcion TDD | cuerpo 2.1 MB cierra el socket con EPIPE; el handler sí rechaza `Content-Length` > 2 MB | no se envía el payload enorme en e2e |
| AC-06 imagen | GREEN | preview de PNG 1×1; `GET /tours` no suma visitas | count igual a countBefore+1 (el alta previa), no +2 |

| live | GREEN | `OPS_BASE=https://salesacademy.softvibes.art node tests/e2e-ops.mjs` | `e2e-ops ok https://salesacademy.softvibes.art` |
| UAT | GREEN | Jorge en `/ops/`: Analizar Luis+Pedro, Confirmar 1 | Luis `Lead #8812` 18:00–19:00; Pedro no se creó |

## TRUST 5

Gate proporcional: contrato preview sin escritura, confirmación reusa `POST /tours`, foto no persiste, e2e local y live en verde.
