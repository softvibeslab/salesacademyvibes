# CP3 · Plan por capas

## Repo Paths

| Capa | Archivos | Responsable |
|---|---|---|
| Análisis y medios | analysis-videos.md, evidence/media, video-catalog.json, site/assets/films | media |
| Backend/editor | server/videos.py,content.py,app.py; openapi.json; CMS y player/macros/hub | contract |
| Presentación | templates/landing.html, assets/cinematic.css | reference |
| Integración | seed.json, journey*.mjs, tests/E2E, docs, paquete | root |

## Tareas

| Par | Test primero (RED) | Implementación (GREEN) |
|---|---|---|
| T01 | Recurso videoId conocido rechazado por validador actual; inputs negativos | Validación compatible, catálogo de rutas seguras |
| T02 | Player inexistente / documento sin clip | Contexto, render, CMS, persistencia y publicación con permisos existentes |
| T03 | Progreso de capítulos no disponible: scaffold válido devuelve estado fijo y falla límites/avance | Progreso determinista sin NaN, transformaciones acotadas y marcha atrás |
| T04 | Navegador: selector/player/escena ausentes en baseline | Select/save/preview/publish, reproducir/pausar/captions, sin descarga inicial, reducedmotion/noJS |
| T05 | Revisión visual y transcripción | Diseño/derivados; excepción TDD puramente visual/config y cotejo humano |

Los tests usan SQLite y usuarios sintéticos temporales. Datos: DS-01 documento v2 sinvideoId; DS-02 copia de recurso con clip conocido/IDinexistente/traversal/fuentes dobles; DS-03 cinco derivados propios; DS-04 geometría sintética antes/medio/después/inversa de scroll. El usuario pidió integrar sus contenidos; los datos sintéticos prueban únicamente controles y estados.

## Decisiones

La narrativa no se scrubbeará con scroll para evitar cortar voz. Un escenario visual persistente conecta casos y películas completas. Lectura simple en móvil y movimiento reducido. El CMS gestiona asociación/copy/publicación; sustituir archivos curados requiere nueva importación revisada.
