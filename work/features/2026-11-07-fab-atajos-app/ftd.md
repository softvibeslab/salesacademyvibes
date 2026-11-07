# FTD: `fab-atajos-app`

**Status:** done
**Lane:** FTD
**Author:** `RogerDevAndroid`
**Branch:** `feat/sala-tours-sync`
**Date:** `2026-11-07`
**Ticket:** `Corrección del PO en Claude Code, 2026-11-07: «iba a ser en toda la app el botón flotante»`
**Historia (opcional):** N/A

## Claridad

- **Solicitud:** el botón flotante de atajos va en toda la app (salesacademy.softvibes.art), arrastrable y siempre visible.
- **Entendimiento:** FAB circular dorado en todas las vistas de la app (el dock se queda). Arrastrable con posición recordada (`sa.fab.pos`) y acotada a la pantalla. Un toque abre: Registrar resultado, Nueva nota, Cotizar membresía, Nuevo bloque y Tablero de sala. En la pestaña Copiloto se oculta porque el Copiloto embebido trae el suyo (con su navegación).
- **Hecho cuando:** `node tests/app-fab.mjs` pasa y en el sitio el FAB se arrastra, abre los atajos y se oculta en Copiloto.

| # | Pregunta | Respuesta | Estado |
|---|---|---|---|
| 1 | ¿Qué atajos? | Propuestos como críticos: resultado, nota, cotizar, bloque, tablero. Ajustables en `FAB_ACTIONS` de `fab.js`. | Respondida |

## Intencion

Las acciones de alta frecuencia a un toque desde cualquier vista de la app.

## Alcance

- Incluye: `fab.js` (nuevo), cableado y estilos en `agenda.js`/`styles.css`, prueba `tests/app-fab.mjs`, caché `20261107t`.
- No incluye: quitar el dock de la app (solo el Copiloto pierde su barra, en su propio FTD), persistir nada más que la posición del botón.
- Capa: frontend de la app.

## Escalamiento

- [x] Una sola capa. [x] Sin contrato. [x] Sin esquema. [x] Sin auth ni datos sensibles. [x] Sin dependencias. [x] Sin ADR. [x] < 2 días.

## Checklist (tests primero)

- [x] T01-test: geometría, tap vs drag y catálogo de atajos - FALLÓ con `ERR_MODULE_NOT_FOUND: .../fab.js`.
- [x] T01-impl: `fab.js` + cableado - `node tests/app-fab.mjs` PASA.

## Evidencia

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 | RED | `node tests/app-fab.mjs` | `ERR_MODULE_NOT_FOUND: .../fab.js` |
| T01 | GREEN | `node tests/app-fab.mjs` | `app-fab ok`; regresión `wa-share ok`, `home-counters ok`, `e2e-ops ok`. Visual: menú con 5 atajos sobre Home, drag 692px → 364px, FAB oculto en la pestaña Copiloto (`fabHiddenOnCoach: true`), sin errores de página. |

Excepcion TDD (solo si aplica): el drag y el menú son DOM; validados con recorrido visual. La geometría y el catálogo tienen prueba.

## TRUST 5 (alcance FTD)

- [x] Tested [x] Readable [x] Unified [x] Secured (solo guarda la posición del botón) [x] Trackable (commit citando este FTD)

## Siguiente

Hecho: desplegado con el corte 20261107t.
