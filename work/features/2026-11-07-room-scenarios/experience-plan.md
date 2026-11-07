# Experiencia propuesta: un día en la sala

Estado: propuesta para concretar CP2; este documento no autoriza cambios de código. Fecha: 2026-11-07.

## Intención y alcance

Convertir la visión del video de 32,88 segundos en una experiencia que permita reconocer cómo usar Sales Academy durante una jornada ficticia de time share. El resultado combina nuevas capturas de la aplicación publicada con seis situaciones narradas. La aplicación se consulta en modo lectura; la simulación no crea tours, usuarios, mensajes, metas ni registros en el servicio remoto.

El recorrido v3 ya comunica transformación en cinco capítulos. Esta pieza complementa esa historia con acciones concretas y pantallas distintas. No necesita otra landing completa, un nuevo backend ni un CMS paralelo.

Las capturas prueban qué interfaz se observó. Los personajes, horarios, diálogos y decisiones del caso son una simulación editorial; no prueban que se realizó una venta ni que exista integración operativa en las tres salas.

## Evidencia consultada

- `growth/site/templates/landing.html`: recorrido continuo de cinco capítulos, tres capturas originales y cinco películas; casos de representante, equipo, líder y despliegue propuesto en tres salas.
- `growth/site/templates/resource.html`: lector seguro de bloques de texto, portada de MediaStore, adjuntos descargables, video de catálogo y enlace audiovisual externo.
- `growth/CONTRACT.md` y `growth/server/content.py`: contrato editorial cerrado. `body` admite heading, paragraph, list y table; no HTML, galerías ni enlaces internos arbitrarios. `externalMediaUrl` está reservado a proveedores audiovisuales permitidos.
- `growth/content/seed.json`: recursos con `evidenceLabel`, `sourceNote`, `reviewedAt`, estados editoriales y descarga Markdown.
- `prototypes/smart-agenda-mockup/app.js`: vistas locales adicionales, usadas solamente como pistas de navegación. Su presencia en código no demuestra disponibilidad en el sitio publicado.
- Confirmación inicial del agente de captura en el sitio publicado: Home/tours de ejemplo, Calendario, Roadmap de once pasos, Recursos con diecinueve plantillas y Perfil de ejemplo. SMART, RoleplayLive y vistas de equipo no se deben afirmar hasta verificar acceso real.
- Skills aplicadas: `epic-design` para continuidad, capas, ritmo y movimiento discreto; `a11y-audit` para semántica, lectura sin JavaScript, foco, contraste y reducción de movimiento. Se conserva la arquitectura existente sin introducir dependencias visuales externas.

## Seis momentos, una transformación observable

Los horarios son una convención narrativa propuesta, no una norma de la operación. Los nombres y diálogos definitivos se alinean con `video-deep-dive.md`. Cada momento debe funcionar con una captura real, una situación breve y una acción humana observable.

| Momento | Situación simulada | Pantalla candidata real | Cambio que se comunica |
| --- | --- | --- | --- |
| 01 · 08:45 · Preparar | La representante revisa su jornada y elige una conducta para practicar antes de atender un tour ficticio. | Home y Calendario; ficha Preparar mi tour | De empezar improvisando a llegar con una intención concreta. |
| 02 · 09:10 · Entender | Antes de la conversación, repasa un paso del método y una pregunta para escuchar mejor. | Roadmap y detalle de un módulo verificado | De memorizar el proceso a saber qué hacer en el siguiente paso. |
| 03 · 10:15 · Consultar | Una pareja ficticia expresa una duda. La representante vuelve al recurso aprobado para preparar una explicación clara. | Recursos y ficha Practicar una objeción | De asumir la objeción a preguntar y comprenderla. |
| 04 · 12:00 · Ensayar | Representante y líder ensayan una respuesta con una observación concreta. | Ficha de práctica; Copiloto únicamente si su vista inicial es accesible sin enviar mensajes | De practicar a solas a recibir retroalimentación humana. |
| 05 · 14:30 · Aprender | Tras el tour ficticio, identifica qué escuchó, qué aclaró y qué necesita consultar. | Ficha Después del tour | De terminar la conversación a conservar una lección útil. No se presenta un registro remoto creado. |
| 06 · 16:30 · Acordar | El líder y la representante revisan el ejemplo de progreso y acuerdan el siguiente hábito. | Perfil/semana de ejemplo y ficha Sala del manager | De mirar cifras aisladas a decidir una siguiente práctica. Las cifras son de la demo. |

