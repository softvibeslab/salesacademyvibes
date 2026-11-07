# FTD: `fase1-temas`

**Status:** done
**Lane:** FTD
**Author:** `RogerDevAndroid`
**Branch:** `release/demo-pruebas-20261107`
**Date:** `2026-11-07`
**Ticket:** `Fase 1 del plan aprobado por el PO (2026-11-07) + pedido explícito: login como la pantalla de Stitch ac86e4659fc942b0900cbb2c7ad98a9c`

## Claridad

- **Solicitud:** dos temas (claro «Smart Notebook» y oscuro «High-Performance Vault») con switch, por defecto el del sistema; login rediseñado como la pantalla de Stitch «Iniciar sesión · Riviera Maya»; chat con mejor combinación de colores.
- **Entendimiento:** tokens CSS únicos con `[data-theme="dark"]`; preferencia en `localStorage` `sa.theme` (sistema/claro/oscuro) compartida por app, tablero y Copiloto; script temprano para evitar parpadeo; switch en el login, Perfil y tablero. El login sigue el diseño de Stitch con tres desvíos honestos: sin botón de biometría (no existe), sin «encriptado en reposo» (no es cierto hoy; se reemplaza por aviso «Datos de ejemplo»), «¿Olvidaste tu contraseña?» explica que se pide al jefe. La foto del diseño estaba rota en Stitch (URL privada); se usa la escena propia `consultation.webp` del proyecto, alojada en `assets/login-hero.jpg`.
- **Hecho cuando:** prueba `theme.mjs` en verde, login igual al diseño en claro y oscuro, app sin colores fijos que rompan el oscuro, y tablero + Copiloto con los mismos temas.

| # | Pregunta | Respuesta | Estado |
|---|---|---|---|
| 1 | Tema por defecto | PO 2026-11-07: el del sistema | Respondida |
| 2 | Diseño del login | PO 2026-11-07: la pantalla de Stitch indicada | Respondida |

## Alcance

- Incluye: `theme.js` (nuevo), tokens claros/oscuros y componentes de Acceso en `styles.css`/`agenda.css`, vista Acceso y switch en `agenda.js`, script temprano en `index.html`, `assets/login-hero.jpg`; después: `ops/ops.css`+`ops.js` y Copiloto.
- No incluye: cambios de lógica de negocio.
- Capa: frontend.

## Escalamiento

- [x] Una capa · [x] Sin contrato · [x] Sin esquema · [x] Sin datos sensibles · [x] Sin dependencias · [x] Sin ADR · [ ] < 2 días (fase de ~2 días; se mantiene FTD por ser solo frontend, aprobado en el plan)

## Checklist (tests primero)

- [x] T01-test `tests/theme.mjs` - FALLÓ: `ERR_MODULE_NOT_FOUND`.
- [x] T01-impl `theme.js` - `theme ok`.
- [x] T02 login + app en ambos temas (visual).
- [x] T03 tablero en ambos temas.
- [x] T04 Copiloto en ambos temas (chat rediseñado).

## Evidencia

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 | RED | `node tests/theme.mjs` | `ERR_MODULE_NOT_FOUND: theme.js` |
| T01 | GREEN | `node tests/theme.mjs` | `theme ok` |
| T02 | GREEN | Playwright `theme-visual.mjs`/`theme2.mjs` | `data-theme` sigue a `prefers-color-scheme` (light/dark); login igual al diseño en ambos; Home/Recursos/Perfil en oscuro legibles; switch guarda `light`; cero errores. 48 colores fijos → variables. Regresión: app-fab, wa-share, home-counters, e2e-ops, ops-brand ok; live-smoke ok tras deploy |

| T03 | GREEN | Playwright `ops-theme.mjs` | tablero de Rosa en oscuro y claro, switch en el encabezado, marca legible (encabezado fijo oscuro), `ops-brand ok`, cero errores |
| T04 | GREEN | copiloto `npm test` + `e2e.mjs` + Playwright `chat-theme.mjs` | 74 pass, 17/17; chat sin degradado lavanda, burbuja propia dorada con borde, sello «Hermes · experto» legible; tema se propaga app→iframe (`light`); se corrigió de raíz `[hidden]` vs `display:grid` (barra vacía sobre las sugerencias) |

Excepcion TDD: estilos (CSS) validados con capturas automatizadas; la lógica de tema tiene prueba.

## TRUST 5

- [x] Tested [x] Readable [x] Unified [x] Secured [x] Trackable

## Siguiente

Hecho: fase 1 desplegada (app `20261107z3`, tablero `20261107md6`, Copiloto `20261107o/s`). Siguiente: fase 2 (fichas de Recursos).
