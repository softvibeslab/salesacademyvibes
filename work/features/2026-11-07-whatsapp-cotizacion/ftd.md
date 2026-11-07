# FTD: `whatsapp-cotizacion`

**Status:** done
**Lane:** FTD
**Author:** `RogerDevAndroid`
**Branch:** `feat/sala-tours-sync`
**Date:** `2026-11-07`
**Ticket:** `Petición del PO en Claude Code, 2026-11-07`
**Historia (opcional):** N/A

## Claridad

- **Solicitud:** al cotizar para un cliente (fichas de Recursos de la app), poder enviar la propuesta por WhatsApp: con contacto directo al chat, sin contacto pidiéndolo o dejando elegir el chat en WhatsApp, y registrando una tarea interna.
- **Entendimiento:** en las fichas de la categoría Cotizar (SK-01 a SK-06, SK-11, SK-12) se agrega un bloque «Enviar por WhatsApp» con WhatsApp y Lead # opcionales. Con número abre `wa.me/<digitos>?text=…`; sin número, `wa.me/?text=…`. El texto es la vista previa de la plantilla (hero, filas, nota), nunca datos internos. Al enviar se agrega una prioridad «Seguimiento WhatsApp · Lead #NNN» a Tus prioridades (en memoria, como las demás del demo). **El teléfono no se guarda ni aparece en la tarea.**
- **Hecho cuando:** `node tests/wa-share.mjs` pasa (link con/sin número, inválido rechazado, mensaje sin teléfono) y en el sitio publicado el botón abre WhatsApp y la tarea aparece en Home.

| # | Pregunta | Respuesta | Estado |
|---|---|---|---|
| 1 | ¿Dónde? | PO 2026-11-07: Copiloto y app (este FTD cubre la app; el Copiloto tiene el suyo en su repo) | Respondida |
| 2 | ¿Se guarda el teléfono? | PO 2026-11-07: nunca | Respondida |
| 3 | ¿La tarea? | PO 2026-11-07: local del demo (Tus prioridades) | Respondida |

## Intencion

Cerrar el caso de uso «cotizo y se lo mando al cliente» sin salir del flujo, con seguimiento registrado y sin persistir datos personales.

## Alcance

- Incluye: `wa-share.js` (nuevo, lógica pura), bloque en `viewFicha`/`templateScreen` y handler en `agenda.js`, prueba `tests/wa-share.mjs`, nota en `docs/guia-app.md` y `docs/cambios.md` (+ copias wiki), caché `20261107s`.
- No incluye: persistir contactos o tareas en el servidor, WhatsApp Business API, compartir desde el resultado del tour (otra historia si se pide), el Copiloto (FTD propio).
- Capa: frontend de la app.

## Escalamiento

- [x] Una sola capa.
- [x] Sin cambio de contrato.
- [x] Sin cambio de esquema ni migraciones.
- [x] Sin auth ni datos sensibles persistidos (teléfono solo en la URL del momento; decisión del PO).
- [x] Sin dependencias nuevas.
- [x] Sin decision que amerite ADR.
- [x] Menos de 2 dias.

## Checklist (tests primero)

- [x] T01-test: `waLink` (número normalizado / selector sin número / inválido) y `previewMessage` (título, hero, filas, sin teléfono) - hecho cuando `node tests/wa-share.mjs` FALLA con `ERR_MODULE_NOT_FOUND`.
- [x] T01-impl: `wa-share.js` - hecho cuando `node tests/wa-share.mjs` PASA y `node tests/e2e-ops.mjs` sigue en verde.

## Evidencia

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 | RED | `node tests/wa-share.mjs` | `ERR_MODULE_NOT_FOUND: .../wa-share.js` |
| T01 | GREEN | `node tests/wa-share.mjs` | `wa-share ok`; regresión `home-counters ok` y `e2e-ops ok` local. Visual: bloque en la ficha SK-01, popup `wa.me` correcto con Lead #4920, tarea «Seguimiento WhatsApp · Lead #4920» en Tus prioridades y toast. |

Excepcion TDD (solo si aplica): el cableado DOM se valida con recorrido visual; la lógica está en `wa-share.js` con prueba.

## TRUST 5 (alcance FTD)

- [x] Tested
- [x] Readable
- [x] Unified
- [x] Secured (el teléfono no se persiste ni aparece en la tarea)
- [x] Trackable (commit citando este FTD)

## Siguiente

Hecho: desplegado con el corte 20261107s.
