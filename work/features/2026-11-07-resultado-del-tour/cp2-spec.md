# Spec (CP2)

**Status:** approved
**Feature:** `resultado-del-tour`
**Product:** `Sales Academy`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`

## 1. Problem

Ver `cp1-srs.md` §1. El resultado comercial del tour no existe como dato.

## 2. Users And Areas

| User / Area | Need |
|---|---|
| Rep | Registrar el resultado de sus tours ya ocurridos |
| Jefe de sala | Registrar, corregir y quitar resultados de su sala; ver historial |
| Administrador | Lo mismo en todas las salas |

## 3. Goal

Con datos sintéticos (DS-01 de la historia), el 100 % de los tours del día con hora de fin pasada pueden cerrarse con resultado desde la app o `/ops/`, y la otra superficie lo muestra tras actualizar. Home calcula presentaciones, cierres y volumen desde los resultados.

## 4. Scope

Included: lo de la historia §5 (resultado + campos condicionales, captura rep/jefe/admin, etiquetas en app y tablero, historial y versión, indicadores de Home, pruebas e2e, documentación).

Excluded: lo de cp0 §5 (No-Goals).

## 5. Requirements (Functional)

Catálogos (servidos por REQ-006): `outcome` ∈ {venta, no_venta, abandono}; `objection` ∈ {confianza, dinero_cuota, pareja_decision, uso_tiempo, valor_producto, ya_tiene_tc, otra}; `action` ∈ {llamada, segunda_visita, enviar_propuesta, otra}; `failStep` ∈ 1..11; `currency` ∈ {USD, MXN}.

- REQ-001: Cuando un actor autorizado hace `PUT /api/tours/:id/result` con un cuerpo válido, el sistema guarda el resultado del tour (crea o reemplaza), incrementa `result.version`, registra autor y fecha, agrega la entrada al historial (máx. 20) y responde 200 con el tour. Validación por outcome: venta exige `currency` y `amount` (0 < amount ≤ 1,000,000); no_venta exige `objection` (+`objectionOther` ≤ 60 si es `otra`) y `recoverable`; si `recoverable` es true exige `nextStep` {action, date ≥ fecha del tour, ownerId = rep del tour o jefe de su sala}; abandono exige `failStep` 1..11. `note` opcional ≤ 120 y sin correo ni teléfono (≥ 7 dígitos seguidos o separados por espacio/guión). Cuerpo inválido → 400 sin persistencia parcial (AC-01, AC-04 a AC-07, AC-13).
- REQ-002: El alcance por actor se aplica en servidor: rep solo sus tours; jefe solo su sala; admin todo; solo jefe/admin ejecutan `DELETE .../result`; sin encabezado → 401; fuera de alcance → 403 sin cambios (AC-08).
- REQ-003: Toda escritura del resultado lleva `version` (0 al crear); si no coincide con la guardada → 409 "Alguien más actualizó este resultado…" sin sobrescribir (AC-11, AC-12).
- REQ-004: `PATCH /api/tours/:id` conserva `result` y `resultHistory`; cambiar `status` a `cancelado` con resultado presente → 409; registrar resultado en tour cancelado → 409; en tour con fecha futura al día del servidor → 400 (AC-09, AC-10).
- REQ-005: `DELETE /api/tours/:id/result` (jefe/admin) quita el resultado y deja la entrada en el historial; responde 200 (AC-08, flujo FA-06).
- REQ-006: `GET /api/catalog` devuelve los catálogos anteriores con sus etiquetas en español; app y tablero los consumen en lugar de duplicarlos.
- REQ-007: `GET /api/tours` incluye `result` dentro del alcance del actor; `resultHistory` solo para jefe/admin; un tour sin `result` no trae el campo (AC-03).
- REQ-008: En la app, "Registrar presentación" se liga a un tour del rep (selector: tours de hoy, no cancelados, ya ocurridos), aplica el formulario aprobado en Stitch (móvil `562a8402…`) y maneja los estados guardando / error con formulario intacto / conflicto con botón Actualizar (AC-01, AC-15).
- REQ-009: Tours de hoy, Calendario y las tarjetas de `/ops/` muestran la etiqueta del resultado ("Venta · USD 8,000", "No venta · recuperable" + siguiente paso, "Abandono · paso N", "Sin resultado" solo si la hora de fin pasó); `/ops/` agrega formulario arriba (diseño `f12a7617…`), acciones Resultado / Quitar resultado (dos toques) e historial desplegable (AC-02, AC-03, AC-12). Los textos "Sincronización instantánea" e "Historial verificado" del mockup NO se implementan.
- REQ-010: Home calcula presentaciones = tours del día con resultado, cierres = ventas, volumen = suma USD de ventas; metas fijas de ejemplo (4, 2, 12,000); sin resultados muestra 0 (AC-14, BR-12).

## 6. Requirements (Non-Functional)

| Type | Requirement | Target | Verified In |
|---|---|---|---|
| Performance | NFR-001: PUT result | < 500 ms p95, 20 llamadas, 200 tours | CP4 (medición local) |
| Security | NFR-002: nota sin datos personales; logs sin nota completa; permisos en servidor | BR-11 y REQ-002 | T06, T11 + revisión |
| Availability | NFR-003: escritura atómica se mantiene | lock + os.replace existentes | revisión de código |
| Accessibility | NFR-004: táctil ≥ 48 px, radiogroup, role="alert" | pantallas nuevas | CP4 manual |

## 7. Security Considerations

- [x] Datos sensibles: volumen de venta (comercial, sintético); nota libre filtrada (BR-11). Sin comisión.
- [x] Autorizacion por endpoint: matriz REQ-002 / DS-03 de la historia.
- [x] Threat model: no se requiere formal; el riesgo dominante (identidad declarada) está aceptado para demo sintético y registrado en risk-register (RSK-002). Auth es historia previa a datos reales.
- [x] Sin secretos ni datos reales en esta spec.

## 8. RACI

- Accountable: Roger (PO)
- Responsible: agente de desarrollo (full-stack con harness)
- Consulted: QA (escenarios de la historia), Security (RSK-002)
- Informed: equipo Softvibes

## 9. Layer Profile

- backend (Python stdlib, `server/ops_api.py`)
- frontend (JS sin bundler: `agenda.js`, `ops-api.js`, `ops-store.js`, `ops/ops.js`)

## 10. Risks

Ver `risk-register.md` (RSK-001 a RSK-004).

## 11. Test Plan (initial)

| REQ / NFR | How to verify | Type |
|---|---|---|
| REQ-001 | T01-T05, T07, T11 en `tests/e2e-ops.mjs` | integration |
| REQ-002 | T06 (matriz DS-03) | integration |
| REQ-003 | T09, T10 | integration |
| REQ-004 | T07, T08 | integration |
| REQ-005 | T06 (filas 7-8) | integration |
| REQ-006 | T05 (catálogo servido) | integration |
| REQ-007 | T13 | integration |
| REQ-008/009 | UAT ESC-02, ESC-03, ESC-16 de la historia | manual |
| REQ-010 | T12 en `tests/home-counters.mjs` | unit |
| NFR-002 | T11 + revisión de logs | security review |

## 12. Acceptance Criteria

Los 16 AC aceptados viven en la historia §11 (v2, aprobada). Mapa AC → prueba en `cp3-implementation-plan.md` §1b; cobertura completa en historia §14.

## Gate CP2 -> CP3

- [x] Requisitos funcionales y no funcionales con identificador (REQ-/NFR-).
- [x] Seccion de seguridad completada.
- [x] Criterios de aceptacion testeables, cada uno con su prueba nombrada (plan §1b).
- [x] Plan de pruebas inicial enlazado a requisitos.
- [x] Aprobacion humana del accountable (paquete v2 de la historia, 2026-11-07).
