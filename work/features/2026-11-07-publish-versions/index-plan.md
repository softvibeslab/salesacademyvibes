# Índice público de versiones · Sales Academy

Fecha: 7 de noviembre de 2026. Estado: propuesta documental para CP2; no se ha creado código ni ejecutado un despliegue desde esta tarea.

## Propósito

Dar una entrada clara a las cinco versiones autorizadas para `salesacademy.softvibes.cloud`, conservando una URL propia para cada una. La portada ayuda a comparar las experiencias; v5 ocupa el lugar principal como versión más reciente. Un visitante puede abrir cualquier versión con un enlace normal, sin registro, JavaScript ni selector que oculte contenido.

Las rutas siguientes son el contrato propuesto para publicación; su disponibilidad real se verificará después de preparar el hosting. Este índice no decide cómo se aíslan procesos, cookies o datos del CMS: esa decisión pertenece al contrato de despliegue.

## Estructura y copy

### 1. Cabecera discreta

Marca Sales Academy, enlace «Versiones» al índice de tarjetas y CTA secundario «Solicitar demo por WhatsApp». La cabecera no necesita menú móvil desplegable: los dos destinos caben en una disposición de dos filas cuando el ancho es pequeño.

### 2. Entrada editorial y v5 destacada

- Sobretexto: **SALES ACADEMY / EXPERIENCIAS**.
- Título: **Una academia. Cinco formas de descubrirla.**
- Introducción: **Explora la evolución de Sales Academy: del método y los recursos a una jornada acompañada por agentes de inteligencia artificial.**
- Tarjeta principal, etiqueta: **Más reciente · v5**.
- Título de tarjeta: **Agentes de IA, en el día a día de tu sala.**
- Descripción: **Una VSL de 33 segundos, cinco pilares y escenarios que conectan preparación, práctica y acompañamiento.**
- CTA principal: **Abrir la versión con IA →** hacia `/v5/descubre/`.
- Enlaces secundarios: **Ver los seis escenarios** y **Explorar el mediahub**.

La portada no reproduce video automáticamente. Se puede usar una única fotografía existente como apoyo visual, por ejemplo `/v5/growth-assets/ai-scenes/consultation.webp`, con dimensiones declaradas y texto alternativo que la identifica como escena ilustrativa generada. No hace falta producir una imagen nueva ni cargar las cinco landings en iframes.

### 3. Las cuatro versiones anteriores

Presentar tarjetas completas, ordenadas v1–v4. Cada tarjeta incluye número, título, una frase diferenciadora y enlaces independientes. El visitante no tiene que recordar qué cambió entre versiones.

| Versión | Título público | Descripción breve | Ruta principal |
|---|---|---|---|
| v1 | El punto de partida | Landing, diagnóstico y recursos abiertos con mediahub. | `/v1/descubre/` |
| v2 | El producto en primer plano | Identidad negro y oro, pantallas de la app y composición editorial. | `/v2/descubre/` |
| v3 | El viaje cinematográfico | Cinco capítulos, profundidad con el scroll y colección de videos. | `/v3/descubre/` |
| v4 | Un día en la sala | Seis situaciones cotidianas con fotografías ilustrativas y 15 capturas reales. | `/v4/descubre/` |

V4 tiene además un enlace visible **Ver los seis escenarios** hacia `/v4/growth-assets/scenarios/index.html`; no debe quedar escondido dentro de la landing, porque es la pieza que diferencia esa versión.

### 4. Cierre y contexto

Texto de cierre: **Encuentra el recorrido que conecta con tu equipo. Conversemos sobre cómo llevarlo a tu sala.**

CTA: **Solicitar demo por WhatsApp ↗**.

Nota única, visible y breve: **Experiencias de demostración. Las pantallas contienen datos de ejemplo; las escenas ilustrativas y los diálogos simulados se identifican dentro de cada recorrido.**

La nota aclara el carácter del contenido sin convertir el índice en un documento técnico. No presentar resultados comerciales, implementación real en tres salas o respuestas de agentes como pruebas realizadas. Tampoco afirmar que un clic confirma una cita.

## Mapa de enlaces

| Destino | URL relativa propuesta |
|---|---|
| Índice de versiones | `/` |
| Landing v1 | `/v1/descubre/` |
| Mediahub v1 | `/v1/mediahub/` |
| Landing v2 | `/v2/descubre/` |
| Mediahub v2 | `/v2/mediahub/` |
| Landing v3 | `/v3/descubre/` |
| Mediahub v3 | `/v3/mediahub/` |
| Landing v4 | `/v4/descubre/` |
| Mediahub v4 | `/v4/mediahub/` |
| Galería v4 | `/v4/growth-assets/scenarios/index.html` |
| Landing v5 destacada | `/v5/descubre/` |
| Mediahub v5 | `/v5/mediahub/` |
| Galería v5 | `/v5/growth-assets/scenarios/index.html` |

