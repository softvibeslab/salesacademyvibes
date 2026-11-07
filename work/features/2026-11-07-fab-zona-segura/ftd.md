# FTD: `fab-zona-segura`

**Status:** done
**Lane:** FTD
**Author:** `RogerDevAndroid`
**Branch:** `feat/sala-tours-sync`
**Date:** `2026-11-07`
**Ticket:** `Captura del PO: el FAB tapaba el botón Enviar del Copiloto embebido`

## Claridad

- **Solicitud:** que el botón flotante no se encime con el botón Enviar del chat.
- **Entendimiento:** `clampFab` acepta `bottomReserve`; la app reserva 150px en la pestaña Copiloto (compositor del agente) y 72px en el resto (dock). Aplica a posición guardada, arrastre y cambio de vista (se recoloca en cada render).
- **Hecho cuando:** la prueba de clamp con reserva pasa y en el sitio `overlap: false` entre FAB y Enviar.

| # | Pregunta | Respuesta | Estado |
|---|---|---|---|
| 1 | Ninguna: la solicitud es clara. | N/A | Respondida |

## Alcance

- Incluye: `bottomReserve` en `fab.js`, `fabReserve()` por vista en `agenda.js`, caché `20261107v`.
- No incluye: cambios de menú ni estilos.
- Capa: frontend de la app.

## Escalamiento

- [x] Una capa. [x] Sin contrato. [x] Sin esquema. [x] Sin datos sensibles. [x] Sin dependencias. [x] Sin ADR. [x] < 2 días.

## Checklist (tests primero)

- [x] T01-test: `clampFab(..., 150)` acota a `alto−56−8−150` - FALLÓ (`AssertionError`, la reserva se ignoraba).
- [x] T01-impl: `node tests/app-fab.mjs` PASA.

## Evidencia

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 | RED | `node tests/app-fab.mjs` | `AssertionError: Expected values to be strictly deep-equal` (y = 780 sin reserva) |
| T01 | GREEN | `node tests/app-fab.mjs` | `app-fab ok` + regresión completa. En vivo: `fabTop 630 = 844−56−8−150`, `overlap: false` con el botón Enviar, cero errores. |

Excepcion TDD: N/A.

## TRUST 5

- [x] Tested [x] Readable [x] Unified [x] Secured [x] Trackable

## Siguiente

Hecho: desplegado con el corte 20261107v.