La dimensión SMART se expresa como una meta editorial específica y observable; no se inventa un panel SMART si no aparece en producción. La escena RoleplayLive del video inspira el ensayo narrado, pero no se rotula como llamada funcional o entrenamiento en vivo sin evidencia.

## Composición visual

Título propuesto: **Un día en la sala. Seis momentos para llevar el método a la práctica.**

En escritorio, un fondo cálido de sala, un teléfono con captura nítida y un bloque de texto breve mantienen la misma composición de capítulo a capítulo. El momento activo cambia el contexto, no obliga a reaprender la interfaz. La captura conserva sus proporciones y su contenido original; los globos narrativos se colocan fuera de la pantalla.

En móvil, primero contexto y acción, después captura y explicación. Una línea de momentos permite saltar a cualquiera de las seis escenas. La pantalla no debe reducirse a una miniatura ilegible para hacer caber todo en un viewport.

Jerarquía de cada escena:

1. Horario ficticio, rol y momento de la jornada.
2. Título que explica la decisión humana.
3. Captura con etiqueta **Interfaz real de la demo · datos de ejemplo**.
4. Caso, diálogo y siguiente acción con etiqueta **Escenario simulado**.
5. Una nota breve sobre qué se puede observar realmente en esa pantalla.
6. Enlace para abrir la captura completa y controles de navegación.

Si se producen escenas fotográficas, se rotulan **Escena ilustrativa generada** y se conservan separadas de la captura comprobable. No se transforman los fotogramas conceptuales del video en supuesta evidencia del producto. Los archivos PNG originales se conservan para inspección; las versiones WebP optimizadas sirven al recorrido.

## Navegación y mejora progresiva

La base es HTML semántico con seis artículos y navegación por anclas. Todo el texto y las capturas están disponibles sin JavaScript. La experiencia puede incorporar un visor por pasos, pero solo añade el estado mejorado después de enlazar correctamente los eventos.

- Controles nativos Anterior y Siguiente; extremos deshabilitados de forma visible. Sin avance automático.
- El índice utiliza enlaces reales y `aria-current="step"` para el momento activo. No usar roles de pestaña sin implementar también su patrón de teclado.
- Los cambios iniciados con botones pueden enfocar el encabezado del momento. Los cambios por desplazamiento no roban el foco.
- Progreso textual: “Momento 2 de 6”, además de cualquier indicación visual.
- El desplazamiento nativo conserva la sensación de toma continua. Evitar un segundo contenedor con scroll capturado dentro del recorrido v3.
- Animación limitada a opacidad y transformaciones pequeñas; ningún contenido esencial depende de ella. `prefers-reduced-motion` elimina parallax/transiciones y mantiene la secuencia lineal.
- Objetivos táctiles de al menos 44 px, foco visible, contraste legible y ausencia de desbordamiento horizontal a 360 px.
- Las imágenes tienen dimensiones explícitas; la primera es prioritaria y las siguientes usan carga diferida. No reproducir video o audio al entrar a la pieza.
- Abrir captura completa es un enlace convencional. No hace falta un modal propio para este alcance.

## Integración recomendada sin ampliar el contrato

### Artefacto visual independiente

Servir una página estática autocontenida desde el prefijo existente `/growth-assets/`, por ejemplo `/growth-assets/scenarios/index.html`. Su CSS, JavaScript y capturas residen en la misma carpeta. No requiere una nueva ruta Flask, tablas, migraciones ni un servicio externo.

El índice o manifiesto de capturas es un asset de construcción versionado. Incluye identificador, pantalla, ruta, texto alternativo y procedencia. No es un nuevo payload editable del CMS ni una API de producto. La evidencia detallada —fecha, dimensiones, URL, navegación y hash— vive en `app-inventory.md` y en el paquete de evidencia.

### Landing y Mediahub

Agregar un acceso visible “Explorar un día en la sala” después del recorrido principal o cerca del caso de uso. Una sola entrada es suficiente; no competir con el diagnóstico ni recargar el hero.

Crear una guía editorial con el contrato existente, por ejemplo `id: room-day`, `slug: un-dia-en-la-sala`, `type: guide`, `role: rep`, `topic: practice`. La guía contiene introducción, seis situaciones y una tabla de práctica como bloques seguros, con etiqueta y nota de fuentes explícitas. El CMS conserva edición, borrador, vista previa, publicación y archivo de esos campos.

Si se necesita acceder al artefacto directamente desde la guía, el template puede incorporar una llamada a la página estática para ese identificador conocido. No introducir la URL estática en `externalMediaUrl`: no cumple el contrato. La condición debe usar el identificador estable, no el título o slug editorial.

