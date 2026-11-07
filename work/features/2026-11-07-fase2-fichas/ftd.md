# FTD: `fase2-fichas`

**Status:** done
**Lane:** FTD
**Author:** `RogerDevAndroid`
**Branch:** `release/demo-pruebas-20261107`
**Date:** `2026-11-07`
**Ticket:** `Fase 2 del plan aprobado por el PO (2026-11-07): «en recursos … ficha más completa … descripción … en qué casos se usa y cómo aporta valor»`

## Claridad

- **Solicitud:** cada recurso (habilidad, guion de la biblioteca, práctica) muestra una ficha completa: qué es, en qué casos se usa y cómo aporta valor.
- **Entendimiento:** catálogo `fichas.js` con 28 fichas (SK-01..SK-19, LIB-01..LIB-05 y las 4 prácticas), cada una con `que`, `cuando`, `valor` y `pasos` del roadmap de 11 pasos. La vista de detalle muestra la ficha arriba de la plantilla, con chips que llevan al paso del roadmap; la lista muestra el «qué es» en dos líneas. Contenido «Propuesto IA» a partir de la knowledge base y del roadmap; el PO lo revisa.
- **Hecho cuando:** `tests/fichas.mjs` en verde, ficha visible en claro y oscuro, chips navegan al paso, sin regresiones.

| # | Pregunta | Respuesta | Estado |
|---|---|---|---|
| 1 | ¿Quién redacta el contenido? | Plan aprobado: el agente propone, el PO revisa | Respondida |

## Alcance

- Incluye: `fichas.js` (nuevo), `resourceCard`/`fichaSection`/`templateScreen` en `agenda.js`, estilos `.res-que`/`.ficha*` en `styles.css`/`agenda.css`.
- No incluye: cambios al Copiloto ni al API.
- Capa: frontend.

## Escalamiento

- [x] Una capa · [x] Sin contrato · [x] Sin esquema · [x] Sin datos sensibles · [x] Sin dependencias · [x] Sin ADR · [x] < 2 días

## Checklist (tests primero)

- [x] T01-test `tests/fichas.mjs` - FALLÓ: `ERR_MODULE_NOT_FOUND`.
- [x] T01-impl `fichas.js` - `fichas ok`.
- [x] T02 ficha en lista y detalle, ambos temas (visual).

## Evidencia

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 | RED | `node tests/fichas.mjs` | `ERR_MODULE_NOT_FOUND: fichas.js` |
| T01 | GREEN | `node tests/fichas.mjs` | `fichas ok` (28 fichas, campos ≥ 25 caracteres, pasos 1–11, `fichaFor("SK-99") === null`) |
| T02 | GREEN | Playwright `fichas-visual.mjs` (claro y oscuro) | lista con «qué es» en 2 líneas; SK-11 con Qué es / Cuándo usarla / chips 7, 9, 10 / Cómo aporta valor; el chip abre «Recorrido»; sin errores de página. Regresión: app-fab, home-counters, ops-brand, theme, wa-share ok |

Excepcion TDD: estilos y marcado validados con capturas automatizadas; el catálogo tiene prueba.

## TRUST 5

- [x] Tested [x] Readable [x] Unified [x] Secured [x] Trackable

## Siguiente

Revisión del contenido por el PO (es «Propuesto IA»). Siguiente: botón «Instalar app» (PWA) y fase 3 (tareas con evidencia).
