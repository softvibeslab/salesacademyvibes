# FTD: `fase0-fab-recursos`

**Status:** done
**Lane:** FTD
**Author:** `RogerDevAndroid`
**Branch:** `release/demo-pruebas-20261107`
**Date:** `2026-11-07`
**Ticket:** `Captura del PO: el botón flotante tapa las tarjetas en Recursos`

## Claridad

- **Solicitud:** que el FAB no tape las tarjetas de Recursos (fase 0 del plan aprobado).
- **Entendimiento:** el FAB flota sobre el contenido (patrón Material); se agrega margen inferior de 104 px a todas las pantallas para que el final de cualquier lista se pueda despejar del botón.
- **Hecho cuando:** con la lista al fondo, la última tarjeta queda por encima del FAB.

| # | Pregunta | Respuesta | Estado |
|---|---|---|---|
| 1 | Ninguna: la solicitud es clara. | N/A | Respondida |

## Alcance

- Incluye: `.screen` padding-bottom en `styles.css`/`agenda.css`, caché `20261107y`. Capa: frontend.

## Escalamiento

- [x] Una capa · [x] Sin contrato · [x] Sin esquema · [x] Sin datos sensibles · [x] Sin dependencias · [x] Sin ADR · [x] < 2 días

## Checklist

- [x] Ajuste de CSS.

## Evidencia

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 | RED | Playwright (antes) | captura del PO: el FAB cubre la tarjeta «Cotizar upgrade» y el final de la lista |
| T01 | GREEN | Playwright `fase0.mjs` | `lastBottom 668 < fabTop 692`, `overlapLast: false`, sin errores |

Excepcion TDD: ajuste puramente visual (CSS); validado con medición automatizada en navegador.

## TRUST 5

- [x] Tested [x] Readable [x] Unified [x] Secured [x] Trackable

## Siguiente

Hecho.
