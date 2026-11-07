# FTD: `scroll-home`

**Status:** done
**Lane:** FTD
**Author:** `RogerDevAndroid`
**Branch:** `release/demo-pruebas-20261107`
**Date:** `2026-11-07`
**Ticket:** `Bug reportado por el PO (2026-11-07): «en Home se refresca y el scroll se va para arriba … se sube a cada rato»`

## Claridad

- **Solicitud:** Home no debe regresar el scroll arriba sola.
- **Entendimiento:** cada 15 s Home pide los tours en silencio y `render()` reemplaza toda la pantalla, con lo que `.screen` vuelve a `scrollTop = 0`. Arreglo: (1) el refresco silencioso no redibuja si los tours no cambiaron; (2) si se redibuja la misma vista, se conserva el scroll; una vista nueva sí empieza arriba.
- **Hecho cuando:** con el scroll a 400 px y más de 15 s de espera, el scroll sigue en 400.

| # | Pregunta | Respuesta | Estado |
|---|---|---|---|
| — | Sin preguntas | — | — |

## Alcance

- Incluye: `refreshTours` y `render` en `agenda.js`.
- No incluye: el tablero (no tiene refresco automático).
- Capa: frontend.

## Escalamiento

- [x] Una capa · [x] Sin contrato · [x] Sin esquema · [x] Sin datos sensibles · [x] Sin dependencias · [x] Sin ADR · [x] < 2 días

## Checklist (tests primero)

- [x] T01-test reproducción en navegador real - FALLÓ: scroll 400 → 0.
- [x] T01-impl `refreshTours` + `render` - scroll 400 → 400.

## Evidencia

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 | RED | Playwright `scroll-home.mjs` (Ana, Home, scroll 400, espera 17 s) | `{"before":400,"after":0}` `SCROLL BUG: volvió a 0` |
| T01 | GREEN | Playwright `scroll-home.mjs` | `{"before":400,"after":400}` `scroll ok`; regresión de todas las suites ok |

## TRUST 5

- [x] Tested [x] Readable [x] Unified [x] Secured [x] Trackable

## Siguiente

Desplegado junto con `instalar-app`.
