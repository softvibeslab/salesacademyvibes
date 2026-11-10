# CP2 · Experiencia visual del asesor

Estado: autorizado por la solicitud explícita del usuario, registrada antes del código. Concreta la mejora solicitada sin cambiar decisiones comerciales.

## Requisitos y Criterios de aceptacion

- **REQ-01 / AC-01 · Legibilidad.** Negro, verde oscuro y oro intenso. Texto normal con contraste ≥4.5:1; bordes y foco de controles ≥3:1 frente al fondo adyacente. Tipografía principal de 14px en escritorio y 16px en móvil; secundarios de al menos 12px y acciones de al menos 44px. Medir estilos computados en landing, MediaHub y galería; comprobar teclado, foco, movimiento reducido y ausencia de colisiones.
- **REQ-02 / AC-02 · Brevedad.** Perfil y prompt solicitan 30–65 palabras, una idea y, cuando ayuda, una pregunta. Máximo 90 palabras visibles. Si el modelo excede ese máximo, reply conserva oraciones completas y un aviso breve; detail conserva el original íntegro, hasta 6000 caracteres, tras «Ver detalle». No cortar frases o negaciones ni hacer otra inferencia. Si ninguna oración cabe, una invitación neutral permite abrir el detalle sin inventar un resumen. Se conservan las reglas sobre citas pendientes y capacidades conceptuales.
- **REQ-03 / AC-03 · Sugerencias.** Hasta tres opciones únicas de un catálogo del servidor, según el último mensaje y el historial del usuario. El recorrido puede pasar por plataforma, rol, reto, tamaño o implantación y demo. No repetir datos declarados ni acciones ya tomadas; una pregunta sobre un rol o número de salas no equivale a declararlos. El agente recibe el siguiente paso para alinear su pregunta con los controles. La acción demo abre el formulario existente sin invocar Hermes.
- **REQ-04 / AC-04 · Recursos.** Hasta dos tarjetas de recursos actualmente publicados, preferentemente un video y una guía. Mostrar tipo, etiqueta, extracto y enlace al MediaHub. Los videos se reproducen dentro del chat con poster, duración, controles nativos, playsinline, preload=none, audio y subtítulos en español. Cero descargas MP4 antes de un gesto. La apertura puede recomendar smart-agent si está publicado. Conservar «Visión de producto» y el carácter conceptual de las películas; no acceder a borradores.
- **REQ-05 / AC-05 · Continuidad.** Conservar sesiones, consentimiento, idempotencia, CMS y el flujo de horario y resumen para WhatsApp. Pausar el video al cerrar, cambiar de pestaña, ocultar la página o empezar otro video, incluido el VSL. Mantener accesible el cierre. No modificar los medios originales ni enviar mensajes.
- **REQ-06 / AC-06 · Controles seguros.** Construir sugerencias y recursos desde listas permitidas del servidor, renderizar texto y controles nativos. El modelo no produce HTML, scripts, rutas o acciones ejecutables. Resolver videos exclusivamente mediante load_video_catalog() e IDs aprobados. El frontend verifica las rutas de MP4, poster y subtítulos para cada ID. Publicar V5 de forma recuperable y actualizar únicamente la identidad SOUL del perfil Hermes; conservar credenciales, autenticación, modelo y gateway existente.

## Contrato aditivo

GET /growth-api/advisor/session añade suggestions y resources, iniciales o relacionados con la última conversación. No consume inferencia. Los mensajes restaurados mantienen role y content; un mensaje assistant puede incluir detail con el original completo si la vista se compacta. Esto no modifica el historial persistido ni expone otra sesión.

POST /growth-api/advisor/messages conserva sus campos y añade suggestions y detail opcional. Las respuestas idempotentes antiguas sin estos campos siguen siendo utilizables.

- suggestions: hasta tres objetos {id, label, kind, prompt?}. label tiene hasta 48 caracteres; kind es prompt o demo; prompt tiene hasta 1200 caracteres y solo se usa en acciones de conversación. IDs, etiquetas y mensajes provienen del catálogo seguro. El frontend descarta valores malformados. Solo un clic explícito inicia la siguiente consulta; no hay encadenamiento automático.
- resources: hasta dos objetos {title, url, type, excerpt, evidenceLabel, video?}. Se conservan los campos históricos title y url. excerpt tiene hasta 220 caracteres. El enlace es una ruta /mediahub/<slug>/. Los valores editoriales proceden de la publicación actual.
- video: disponible solo para un recurso publicado de tipo video con videoId válido. Estructura {id, src, poster, captions, durationSeconds, width, height}, resuelta mediante el catálogo curado. No insertar externalMediaUrl como reproductor.
- reply: hasta 90 palabras en la vista principal. detail opcional conserva el original de hasta 6000 caracteres cuando se abrevia. El frontend usa details/summary. El historial para el modelo conserva el original para mantener contexto; la restauración de sesiones puede compactar la vista de respuestas anteriores.

No cambian persistencia, endpoints de leads, permisos, límites de coste o timeouts. No hay tablas nuevas. El contrato se refleja en OpenAPI.

## Repo Paths

- Backend: growth/server/advisor.py, growth/tests/test_advisor.py, growth/openapi.json.
- Frontend: growth/site/assets/advisor.mjs, advisor.css y pruebas growth/tests/advisor*.mjs.
- Perfil y operación: growth/deploy/advisor/SOUL.md, documentación de la feature y parche de publicación.
- Medios: auditoría de solo lectura; reutilizar catálogo, MP4, posters y subtítulos existentes.

## NFR y Seguridad

- NFR-01: no añadir dependencias CDN; cargar MP4 bajo demanda y mantener posters compactos.
- NFR-02: comprobar contraste, foco, teclado, etiquetas y texto alternativo; sin autoplay.
- NFR-03: conservar límites y aislamiento de modelo, sesiones y datos; no navegar libremente ni aceptar URLs del modelo.
- NFR-04: limitar a dos tarjetas y tres sugerencias para mantener una conversación breve.
- NFR-05: conservar contenido autorizado, etiquetas conceptuales y ausencia de precios o disponibilidad inventados.

## Test plan

- T01: RED → GREEN de brevedad, contexto de sugerencias, metadatos de video, esquema, idempotencia, sesiones antiguas y recursos archivados.
- T02: RED → GREEN de controles dinámicos, estilos computados, video bajo gesto, audio, VTT, pausa y navegación por teclado. Revisión a 360, 390 y 1440px.
- T03: actualización de SOUL y despliegue como excepción de configuración, validada con hashes, salud e inferencia real breve.

Datos DS-01 sintéticos. Las pruebas públicas no envían WhatsApp ni guardan prospectos.
