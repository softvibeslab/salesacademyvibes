# CP2 · Contrato del recorrido y colección audiovisual

**Estado:** implementación autorizada por la petición explícita del usuario, sobre el contrato editorial aprobado. Registro anterior a código.
**Fecha:** 2026-11-07

## Requisitos

- REQ-01: Inventariar seis originales, analizar cinco contenidos únicos, preservar originales y documentar hash/duplicado. Producir derivados web, poster y subtítulos españoles revisados a partir de ASR local; nunca subir los videos a servicios de transcripción externos.
- REQ-02: Recorrido de cinco capítulos con una escena continua y parallax de corto alcance; scroll nativo, navegación por anclas, avance/retroceso determinista. Interfaz real en casos de uso. Mantener hero editable y la identidad negro/oro aprobada.
- REQ-03: Mostrar las cinco películas completas con controles nativos, audio solo tras acción, `preload=none`, poster y VTT. La landing y mediahub toman únicamente recursos publicados del documento activo; la preview usa su borrador autorizado.
- REQ-04: Resource admite `videoId` opcional/ausente/null; cadena exacta del catálogo solo para type=video, excluyente con externalMediaUrl. Video publicado requiere una fuente; audio externo conserva su regla. Documentos y restauraciones sin videoId siguen válidos. No migración SQL.
- REQ-05: Catálogo JSON curado `growth/content/video-catalog.json`, objeto por ID: `id,title,src,poster,width,height,durationSeconds,captions,audioKind`. IDs: smart-agent, menos-caos, sistema-conectado, infraestructura-comercial, conocimiento-en-practica. Paths exactos `/growth-assets/films/{id}.mp4`, `.webp`, `.es.vtt`; se validan desde el catálogo, no se concatenan desde entrada editorial. audioKind=speech tras transcripción verificada. Sin rutas originales privadas en el catálogo público.
- REQ-06: `video_catalog` se entrega como contexto Jinja, incluido CMS mediante JSON inerte escapado. Selector «Video de la colección»; guardar/preview/publicar/restaurar y permisos existentes. No endpoint nuevo. Portada CMS tiene prioridad sobre poster; nunca queda tapada por overlay tipográfico.
- REQ-07: Los clips son activos públicos curados del paquete. El estado CMS regula aparición editorial, no confidencialidad de estos archivos. Subida general de MP4 queda fuera. Las solicitudes/eventos/auth actuales se conservan.
- REQ-08: Los enlaces de casos a películas se resuelven desde recursos del documento por videoId; retirar/reasignar una película en CMS no deja enlaces muertos ni filtra borradores. El viaje mantiene explicación útil aun si no hay películas publicadas.

## Criterios de aceptacion

AC-01: Seis originales analizados y cinco piezas únicas disponibles; duplicación explicada.
AC-02: Scroll cambia profundidad/encuadre e interfaces sin impedir navegación natural, botones ni texto; casos narran el viaje del equipo.
AC-03: Cinco videos reproducibles, pausables, con captions y texto equivalente; sin descarga MP4 inicial ni audio automático.
AC-04: CMS selecciona clip conocido, persiste borrador, previsualiza y publica; entradas inválidas reciben400 sin modificar revisión. Recurso archivado no aparece.
AC-05: Restore de un documento anterior sin videoId sigue funcionando y no publica automáticamente.
AC-06: Vista 360/390/1440, teclado, reducción de movimiento, sinJS y errores conservan contenido/acciones.
AC-07: Regresión de diagnóstico, captación, consentimiento, medios, roles y publicación previa pasa. V2 recuperable. Entrega local empaquetada.

Estos criterios son la traducción verificable de la petición autorizada, no métricas comerciales ni resultados ya obtenidos.

## NFR y Seguridad

NFR-01: Sin motores de scroll externos, GSAP/CDN, nuevas dependencias productivas ni WebGL. Transform/opacidad en rAF solo con cambios; escena fuera de vista y pestaña oculta no mantienen bucle activo. Móvil usa composición adaptada.
NFR-02: Preferencia del sistema y botón Reducir movimiento desactivan parallax; HTML sinJS presenta contenido completo. Foco visible, subtítulos y contraste dirigido.
NFR-03: Cero cuerpos MP4 transferidos antes de reproducir; presupuesto inicial sin video objetivo500KB para landing medida con caché fría, tolerancia documentada hasta800KB si posters lo requieren. Reportar bytes reales separados de videos, no esconder costos.
NFR-04: MIME video/mp4, Range206, faststart. Solo rutas de assets curados. No ampliar CSP a proveedores externos. Mantener validadores de URL externos, sesiones/CSRF/roles y datos fuera del código.
NFR-05: No transferir activos/clientes de DigitalSpace; se referencia solo UX. Rotular escenas conceptuales y demo real; no prometer que los renderings son funciones actuales.

## Repo Paths y verificación

Backend/CMS: content.py, videos.py, app.py, openapi.json, cms.html/cms.mjs, resource.html, macros.html, media-player.*. Presentación: landing.html, hub.html, cinematic.css, journey.mjs/journey-math.mjs. Contenido: video-catalog.json, seed.json, films/*.mp4/webp/vtt. QA: test_videos.py, journey.test.mjs, E2E clips y regresión existente. No tocar SQL/auth ni otras features.

CP3 define pares RED/GREEN; CP4 registra resultados observados. ADR-001 documenta catálogo curado, cinco piezas y continuidad visual sin scrubbing de diálogos.
