# Revisión independiente de integración

Fecha: 2026-11-07. Alcance: lectura de `growth/content/seed.json`, plantillas de landing/recurso, CSS de entrada y HTML/CSS/JS de la galería. Sin cambios de código por el revisor. Esta revisión contrasta el relato con las 15 capturas originales y con los límites del CMS existente; no sustituye la validación de navegador de la feature.

## Hallazgos

### R1 · Enlaces a una guía archivada — resuelto

Prioridad P2. `growth/site/assets/scenarios/index.html:13` y `:140` enlazan directamente a `/mediahub/un-dia-en-la-sala/`. El contrato conserva pública la galería aunque se archive la guía (`growth/server/app.py:345`, `growth/tests/test_scenarios.py:56`), mientras el lector responde 404 cuando no está publicada (`growth/server/app.py:399`, `growth/tests/test_scenarios.py:49`). Por tanto, abrir la galería conservada después de archivar lleva a dos enlaces rotos.

Estado final: ambos enlaces ahora apuntan a `/mediahub/`, que permanece disponible independientemente del estado de `room-day`. Comprobado de nuevo en el HTML final.

Reproducción del estado inicial por lectura del contrato: archivar `room-day` → la galería estática sigue disponible → pulsar “La guía de este recorrido” o “Abrir la guía del recorrido” → el lector editorial ya no existe públicamente. Esto no expone un borrador; es una limitación de navegación. Se recomendó apuntar a Mediahub general o usar una alternativa compatible con los estados editoriales, sin crear otro contrato.

### R2 · Dimensiones declaradas de las fotografías — resuelto

Prioridad P3. `growth/site/assets/scenarios/index.html:17`, `:32`, `:48`, `:64`, `:80`, `:96` y `:112` declaran 1536 × 1024. Los tres WebP reales son 1672 × 941, comprobado con Pillow. Estado final: las siete instancias fotográficas declaran ahora 1672 × 941; comprobado contra los archivos. Los contenedores de CSS fijan altura y usan `object-fit:cover`, así que el diseño final no depende de esas dimensiones para su altura; aun así, conviene declarar el tamaño real para mantener correcto el HTML y el fallback sin estilos.

### R3 · Detalles del CMS expuestos en texto público — corregido durante la revisión

Prioridad P3, resuelto. `growth/content/seed.json:802` incluía “El CMS administra este relato; la galería visual es un artefacto versionado”, que `growth/site/templates/resource.html:122` imprime públicamente. La última lectura confirma que se retiró de `sourceNote`; ahora la nota contiene solo procedencia, simulación e imágenes generadas. El límite técnico sigue documentado en README y ADR.

### R4 · Smart GoalSheet en la guía anterior — aclarado

Prioridad P3, informativa. `growth/content/seed.json:349` y `:381` usan “registra en Smart GoalSheet” y “uso de Smart GoalSheet” dentro del recorrido de piloto propuesto. La nueva guía (`:789`) aclara que esa función no quedó probada. No se atribuye disponibilidad a los seis nuevos casos, pero conviene rotular explícitamente el recorrido anterior como objetivo por validar para evitar una lectura contradictoria. Estado final: el recorrido ya se presenta como “Recorrido objetivo del piloto de entrenamiento, por validar” y usa “registro de metas acordado” en las instrucciones y la medición. La fila de matriz se revisó como parte del contexto propuesto. No bloquea la revisión de los nuevos escenarios.

## Verificaciones realizadas

- Los 15 PNG en `growth/site/assets/scenarios/screens/` coinciden exactamente por SHA-256 con `evidence/app/capture-manifest.json`: 15/15, incluido el Copiloto después de cargar su saludo inicial.
- No hay cifras editadas ni nuevos mensajes pintados sobre las capturas. El catálogo permite abrir cada PNG original.
- Los seis momentos del seed coinciden con la galería: intención, preparación, descubrimiento, práctica, coaching y siguiente paso; horarios y conversaciones están marcados como ficticios.
- El relato no convierte la plantilla Meta del mes en una hoja SMART ni la vista previa de práctica en Roleplay Live. La sección de coaching no presenta el tablero operativo como analítica de aprendizaje.
- Landing y lector condicionan su entrada a `room-day` mediante el documento editorial. La galería es un asset público independiente, como documenta el ADR; no contiene texto extraído de un borrador del CMS.
- `scenarios.mjs` solo actualiza índice y `aria-current`; no realiza solicitudes, envíos, cambios de almacenamiento ni mutaciones remotas. El contenido completo y los anchors existen en HTML.
- CSS contempla `prefers-reduced-motion`, enlaces con foco visible y disposición móvil. Las capturas se mantienen con relación 390/844 y se enlazan sin modificación.
- El análisis de HTML no encontró IDs duplicados ni anchors internos sin destino.
- El recurso `sourceNote` conserva procedencia y declaración de ficción. No se encontraron estados draft/review/archived ni notas internas del CMS expuestos en los nuevos relatos.

## Cierre de revisión

Estado: sin hallazgos bloqueantes pendientes en el alcance revisado.

Reverificación final ejecutada después de las correcciones:

- 0 archivos locales referenciados ausentes y 0 anchors sin destino.
- Enlaces públicos de regreso de la galería: `/descubre/` y `/mediahub/`; no dependen de que una guía concreta siga publicada.
- 7 instancias de fotografías con dimensiones declaradas correctas.
- 6 composiciones PNG presentes, todas de 1600 × 1000.
- 15/15 capturas públicas aún idénticas por SHA-256 a los originales.
- Inspección visual independiente de las composiciones 02, 04, 05 y 06: texto legible, captura de app visible, simulación identificada y pie explícito “COMPOSICIÓN EDITORIAL · ESCENA GENERADA + CAPTURA REAL”. El agente principal informó revisión de 01 y 03; no se presenta ese trabajo ajeno como ejecución del revisor.
- El bloque negro de video en la captura de Descubrimiento se conserva como estado nativo de la demo. La galería ahora lo explica como reproductor sin iniciar; no se sustituyó por una UI inventada.

La revisión no escribió en las bases de datos ni en v3. La validación funcional de navegador queda en la evidencia de QA de la feature; este documento acredita contraste factual, integridad de assets y revisión estática/visual independiente.
