# CP4 · Validación ejecutada

Fecha:2026-11-07. Alcance local; ninguna modificación del servicio operativo remoto.

## TDD y comportamiento

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 guía y publicación | RED | `python -m unittest growth.tests.test_scenarios -v` | 3 fallos funcionales, 1 correcto: guía ausente, enlaces ausentes y galería404. [Log](evidence/scenarios-red.txt) |
| T01 guía y publicación | GREEN | mismo comando | 4 tests correctos: contrato existente, enlaces publicados, ocultación draft/archived y asset público independiente. [Log](evidence/scenarios-green.txt) |
| T02 galería | RED | `node growth/tests/scenarios-browser.mjs` contra v3 preservada4188 |404 en vez de200 por galería ausente. [Resultado](evidence/browser-red/results.json) |
| T02 galería | GREEN | mismo script contra v4 aislada4189 |6 recorridos correctos: escenas/archivos, avance/retroceso/foco, móvil/reducedmotion, sinJS, export1600×1000, ausencia de escrituras/remotos/errores. [Resultado](evidence/browser-green/results.json) |

Excepcion TDD: fotografías, análisis, copy, composición CSS, codificación WebP sin cambio semántico, exportación PNG y empaquetado se validaron visualmente, por metadatos e integridad. No se genera un RED artificial para decisiones visuales. La lógica de integración y navegación sí tiene RED→GREEN.

Correcciones de pruebas: el primer borrador del test de seed consultaba el fixture mínimo; se corrigió a seed.json antes de implementación y se volvió a observar RED. Las expectativas no cambiaron. Las etiquetas renderizadas con text-transform se comparan por textContent (export usa regex sin distinción de mayúsculas); la comprobación :focus-visible usa Tab para activar modalidad de teclado. No se sustituyó un comportamiento requerido por otro para pasar.

## Gates ejecutados

| Verificación | Resultado | Evidencia |
|---|---|---|
| Suite Python completa |51 tests correctos, incluidos4 nuevos |[log](evidence/python-tests.txt) |
| Módulos JavaScript existentes |14 tests correctos |[log](evidence/javascript-tests.txt) |
| Regresión navegador HTTP/SQLite |15 recorridos correctos de landing, diagnóstico, consentimiento, mediahub, CMS y permisos |[resultado](evidence/regression/e2e-results.json) |
| Recorrido cinematográfico anterior |5 recorridos correctos: scroll, anclas, movimiento reducido, películas y móvil/sinJS |[resultado](evidence/regression/cinematic-results.json) |
| Guía CMS en demo v4 |Editar borrador, preview, publicar y leer200; CTA presente |[resultado](evidence/cms-guide.json) |
| Activos originales |15/15 hashes públicos idénticos, 12móviles390×844 y3escritorio1240×900; cero escrituras remotas |[validación](evidence/app/validation.json), [inventario](app-inventory.md) |
| Análisis fuente |32 fotogramas nuevos,6 escenas y original32.88s intacto |[resultado](evidence/video/analysis-check.json) |
| Composiciones |6 PNG1600×1000, ≈3.45MB en total; etiquetas separan foto generada, captura y relato |[manifiesto](evidence/compositions.json) |
| Fotos |3 originales guardados; WebP solo codifica sin recortar/redimensionar/alterar contenido; ≈565KB juntos |[procedencia](evidence/generated-scenes.json), [prompts](image-prompts.json) |
| Fuente/contrato/sintaxis |Compilación Python, sintaxis JS y validador de artefactos correctos;9 recursos y31 rutas sin ampliación API |[resultado](evidence/artifact-check.json) |
| Historia LISTA |Gate ejecutado sobre historia aprobada de la iniciativa |[log](evidence/verify-story.txt) |
| Gobernanza estricta |Gate correcto tras alinear nombres CP1/CP3 y encabezados reconocidos por el marco; no cambió el alcance |[log](evidence/verify-governance.txt) |

Los comandos Python usan /private/tmp/salesacademy-growth-venv/bin/python. Playwright ya disponible en el workspace; sin dependencias productivas nuevas. Los runners usan loopback y datos temporales. El runner portable nuevo es `python growth/tests/run_e2e.py --scenarios`, con GROWTH_PLAYWRIGHT_MODULE si Playwright no está instalado en growth.

El runner portable de escenarios se ejecutó además con una base nueva y puerto efímero: [6/6 correctos](evidence/portable-browser/results.json). La exportación final es posterior al último CSS, y sus PNG conservan dimensiones exactas. Paquete y preservación previa comprobados en [delivery-check.json](evidence/delivery-check.json); el hash del ZIP final está en growth/dist/delivery-manifest-v4.json.

## Revisión visual e independiente

Revisadas las seis composiciones: raíz01/03; revisor02/04/05/06. Escritorio1440 y móvil390 inspeccionados; pruebas adicionales360, reducedmotion y sinJS. Texto principal, capturas completas y decisiones visibles. El reproductor negro de Descubrimiento se conserva como estado observado y se explica. Capturas originales se abren a resolución completa.

[Revisión independiente](evidence/review.md): cero referencias locales rotas, cero anchors sin destino y ningún bloqueante pendiente. Se corrigieron enlaces que dependían de guía archivada, dimensiones de fotos, detalle técnico del CMS en texto público y referencias heredadas a Smart GoalSheet. El piloto sigue marcado como propuesta por validar.

## TRUST 5

| Dimensión | Evidencia ejecutada |
|---|---|
| Tested |65 pruebas de módulos,26 recorridos de navegador (15regresión+5viaje+6galería), revisión visual e integridad. |
| Readable |Historia y guiones españoles; etiquetas de procedencia; nombres técnicos ingleses; narrativa de acción concreta. |
| Unified |Galería en assets existentes y guía en contrato vigente. Sin API, SQL ni dependencia nueva. ADR explícito. |
| Secured |Capturas soloGET/HEAD; datos de ejemplo comprobados; assets públicos sin secretos; estado privado v4 fuera del código; no envío de mensajes. |
| Trackable |Citas en CP0, historia LISTA, CP0–CP5, hashes, prompts, manifiestos y paquete versionado; v3 preservada. |

Límites: validación local Chromium, no certificación WCAG ni pruebas en todos los dispositivos. Las seis escenas son simulaciones editoriales; no prueban ventas, evaluación automática ni implementación en tres salas. El CMS edita la guía, no la composición estática. El nuevo video de72s solo está propuesto en shot-list.md; no se entrega una película nueva.
