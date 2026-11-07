# FTD: `salesacademymaster`

**Status:** done
**Lane:** FTD
**Author:** `RogerDevAndroid`
**Branch:** `release/completo-20261107`
**Date:** `2026-11-07`
**Ticket:** `Pedido del PO (2026-11-07): «sube toda la base de conocimiento al VPS de salesacademy … y crea el perfil de salesacademymaster que sea experto en toda la base de conocimiento y los grafos»`

## Claridad

- **Solicitud:** subir la base de conocimiento al VPS y crear un perfil de Hermes experto en ella y en los grafos.
- **Entendimiento:** alcance elegido por el PO: brain-hub (corpus, research, grafo), graphify-out de SalesAcademyVibes (grafo, reporte, wiki, capítulos) y `docs/`; sin `meetings/` ni `input/` crudos (sus nodos se filtran de los grafos). El perfil sigue la convención del VPS: conocimiento en `/root/src/salesacademymaster/knowledge/` y `terminal.cwd` apuntando ahí.
- **Hecho cuando:** el perfil responde citando archivos de `knowledge/` y resuelve una pregunta de relaciones sobre el grafo.

| # | Pregunta | Respuesta | Estado |
|---|---|---|---|
| 1 | Alcance de la base | PO: brain-hub + grafos + wiki, sin meetings/input | Respondida |

## Alcance

- Incluye: `scripts/kb/build-kb-bundle.py` (arma el paquete y filtra los grafos), `scripts/kb/salesacademymaster-SOUL.md`, `INDEX.md` generado; en el VPS: carpeta de conocimiento, perfil clonado de `sales-academy` (modelo `gpt-6-astra`, igual que el perfil principal), SOUL propio y `cwd`.
- No incluye: instalar graphify en el VPS (bloqueado por política de código externo; el perfil consulta `graph.json` con Python), gateway propio del perfil.
- Capa: ops / conocimiento.

## Escalamiento

- [x] Una capa · [x] Sin contrato · [x] Sin esquema · [x] Sin datos sensibles (crudos excluidos, escaneo de secretos) · [x] Sin dependencias nuevas · [x] Sin ADR · [x] < 2 días

## Evidencia

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 | GREEN | `python3 scripts/kb/build-kb-bundle.py` | grafo Sales Academy 6,671 nodos / 14,051 enlaces (126 nodos privados filtrados); brain-hub 1,314 / 3,409 (13 filtrados); 393 archivos, 26 MB; escaneo de secretos: solo un JWT de ejemplo truncado en documentación |
| T02 | RED | `hermes -p salesacademymaster -z …` | `HTTP 400: The 'gpt-5.5' model is not supported when using Codex with a ChatGPT account.` (modelo heredado del clon) |
| T02 | GREEN | `hermes -p salesacademymaster -z "¿Cuáles son los 11 pasos…?"` | lista los 11 pasos; «Fuente: knowledge/wiki/guia-app.md, sección Roadmap» |
| T03 | GREEN | `hermes -p salesacademymaster -z "Usando el grafo …"` | ranking de proyectos por nodos y nodo `openTour()` (14 vecinos) con aristas y archivos citados; consulta hecha con Python sobre `graph.json` |

Excepcion TDD: configuración y carga de conocimiento; validado con consultas reales al perfil.

## TRUST 5

- [x] Tested [x] Readable [x] Unified [x] Secured (sin crudos privados, sin secretos, carpeta 700 root) [x] Trackable

## Siguiente

Actualizar la base: correr el script y `rsync` a `/root/src/salesacademymaster/knowledge/`. Pendiente del PO: el perfil `sales-academy` usa `gpt-5.5`, que el proveedor ya no acepta.
