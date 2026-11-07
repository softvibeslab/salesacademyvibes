# FTD: Tablero /ops/ con branding de Descubre y Material Design 3 responsivo

**Status:** done
**Lane:** FTD
**Author:** agente
**Date:** 2026-11-07
**Ticket:** N/A
**Historia (opcional):** N/A

## Claridad

- **Solicitud:** PO pidió mejorar al mil la interfaz del tablero con el branding de Sales Academy, hacerla responsiva en todos los dispositivos usando la paleta de `http://salesacademy.localhost:4188/descubre/`, y actualizar todos los componentes y controles a Material Design 3.
- **Entendimiento:** Solo visual y layout de `/ops/`. Misma paleta que Descubre (noche `#101110`, oro champagne `#d4b574`, papel `#f4f1e9`) aplicada sobre tokens y componentes Material Design 3 (`md-segmented`, `md-filter-chip`, `md-assist-chip`, `md-field`, `md-card`, `md-avatar`, `md-badge`, `md-btn-filled`, `md-btn-tonal`, `md-btn-outlined`, `md-btn-text`, `md-icon-btn`). Sin cambiar APIs ni el flujo de importar/confirmar.
- **Hecho cuando:** El tablero live muestra el encabezado SA, controles Material Design 3 con la paleta de Descubre y funciona de forma responsiva en teléfono (360px), tablet (768–1024px) y escritorio (1280px+).

| # | Pregunta | Respuesta | Estado |
|---|---|---|---|
| 1 | Ninguna: la solicitud es clara | Paleta tomada de `landing-v2.css` / `public-v2.css` con controles MD3 | Respondida |

## Intencion

El tablero debe sentirse parte de Sales Academy (noche + champagne + papel) usando controles Material Design 3 claros, táctiles y responsivos en cualquier pantalla.

## Alcance

- Incluye: `ops/index.html`, `ops/ops.css`, markup de `ops/ops.js`, `tests/ops-brand.mjs`.
- No incluye: cambios de API, app del rep, Copiloto, Descubre.
- Capa: frontend (`web-ui` /ops/)

## Escalamiento

- [x] Una sola capa.
- [x] Sin cambio de contrato.
- [x] Sin esquema ni migraciones.
- [x] Sin auth nueva.
- [x] Sin dependencias nuevas.
- [x] Sin ADR.
- [x] Menos de 2 dias.

## Checklist (tests primero)

- [x] T01-test: el CSS declara la paleta de Descubre y el layout móvil con scroll-snap — hecho cuando `node tests/ops-brand.mjs` FALLA.
- [x] T01-impl: tokens + markup de marca — hecho cuando el mismo comando PASA y `e2e-ops.mjs` sigue verde.
- [x] T02-test: exigir pestañas rápidas de reps en móvil (`data-jump`), breakpoint tablet (`1024px`) y componentes Material Design 3 (`--md-shape-full`, `--md-elevation-1`, `md-segmented`, `md-field`, `md-card`, `md-avatar`) en `tests/ops-brand.mjs` — hecho cuando FALLA.
- [x] T02-impl: implementar controles MD3 y layout responsivo multi-dispositivo en `ops/ops.css` y `ops/ops.js` — hecho cuando `node tests/ops-brand.mjs` y `node tests/e2e-ops.mjs` PASAN.

## Evidencia

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 | RED | `node tests/ops-brand.mjs` | `AssertionError: noche de Descubre` (tokens Material viejos) |
| T01 | GREEN | `node tests/ops-brand.mjs` | `ops-brand ok` |
| T02 | RED | `node tests/ops-brand.mjs` | `AssertionError [ERR_ASSERTION]: tokens de forma Material Design 3` |
| T02 | GREEN | `node tests/ops-brand.mjs` | `ops-brand ok` |
| regresión | GREEN | `node tests/e2e-ops.mjs` | `e2e-ops ok` |

Excepcion TDD: el resto es visual; se valida en navegador (360px, 768px y 1280px).

## TRUST 5 (alcance FTD)

- [x] Tested: `ops-brand.mjs` + `e2e-ops.mjs` + `test_import.py` en verde; validado live en 360px y 1280px
- [x] Readable
- [x] Unified: paleta de `landing-v2.css` / `public-v2.css` sobre sistema Material Design 3
- [x] Secured: sin API nueva ni datos reales
- [x] Trackable: este FTD

## Siguiente

Publicado en `https://salesacademy.softvibes.art/ops/` con caché `?v=20261107md3`.
