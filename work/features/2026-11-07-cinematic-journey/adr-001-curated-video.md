# ADR-001 · Videos curados y continuidad de cámara

**Estado:** aceptada para implementar la solicitud autorizada.

Se usarán cinco clips únicos del usuario como activos públicos versionados; campo editorial videoId opcional, catálogo local cerrado y HTMLvideo nativo. Se descartan URLs locales dentro de externalMediaUrl porque mezcla semánticas y relaja validación; subida MP4 general porque exige otro producto de procesamiento/seguridad. No hay nueva tabla ni dependencia de ejecución.

Se adopta escena persistente CSS/JS con cinco capítulos y scroll nativo, inspirada en DigitalSpace. No se hace scrub de voces; los videos se reproducen voluntariamente completos y tienen subtítulos/transcripción. La demo real es evidencia de interfaz; los clips son visión conceptual.

Consecuencias: archivo estático conocido puede abrirse aunque un recurso esté archivado; la ayuda CMS lo explicita. El paquete incluye derivados, no originales redundantes ni bases privadas. El usuario conserva v2 aislada para comparar.
