# SRS (CP1)

**Status:** approved
**Feature:** `resultado-del-tour`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`
**Intake:** `cp0-intake.md`

> Software Requirements Specification. Salida de CP1.

## 1. Problem

El tablero asigna tours y el rep los ve, pero nadie registra cómo terminó cada tour. Sin el resultado comercial (venta, no venta, abandono), la objeción real y el siguiente paso, no hay dato para coaching, recuperación de no-sales ni analítica; los indicadores del día son cifras inventadas.

## 2. Users And Needs

| User / Area | Need | Priority |
|---|---|---|
| Rep de sala | Cerrar cada tour suyo en menos de 30 s con el resultado real | must |
| Jefe de sala | Ver y corregir resultados de su sala; dar seguimiento a no-sales recuperables | must |
| Administrador | Lo mismo en todas las salas | must |
| PO / demo comercial | Mostrar el ciclo completo asignar → ejecutar → cerrar con datos sintéticos | must |

## 3. Vision

Cada tour del demo puede cerrarse con su resultado; el jefe lo ve en `/ops/`, el rep en su app, y la Home deja de mostrar cifras inventadas.

## 4. Needs (Functional)

- NEED-001: capturar el resultado comercial de un tour ya ocurrido (venta / no venta / abandono) con sus datos condicionales.
- NEED-002: respetar el alcance por rol y sala al leer y escribir resultados.
- NEED-003: no perder ediciones concurrentes ni perder el resultado al editar el tour.
- NEED-004: conservar el historial de cambios del resultado.
- NEED-005: mostrar el resultado en app y tablero, y calcular los indicadores del día desde los resultados.

## 5. Needs (Non-Functional)

| Type | Need | Target |
|---|---|---|
| Performance | Guardado del resultado | < 500 ms p95 con 200 tours (NFR-01 de la historia) |
| Usability | Captura rápida | ≤ 30 s venta o no venta simple (NFR-02) |
| Security | Privacidad de notas | Rechazar correo/teléfono; logs sin nota completa (NFR-05, BR-11) |
| Accessibility | Controles táctiles | ≥ 48×48 px; radiogroup etiquetado; errores con role="alert" (NFR-03) |

## 6. Risks

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| PATCH del tablero borra el resultado (clean_visit reconstruye) | high | high | BR-10 + prueba T08 antes del código |
| Identidad declarada permite escrituras de cualquiera | high | med | Solo datos sintéticos; auth es historia previa al piloto |
| Último guardado gana entre dos editores | med | med | Versión optimista + 409 (BR-08, T09) |

## 7. Traceability Matrix

| NEED | Source (CP0) | Future REQ (CP2) | Verification |
|---|---|---|---|
| NEED-001 | Historia §5, §8 | REQ-001, REQ-006 | T01-T05, T07, T11 |
| NEED-002 | Historia §6 | REQ-002 | T06 |
| NEED-003 | Historia BR-08, BR-10 | REQ-003, REQ-004 | T08, T09 |
| NEED-004 | Historia BR-09 | REQ-003, REQ-005 | T10 |
| NEED-005 | Historia BR-12, §9 | REQ-007 a REQ-010 | T12, T13, UAT |

## 8. Human Approval

- [x] Problema y necesidades validados con accountable.
- Approved by: Roger, PO — Date: 2026-11-07 (aprobación del paquete v2 de la historia: "Apruebo la historia resultado-del-tour v2 con sus 16 AC, 17 escenarios, 5 sets de datos y el diseño de Stitch")

## Gate CP1 -> CP2

- [x] Problema escrito sin solucion.
- [x] Necesidades funcionales y no funcionales listadas.
- [x] Riesgos visibles.
- [x] Matriz de trazabilidad iniciada.
- [x] Aprobacion humana registrada.
