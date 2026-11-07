# Validation Report (CP4)

**Status:** approved
**Feature:** `resultado-del-tour`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`
**Plan:** `cp3-implementation-plan.md`

## 1. Test Results

| Suite | Type | Result | Coverage / Notes |
|---|---|---|---|
| `python3 -m py_compile server/ops_api.py` | build | pass | sin errores |
| `OPS_SELFTEST=1 python3 server/ops_api.py` | integration | pass | `ops api selftest ok` (regresión del API previo) |
| `node tests/e2e-ops.mjs` (local) | integration/e2e | pass | `e2e-ops ok http://127.0.0.1:18540` — suite previa + T01-T11, T13 |
| `node tests/home-counters.mjs` | unit | pass | `home-counters ok` — DS-05 exacto, corrección ESC-13 incluida |
| `node --check` agenda.js, ops/ops.js, tests | build | pass | sin errores de sintaxis |
| Visual local (Playwright + Chrome) | manual asistida | pass | Capturas en `/tmp/sav-shots2/`: Home con contadores vivos (2/4 → 3/4 al guardar), formulario no venta con chips y siguiente paso, vista previa, toast «Resultado guardado», tablero con etiquetas, historial «antes: …» y formulario de resultado. Único error de consola: 404 del iframe `/copiloto/` (no existe en local). |
| `OPS_BASE=https://salesacademy.softvibes.art node tests/e2e-ops.mjs` | e2e live | pass | `e2e-ops ok https://salesacademy.softvibes.art` tras el deploy (`.claude/deploy-demo.sh`: rsync + ops_api.py + restart; servicio `active`, `/health` ok, caché `20261107r` servida, `/api/catalog` live) |
| UAT ESC-02, ESC-03 | UAT asistida en vivo | pass | Capturas en `/tmp/sav-uat/`: Ana registra venta en la app (Home 1/4, 1/2, $8,000, toast «Resultado guardado»); Jorge ve «Venta · USD 8,000» + «Cambios (1)» en `/ops/` desde otro navegador; Rosa registra «Abandono · paso 6» de Mira en el tablero y la app de Mira lo muestra. Sin errores de página. ESC-16 (falla de red) quedó cubierta en el recorrido local con el API detenido. |

### Evidencia TDD (RED -> GREEN)

Las pruebas de T01 a T13 se escribieron ANTES de la implementación en un solo corte de suite
(`tests/e2e-ops.mjs` y `tests/home-counters.mjs`). El RED es de la suite: falló en la primera
llamada nueva por la razón esperada (el endpoint no existía). El GREEN es por suite completa.

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01-T11, T13 | RED | `node tests/e2e-ops.mjs` | exit con `AssertionError: 501 !== 200` en `PUT /api/tours/v1/result` (el servidor no tenía `do_PUT`; `BaseHTTPRequestHandler` responde 501) |
| T12 | RED | `node tests/home-counters.mjs` | `ERR_MODULE_NOT_FOUND: .../home-counters.js` (el módulo no existía) |
| T01-T11, T13, T14 | GREEN | `node tests/e2e-ops.mjs` | `e2e-ops ok http://127.0.0.1:18540` — todas las aserciones nuevas y la regresión previa en verde |
| T12 | GREEN | `node tests/home-counters.mjs` | `home-counters ok` |
| regresión API | GREEN | `OPS_SELFTEST=1 python3 server/ops_api.py` | `ops api selftest ok` |

Excepcion TDD: el cableado visual de `agenda.js` y `ops/ops.js` (DOM) no tiene prueba
automatizada; su lógica calculable se extrajo a `home-counters.js` (T12) y el resto se valida
con el recorrido visual local y la UAT ESC-02/03/16, como declara la historia.

## 2. Findings

| ID | Severity | Description | Status |
|---|---|---|---|
| FND-001 | low | En el formulario móvil, los campos Fecha/Responsable quedan parcialmente bajo el pie fijo en la captura de página completa; con scroll real no estorba (patrón previo del prototipo) | accepted |
| FND-002 | low | `GET /api/catalog` desde el tablero envía actor aunque no hace falta | accepted |

## 3. Security Review

- [x] Sin secretos hardcoded (revisión del diff).
- [x] Inputs validados en servidor: catálogos cerrados, montos acotados, fechas y responsables verificados, nota con filtro de correo/teléfono (BR-11), sin persistencia parcial.
- [x] Logs sin datos privados: el API mantiene `log_message` vacío.
- [x] Threat model: no aplica formal; RSK-002 (identidad declarada) aceptado con waiver para demo sintético (risk-register).

## 4. TRUST 5

- [x] Tested: tabla RED → GREEN arriba; suites en verde.
- [x] Readable: catálogos y validación en funciones dedicadas (`clean_result`, `append_result_history`, `homeCounters`); nombres en inglés.
- [x] Unified: mismos patrones del prototipo (paneles, chips, `data-*`, `opsRequest`, lock + escritura atómica).
- [x] Secured: sección 3.
- [x] Trackable: commits `ba9b0d9` (feature) y cierre de CP4/CP5 citan esta carpeta; desplegado al sitio con el corte `20261107r`.

## 5. Waivers

| Gate / Finding | Reason | Approved By | Expires |
|---|---|---|---|
| RSK-002 (identidad declarada) | Demo 100 % sintético; auth es historia previa a datos reales | Roger, PO (2026-11-07) | antes del primer dato real |

## 6. Advance Decision

- Decision: advance
- Decided by: Roger (PO), instrucción textual «hazlo tu ya quiero» en la sesión de Claude Code — Date: 2026-11-07