Los accesos al CMS se documentan en la entrega operativa. El índice público no necesita promocionar el panel de administración ni mostrar usuarios, archivos privados o credenciales. Los paquetes de fuente y evidencia tampoco necesitan publicarse como descargas para que el visitante compare las experiencias.

WhatsApp conserva el destino autorizado `+52 984 316 3268`, normalizado como `529843163268`. Mensaje preparado:

> Hola, quiero conocer los agentes de IA de Sales Academy y agendar una demo para mi sala de ventas.

Enlace completo para reutilizar y verificar contra la configuración de campaña:

`https://wa.me/529843163268?text=Hola%2C%20quiero%20conocer%20los%20agentes%20de%20IA%20de%20Sales%20Academy%20y%20agendar%20una%20demo%20para%20mi%20sala%20de%20ventas.`

El visitante elige abrir el enlace y enviar el mensaje. No se incorporan respuestas del diagnóstico ni se realizan solicitudes a WhatsApp al cargar el índice.

## Dirección visual

Mantener la identidad aprobada: negro cálido, oro moderado, marfil y tipografía editorial. Hero oscuro y tarjetas anteriores sobre fondo marfil, con suficiente diferencia de ritmo para distinguir «más reciente» de «historial». Un número grande y una descripción concreta bastan para cada versión; no hace falta añadir insignias de rendimiento, cifras de conversión ni animación nueva.

En escritorio: ancho de lectura máximo aproximado de 1200 px, tarjeta v5 con dos columnas y cuatro tarjetas históricas en cuadrícula de dos columnas. En móvil: una columna, títulos y descripciones completos, enlaces con área táctil mínima de 44 px. El orden del DOM coincide con el visual: introducción, v5, v1–v4, contacto.

Usar un único H1, un H2 para el grupo de versiones y un encabezado por tarjeta. Cada tarjeta puede ser un `article`; los enlaces tienen nombres específicos, por ejemplo «Abrir v3: el viaje cinematográfico», sin convertir toda la tarjeta en un enlace que englobe otros enlaces. Incluir salto al contenido, foco visible, contraste legible y subrayado o señal equivalente para enlaces de texto. No abrir landings en pestañas nuevas por defecto; WhatsApp puede usar `target="_blank"` con `rel="noopener noreferrer"`.

El índice puede funcionar con HTML/CSS estáticos dentro del despliegue existente. No requiere backend, servicio adicional, motor de scroll, fuentes remotas, SDK de WhatsApp, analytics nuevos ni iframes. Si se agrega una transición decorativa, limitarla a opacidad/transform y desactivarla con `prefers-reduced-motion`.

## Verificación propuesta

Antes de publicar, validar el índice contra la preparación local del despliegue y volver a comprobarlo en el dominio final:

1. GET de `/`, cinco landings, cinco mediahubs y ambas galerías: estado esperado 200 y versión correcta. Comprobar enlaces internos después de entrar en cada versión; un enlace absoluto `/descubre/` no puede sacar silenciosamente al visitante de su versión.
2. Confirmar que ninguna URL pública apunta a `localhost`, puertos locales o archivos privados. Validar `href`, `src`, `poster`, VTT y descargas de las galerías bajo su prefijo correspondiente.
3. Navegar el índice a 360, 390 y 1440 px: sin desbordamiento ni superposición, CTA de 44 px, copy completo y foco visible por teclado.
4. Desactivar JavaScript: índice, tarjetas, enlaces y acceso a WhatsApp siguen disponibles. `prefers-reduced-motion` no cambia la disponibilidad del contenido.
5. Interceptar el enlace de WhatsApp en QA antes de salir a la red: número y mensaje exactos, sin envío ni contenido personal añadido.
6. Comprobar que la portada no descarga MP4 ni recursos de las otras landings automáticamente. Una imagen de apoyo local es suficiente.
7. Verificar que «Más reciente» apunta a v5 y que las versiones previas mantienen sus textos, imágenes y comportamiento correspondientes a su paquete.
8. HTTPS válido, rutas canónicas con slash coherente y errores 404 explícitos para versiones inexistentes. No convertir cualquier ruta desconocida en la landing por defecto.

Las pruebas de sesiones, cookies, permisos y publicación del CMS corresponden al plan de despliegue completo; un índice correcto no demuestra por sí solo el aislamiento de las cinco aplicaciones.

## Fuentes consultadas

Se contrastaron los README de las cinco entregas locales: `2026-11-07-growth-mediahub`, `2026-11-07-growth-visual-v2`, `2026-11-07-cinematic-journey`, `2026-11-07-room-scenarios` y `2026-11-07-ai-vsl`. Los nombres y diferencias de las tarjetas proceden de esas entregas; las rutas públicas son una propuesta para el contrato actual.
