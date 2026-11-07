# Implementation Plan (CP3)

**Status:** approved
**Feature:** `resultado-del-tour`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`
**Spec:** `cp2-spec.md`

## 1. Tasks By Team

| Layer | Task | Owner | Depends On | Estimate |
|---|---|---|---|---|
| backend | Catálogos + validación del resultado + PUT/DELETE result + GET catalog + versión/historial + preservar result en PATCH | agente | - | M |
| backend | Filtrado de result/resultHistory por actor en GET /tours | agente | anterior | S |
| frontend | App: registrar ligado al tour, etiquetas, estados error/conflicto, Home desde resultados | agente | contrato | M |
| frontend | Tablero: etiqueta, formulario arriba, quitar resultado, historial | agente | contrato | M |
| docs | stack-y-api, guía app, guía tablero, cambios, status, inicio rápido (+ copias wiki) | agente | GREEN | S |

## 1b. Test-First Pairs (TDD)

Comando backend/e2e: `node tests/e2e-ops.mjs` (arranca el API local). Comando unit: `node tests/home-counters.mjs`. Cada par: primero la prueba (FALLA por la razón esperada), luego la implementación (PASA sin romper la suite).

| ID | AC / REQ | Tarea | Hecha cuando |
|---|---|---|---|
| T01-test/impl | AC-01 / REQ-001 | rep registra venta en su tour y el jefe la lee (ESC-01) | PUT 200, version 1; GET de Jorge trae outcome venta |
| T02-test/impl | AC-04 / REQ-001 | validación de venta: monto y divisa (ESC-05, DS-02 filas 1-6) | filas 1-5 → 400; fila 6 (1,000,000) → 200 |
| T03-test/impl | AC-05 / REQ-001 | no venta: objeción, recuperable y siguiente paso (ESC-06, DS-02 filas 7-13) | filas 7-12 → 400 sin persistencia parcial; fila 13 → 200 |
| T04-test/impl | AC-06 / REQ-001 | abandono: failStep 1..11 (ESC-07) | 0, 12, ausente → 400; 1 y 11 → 200 |
| T05-test/impl | AC-07 / REQ-001,006 | fuera de catálogo → 400; GET /catalog sirve los catálogos (ESC-08) | outcome/objeción inválidos → 400; catalog 200 con listas |
| T06-test/impl | AC-08 / REQ-002,005 | matriz de permisos DS-03 (ESC-09) | códigos exactos 200/401/403 de las 9 filas |
| T07-test/impl | AC-09 / REQ-004 | cancelado → 409; futuro → 400 (ESC-10) | ambos códigos y tour sin cambio |
| T08-test/impl | AC-10 / REQ-004 | PATCH conserva result; cancelar con resultado → 409 (ESC-11) | result idéntico tras editar hora; 409 al cancelar; tras DELETE, cancela |
| T09-test/impl | AC-11 / REQ-003 | versión vieja → 409 sin sobrescribir (ESC-12) | 1.º PUT 200 v2; 2.º con v1 → 409; queda el 1.º |
| T10-test/impl | AC-12 / REQ-003 | corrección agrega historial con valor anterior (ESC-13) | historial 2 entradas, valor anterior venta |
| T11-test/impl | AC-13 / REQ-001 | nota: correo, teléfono, >120 → 400; 120 limpios → 200 (ESC-14) | DS-02 filas 14-17 |
| T12-test/impl | AC-14 / REQ-010 | contadores de Home desde resultados (ESC-15, DS-05) | `home-counters.mjs` FALLA (módulo no existe) → PASA con los 4 reps exactos |
| T13-test/impl | AC-03 / REQ-007 | tour sin resultado no trae el campo; rep no ve resultHistory (ESC-04) | GET v3 sin `result`; GET de Ana sin `resultHistory` |
| T14 (regresión) | AC-16 | suite completa actual sigue en verde (ESC-17) | `node tests/e2e-ops.mjs` local y contra el sitio |

UAT manual (PO): ESC-02, ESC-03, ESC-16 de la historia, con capturas en CP4.

## 2. Contracts

| Contract | Producer | Consumer | Version | Status |
|---|---|---|---|---|
| `PUT/DELETE /api/tours/:id/result`, `GET /api/catalog`, objeto `result{outcome,amount,currency,objection,objectionOther,recoverable,nextStep{action,date,ownerId},failStep,note,version,by,at}` + `resultHistory[]` | backend | app y tablero | v1 | agreed (historia §10, PO 2026-11-07) |

## 3. Repo Paths (spec <-> codigo)

| Layer | Repo | Path(s) | Runtime |
|---|---|---|---|
| backend | salesacademyvibes | `prototypes/smart-agenda-mockup/server/ops_api.py` | Python 3 stdlib, servicio `salesacademy-ops` |
| frontend-app | salesacademyvibes | `prototypes/smart-agenda-mockup/{agenda.js,ops-api.js,ops-store.js,styles.css,index.html}` | navegador, sin bundler |
| frontend-ops | salesacademyvibes | `prototypes/smart-agenda-mockup/ops/{ops.js,ops.css,index.html}` | navegador |
| tests | salesacademyvibes | `prototypes/smart-agenda-mockup/tests/{e2e-ops.mjs,home-counters.mjs}` | node |

## 4. Branch Strategy

- Base branch: `feat/sala-tours-sync`
- Feature branch: la misma (repo de demo, un desarrollador); merge ff a `main` al cerrar CP4
- Merge policy: fast-forward
- Release target: corte `20261107r` del sitio

## 5. Expected Evidence

| Gate | Evidence | Where |
|---|---|---|
| TDD | tabla RED → GREEN por par | `cp4-validation.md` §1 |
| e2e live | salida de `OPS_BASE=https://salesacademy.softvibes.art node tests/e2e-ops.mjs` | `cp4-validation.md` |
| UAT | capturas ESC-02/03/16 | `cp4-validation.md` |
| trust5 | checklist con evidencia | `cp4-validation.md` §4 |

## 6. Gates (from LAYER_PROFILE)

- [ ] `node --check` de todos los JS y `python3 -m py_compile server/ops_api.py`
- [ ] suite e2e local y contra el sitio en verde
- [ ] trust5

## 7. Observability

- Logs: el API no loguea notas ni cuerpos; solo método/ruta/código (comportamiento actual, se conserva).
- Metrics: no aplica en demo.
- Alerts: no aplica en demo.

## 8. Rollback Plan

El despliegue es `rsync` de archivos estáticos + reemplazo de `ops_api.py` y `systemctl restart salesacademy-ops`. Rollback: volver al commit anterior (`21b4bd1`), re-sincronizar y reiniciar; los datos nuevos (`result` en `ops.json`) son aditivos y el código anterior los ignora, o `POST /reset` como admin restaura la semilla.

## Gate CP3 -> CP4

- [x] Tareas por capa con owner y dependencias.
- [x] Cada criterio de aceptacion tiene su par test -> implementacion.
- [x] Contratos acordados y versionados.
- [x] Branch y release target definidos.
- [x] Evidencia esperada declarada por gate.
- [x] Rollback descrito.
