# FTD: `instalar-app`

**Status:** done
**Lane:** FTD
**Author:** `RogerDevAndroid`
**Branch:** `release/demo-pruebas-20261107`
**Date:** `2026-11-07`
**Ticket:** `Pedido del PO (2026-11-07): «Agrega un botón de instalar app si se detecta que no está instalada en cualquier dispositivo»`

## Claridad

- **Solicitud:** botón «Instalar app» visible solo cuando la app no está instalada, en cualquier dispositivo.
- **Entendimiento:** la app se vuelve PWA instalable (`manifest.json`, íconos, `sw.js` mínimo). Detección de «ya instalada» con `display-mode: standalone` o `navigator.standalone` (iOS); tras instalar (`appinstalled`) el botón se oculta. Tres modos: Android/escritorio Chrome/Edge abren el diálogo nativo (`beforeinstallprompt`); iOS muestra «Compartir → Agregar a pantalla de inicio»; los demás navegadores muestran cómo hacerlo desde el menú. Ubicación: login, aviso en Hoy (se puede ocultar) y Perfil; en el tablero, en el encabezado. El service worker no cachea código (cada deploy se ve al instante); solo da una página «Sin conexión» a las navegaciones sin red.
- **Hecho cuando:** `tests/install.mjs` en verde; Chrome reconoce manifest y SW; botón visible en los tres modos y oculto si ya está instalada; sin regresiones.

| # | Pregunta | Respuesta | Estado |
|---|---|---|---|
| 1 | ¿Dónde va el botón? | Supuesto del agente (pedido «en cualquier dispositivo»): login, Hoy (ocultable), Perfil y tablero | Respondida |

## Alcance

- Incluye: `install.js`, `manifest.json`, `sw.js`, `offline.html`, `icons/` (marca SA dorada), metas en `index.html` y `ops/index.html`, bloque en `agenda.js` y botón en `ops/ops.js`, estilos.
- No incluye: modo offline de datos ni notificaciones push.
- Capa: frontend.

## Escalamiento

- [x] Una capa · [x] Sin contrato · [x] Sin esquema · [x] Sin datos sensibles · [x] Sin dependencias · [x] Sin ADR · [x] < 2 días

## Checklist (tests primero)

- [x] T01-test `tests/install.mjs` - FALLÓ: `ERR_MODULE_NOT_FOUND`.
- [x] T01-impl `install.js` - `install ok`.
- [x] T02 app: manifest, SW, botón en login/Hoy/Perfil, ayuda iOS y manual (visual).
- [x] T03 oculto si ya está instalada.
- [x] T04 tablero `/ops/`.

## Evidencia

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 | RED | `node tests/install.mjs` | `ERR_MODULE_NOT_FOUND: install.js` |
| T01 | GREEN | `node tests/install.mjs` | `install ok` (standalone, iOS/iPadOS, modos hidden/prompt/ios/manual, textos) |
| T02 | GREEN | Playwright `install-visual.mjs` | `Page.getAppManifest` sin errores; `getInstallabilityErrors` solo `in-incognito` (propio del navegador de prueba); SW activo `/sw.js`; botón en login, Hoy y Perfil; la ayuda no borra el usuario escrito; «×» oculta el aviso de Hoy; iPhone oscuro muestra «Compartir… Agregar a pantalla de inicio»; sin errores |
| T03 | GREEN | Playwright `install-standalone.mjs` | con `navigator.standalone = true`: 0 tarjetas en login y Hoy |
| T04 | GREEN | Playwright `install-ops.mjs` | Rosa en `/ops/`: manifest enlazado, botón en el encabezado, ayuda como globo sin mover el layout |
| REG | GREEN | todas las suites | app-fab, e2e-ops, fichas, home-counters, ops-brand, theme, wa-share, test_import ok |

Excepcion TDD: estilos, metas y SW validados con navegador real; la lógica de detección tiene prueba.

## TRUST 5

- [x] Tested [x] Readable [x] Unified [x] Secured (el SW no cachea API ni datos) [x] Trackable

## Siguiente

Probar en un teléfono real (Android: diálogo nativo; iPhone: instrucciones). Siguiente: fase 3.