Las portadas y adjuntos pueden subirse a MediaStore mediante el flujo existente y referenciar sus IDs válidos. No colocar rutas de archivos en `coverId`, no introducir IDs inventados en la semilla y no cargar imágenes con base64 dentro del documento. Si no se efectúa esa importación, la guía debe conservar `coverId: null` y `attachments: []`.

Límite explícito: el CMS administra el relato de la guía y sus medios registrados; la composición del artefacto y su inventario estático requieren un cambio versionado. Archivar la guía retira su publicación editorial, pero los assets estáticos públicos no son un almacén privado y pueden seguir siendo accesibles por URL. No vincular confidencialidad al estado de una guía.

### Rutas candidatas para CP3

| Archivo | Responsabilidad |
| --- | --- |
| `growth/site/assets/scenarios/index.html` | Secuencia accesible y contenido simulado del artefacto independiente. |
| `growth/site/assets/scenarios/scenarios.css` | Diseño responsive, capas y preferencias de movimiento. |
| `growth/site/assets/scenarios/scenarios.mjs` | Mejora progresiva del índice/visor si se aprueba; sin llamadas al servicio operativo. |
| `growth/site/assets/scenarios/screens/` | Capturas optimizadas y enlace a los originales autorizados. |
| `growth/site/templates/landing.html` | Un punto de entrada a la experiencia. |
| `growth/site/templates/resource.html` | CTA explícita para la guía conocida, si se requiere integración directa. |
| `growth/content/seed.json` o importación editorial existente | Guía compatible con el contrato; no sobrescribir una base activa ni autopublicar una migración. |
| `growth/tests/scenarios.mjs` | Validación de navegación, accesibilidad dirigida y rutas, cuando exista comportamiento nuevo. |
| `work/features/2026-11-07-room-scenarios/evidence/` | Capturas originales, inventario, resultados y revisión visual. |

Los nombres y cambios exactos se fijan en CP2. Evitar modificar versiones anteriores, bases de demo existentes o el prototipo operativo para conseguir capturas.

## Verificación proporcional propuesta

Antes de implementar comportamiento nuevo, registrar una prueba que falle por ausencia del recorrido o del comportamiento aprobado. La composición puramente visual puede declarar excepción TDD y documentar revisión manual; no presentar una excepción como prueba ejecutada.

| Criterio | Evidencia requerida |
| --- | --- |
| Seis escenas identificables | Conteo y encabezados en HTML; las seis quedan accesibles sin JavaScript. |
| Capturas reales y relatos separados | Cada imagen tiene archivo existente, descripción y procedencia; cada historia está rotulada como simulación. Revisión visual de que no se dibujan datos ficticios sobre la interfaz real. |
| Índice, Anterior y Siguiente | Prueba de ida y vuelta, límites, anclas y estado activo; teclado operativo y foco coherente. Si no hay visor JS, verificar navegación nativa. |
| Lectura sin movimiento | Contexto con `reducedMotion: reduce`; texto e imágenes visibles, sin parallax. |
| Layout móvil y escritorio | Capturas a 360, 390 y 1440 px, sin desbordamiento horizontal; texto y controles legibles. |
| Archivos accesibles | Todas las imágenes y enlaces de captura responden correctamente; tamaños y formato razonables; errores de consola ausentes. |
| Sin efectos operativos | El recorrido no contiene controles que envíen mensajes o alteren tours, metas o registros. La inspección remota no usa métodos de escritura. |
| Integración editorial | La guía valida con el contrato actual; draft/preview/published siguen separados; CTA de landing y guía resuelven a la pieza correcta. |
| No regresión | Ejecutar los gates actuales afectados y la comprobación del recorrido v3 cuando cambie su template. No atribuir a esta entrega los resultados históricos de v3. |

## Decisiones pendientes de CP2

- Confirmar el conjunto final de capturas con el inventario de producción. Si una vista no está disponible, sustituirla por una ficha comprobada, no por una recreación presentada como captura.
- Confirmar si la entrega incluye escenas fotográficas además de interfaces y relatos. La pieza funciona con las capturas reales aunque no existan fotografías.
- Elegir navegación por anclas o visor mejorado. Se recomienda anclas como base y una mejora pequeña; mantener la complejidad al nivel de una pieza visual reutilizable.
- Acordar si la guía se entrega como documento importable, se agrega a una nueva demo aislada o se edita mediante el CMS existente. Ninguna opción autoriza sobrescribir contenido editorial activo.
