# Revisión de arquitectura · recorrido cinematográfico y videos

Contrato vigente: [CP2](cp2-spec.md). Implementación y evidencia posterior: [backend-videos.md](backend-videos.md). Este informe conserva las alternativas evaluadas antes de implementar.

Fecha: 2026-11-07. Alcance de esta revisión: lectura de código existente y propuesta de contrato; no se modificó implementación. Se aplicó `code-reviewer`, sus reglas universales y las de Python. El análisis visual/sonoro de los seis MP4 (cinco piezas únicas; 06.01.26 y 06.02.39 son duplicados según la revisión paralela) y de DigitalSpace corresponde a los expedientes paralelos; aquí no se inventan sus contenidos.

## Decisión recomendada

Integrar los cinco clips únicos como **catálogo audiovisual curado, servido desde el mismo sitio**, enlazable desde recursos del CMS mediante un nuevo campo opcional `videoId`. Mantener el almacenamiento editorial JSON, los roles, la revisión de borradores, publicación y restauración existentes. No añadir tablas, proveedor externo, dependencia productiva ni subida general de MP4.

Es una ampliación pequeña del contrato entre backend y frontend, por lo que corresponde al carril Contrato. No es un mero cambio de CSS. El movimiento de presentación puede documentarse como excepción visual TDD; la selección, validación, persistencia y reproducción de clips sí requieren pruebas de comportamiento.

## Lo que permite y limita el código actual

| Evidencia | Implicación |
|---|---|
| `server/content.py`: `RESOURCE_KEYS` se usa a la vez como claves permitidas y requeridas | Un campo nuevo requiere separarlo de los campos obligatorios. Los documentos anteriores deben seguir pasando sin ese campo |
| `external_media_url()` admite únicamente URLs HTTPS de YouTube/Vimeo con rutas precisas | Pegar un MP4 local en ese campo falla; relajar el validador a URLs arbitrarias empeora el contrato y no es necesario |
| Un recurso publicado de tipo video/audio exige `externalMediaUrl` | La regla debe reconocer un video local válido, conservando la regla anterior para audio y medios externos |
| `resource.html` abre la URL externa en otra pestaña | No reproduce un MP4 local actualmente; necesita una rama nativa de video |
| `app.py` ya sirve `/growth-assets/<path:filename>` con `send_from_directory` | Los derivados curados pueden usar la ruta existente. Hay que verificar MIME, respuesta Range y tamaño real; no añadir una ruta que reciba una ruta de disco del usuario |
| La CSP incluye `default-src 'self'` y no define `media-src` | El catálogo local es compatible con la política de origen propio. Puede explicitarse `media-src 'self'` sin ampliar orígenes |
| Contexto público ya distingue documentos publicados y preview autenticada | Los recursos audiovisuales deben derivarse de ese mismo documento; no saltarse la publicación por leer el seed directamente |
| CMS clona el recurso, recoge campos y guarda por revisión | Un selector `videoId` puede utilizar el ciclo existente. No requiere otro guardado ni credenciales |
| Backups ya incluyen la base JSON y medios privados; los assets estáticos viven en el código | Los videos curados se conservan en el paquete de código. No deben confundirse con archivos privados administrados por `MediaStore` |

## Contrato propuesto, compatible hacia atrás

### Recurso editorial

Añadir a las claves permitidas de `Resource`, pero **no** a las requeridas:

```json
{"videoId": "clip-id-del-catalogo"}
```

`videoId` ausente o `null` significa sin clip local. El editor puede convertir su opción vacía a `null`. Un string no vacío solo se acepta si es un identificador exacto del catálogo curado. No se aceptan rutas, URLs, números, listas ni objetos; no se construyen rutas concatenando el campo del recurso.

Reglas:

1. `videoId` válido únicamente para `type: "video"`.
2. `videoId` y `externalMediaUrl` no pueden estar definidos simultáneamente. Mostrar error accionable, sin elegir uno silenciosamente.
3. Un video publicado requiere una de las dos fuentes. Un video borrador puede no tener fuente mientras se prepara.
4. Audio conserva el requisito existente de fuente externa autorizada al publicarse; no aceptar un clip MP4 mediante `videoId` como audio.
5. Todos los recursos, incluidos los audiovisuales, conservan bloques de contenido. Para estos cinco clips únicos se entrega resumen descriptivo fiel y, si hay voz o información sonora relevante, transcripción/captions revisados.
6. Restaurar una revisión v1/v2 sin `videoId` sigue funcionando sin migración ni reescritura forzada. Jinja y CMS deben usar `.get()`/fallback para esa ausencia.

Modificar OpenAPI `Resource` con propiedad opcional `videoId` de tipo string/null y longitud acotada, documentando catálogo y exclusión de fuente externa. Los endpoints y payloads de guardado/publicación conservan su forma general; únicamente el objeto recurso admite el campo.

### Catálogo curado

Una sola fuente de verdad del paquete, por ejemplo `growth/content/video-catalog.json`, leída por un módulo pequeño `growth/server/videos.py`. IDs semánticos se fijan después del análisis de los videos. Ejemplo estructural, **no contenido aprobado**:

```json
{
  "clip-id": {
    "id": "clip-id",
    "title": "Título confirmado tras el análisis",
    "src": "/growth-assets/films/clip-id.mp4",
    "poster": "/growth-assets/films/clip-id.webp",
    "durationSeconds": 20.0,
    "width": 1280,
    "height": 720,
    "captions": "/growth-assets/films/clip-id.es.vtt",
    "audioKind": "speech"
  }
}
```

`audioKind` describe lo verificado (`none`, `music`, `speech` o combinación acordada), nunca una suposición derivada de la presencia de un stream de audio. Si hay voz, `captions` apunta a WebVTT local revisado y el recurso incorpora transcripción. Las rutas del catálogo se limitan al prefijo local de video, sin `..`, query, fragmento o URL externa. Los originales 06.01.26 y 06.02.39 se registran como dos fuentes del mismo clip, sin duplicar transferencia ni recurso. No se exponen rutas originales del Mac ni nombres originales WhatsApp en el catálogo público; procedencia y hashes quedan en documentación de evidencia.

El mismo objeto se entrega como contexto Jinja `video_catalog` a páginas públicas y al CMS. Para el CMS puede incluirse mediante un bloque JSON inerte (`type="application/json"`, serializado con `tojson`) y leerse con `JSON.parse`, sin un nuevo endpoint ni ejecución de código inline. No duplicar la lista de cinco opciones en Python y JavaScript.

**Naturaleza de los archivos:** son activos curados de presentación que forman parte del sitio y se consideran públicos en la entrega. Guardar un recurso en borrador no convierte el archivo estático en privado; publicar controla su aparición editorial. Debe declararse esto en el contrato y la ayuda del CMS. Si se pretende contenido audiovisual confidencial o acceso por publicación al archivo, se necesitaría otro alcance con almacenamiento protegido; no es necesario para los seis archivos que el usuario pidió integrar, agrupados en cinco piezas únicas al sitio.

### CMS y render

- Nuevo selector «Video de la colección» con «Sin video local» y las cinco etiquetas del catálogo.
- El texto de ayuda distingue colección curada de subida de archivos; no aparentar que el formulario existente de imágenes/PDF admite MP4.
- Cambiar el formato a otro tipo mientras haya video seleccionado debe pedir deseleccionarlo mediante validación clara; no perder la selección sin avisar.
- El selector participa en guardado, dirty state, preview, publicación y restauración ya existentes.
- `resource.html`: player nativo `controls`, `playsinline`, `preload="none"`, poster local, nombre/descripción accesibles y tracks cuando correspondan. Sin autoplay con audio.
- La portada de la tarjeta puede usar el poster del catálogo cuando no haya `coverId`; una portada elegida en CMS mantiene prioridad. Los overlays decorativos del hub deben retirarse para ambos tipos de portada.
- Las escenas/casos de uso de la landing deben resolver el recurso desde el documento actual y enlazar a su detalle; cambiar título/clip/estado desde CMS se refleja en ese contenido. Evitar que una copia hardcodeada del seed revele un recurso archivado o borrador.
- El estado de la colección (cinco recursos audiovisuales nuevos, con trazabilidad de los seis originales) se incorpora al seed para una instancia v3 aislada; no sustituir silenciosamente el documento vivo de v2. La migración de una instalación con contenido propio, si se pide, debe ser una operación explícita de mezcla/importación.

## Experiencia cinematográfica con costo acotado

La idea de una toma continua no exige convertir todos los clips en un video gigante ni reproducirlos todos al hacer scroll. Una escena compartida sticky, capas de parallax corto, desplazamiento de marco e interfaces reales entre capítulos puede construir continuidad usando scroll nativo.

- No secuestrar rueda/touch ni imponer velocidad de avance. Enlaces a capítulos deben funcionar con teclado y sin JS.
- La mejora JS se activa con una clase; el HTML base conserva orden, texto y medios utilizables. No ocultar todo el recorrido esperando un observer.
- `prefers-reduced-motion` y un control «Reducir movimiento» deben desactivar desplazamientos/crossfades complejos y dejar una lectura lineal.
- En móvil usar una escena más corta o composición lineal, sin largos espacios vacíos para mantener un pin de escritorio.
- Usar progreso de scroll acotado y `requestAnimationFrame`; leer geometría agrupada, modificar solo transforms/opacidad y detener listeners/animaciones al salir de la escena. No añadir GSAP/WebGL para esta variante sencilla.
- Los videos narrativos conservan reproducción voluntaria y resumen legible. Un corte silencioso decorativo solo se justifica si el análisis muestra una escena adecuada y existe control de pausa; no sustituye las cinco piezas completas.
- No hacer `currentTime` scrub de cinco MP4 a la vez ni descargar todos para sostener el parallax. Es preferible mover el encuadre/poster y dejar el video a elección del visitante.

Los originales permanecen intactos. Los derivados deben tener dimensiones y bitrate adecuados, `faststart`, posters optimizados y hashes verificables. La transcodificación ocurre durante construcción, nunca con subprocess disparado por una petición CMS.

## Pruebas primero y aceptación

| Par de tareas | RED que debe observarse | GREEN requerido |
|---|---|---|
| Validación de videoId | Un recurso local válido se rechaza por clave extra/regla de fuente | Catálogo conocido válido; ausencia/null antiguos aceptados; desconocido, traversal, URL, lista/objeto y tipo no video rechazados |
| Fuente única | Combinación local + externa no tiene regla explícita | Error400 conservando el borrador/revisión; videos/audio sin fuente publicados siguen rechazados |
| Persistencia y publicación | Guardar recurso con clip no funciona | Editor guarda y previsualiza; público anterior intacto; owner publica y aparece el player; editor no puede publicar |
| Restauración compatible | Nueva propiedad/lectura puede romper documento antiguo | Restore de publicación sin campo y nueva publicación correctos; restore no publica por sí mismo |
| Render y privacidad editorial | Player/poster inexistentes o borrador expuesto | Player correcto en detalle y preview; el hub respeta filtros; recurso borrador/archivado no aparece públicamente |
| Transporte MP4 | Archivo inexistente/no identificado | MIME video/mp4, solicitud Range206 con Content-Range correcto, descarga parcial; URL desconocida y traversal no sirven archivos ajenos |
| CMS navegador | No existe selector/guardado de clip | Selección, dirty state, guardar, preview y publicar completos con datos sintéticos; cambio incorrecto de tipo muestra error |
| Reproducción y carga | No existe player o se descargan todos al entrar | Antes de interacción no se transfieren cuerpos MP4; un clip puede reproducir/pausar; poster/error accesibles; sin autoplay audible |
| Progreso del recorrido | Función/estado nuevo ausente | Límites antes/después de capítulo, avance y retorno deterministas; sin NaN; reduced motion y preferencia local desactivan transformación |
| Navegación y reflujo | Composición nueva rompe foco/alto/scroll | 360/390/1440 y reflujo200%, Tab/Enter, anchors, noJS, reducedmotion y error de medio; contenido sigue accesible |

El presupuesto inicial debe medir HTML/CSS/JS/posters realmente transferidos; los bytes de cada MP4 y el total de la colección se reportan aparte, no se ocultan en una suma solo de imágenes. La prueba anterior de500KB tendrá que usar un presupuesto explícito nuevo o conservarlo mediante posters pequeños y carga diferida; no modificar el límite para esconder una descarga inicial masiva.

## Archivos que cambian

- Contrato/evidencia: CP0–CP5, ADR del catálogo curado, historia, `growth/CONTRACT.md`, `openapi.json`.
- Backend acotado: `content.py` (campo y reglas), módulo de catálogo nuevo, `app.py` (contexto y CSP explícita si se elige); sin tocar auth ni SQL.
- Editorial: seed con los cinco recursos audiovisuales, catálogo de clips, resúmenes/transcripciones y archivos VTT donde apliquen.
- Frontend: CMS selector, `cms.html` JSON inerte, recurso/player, macro/poster/hub, landing y módulo/estilos del recorrido. Preservar campos de texto editables existentes.
- Build: derivados MP4/posters/VTT y `package_delivery.py` debe admitir sus extensiones; conservar ZIP v2.
- QA: pruebas backend nuevas, test de progreso, E2E de clips/CMS y revisión de carga/accesibilidad; reutilizar regresión existente.

## Alternativas evaluadas

1. **Solo videos fijos en HTML:** evita el campo nuevo pero deja el CMS incapaz de seleccionarlos y puede saltarse el estado editorial. Útil únicamente como decorado explícito; insuficiente como integración completa al mediahub.
2. **Ampliar `externalMediaUrl` para aceptar rutas locales:** ahorra una propiedad, pero mezcla proveedores externos con activos internos y obliga al cliente a deducir semántica por prefijo. Peor legibilidad y validación que `videoId`.
3. **Añadir subida MP4 al MediaStore:** requiere validación audiovisual, límites, procesamiento, cuotas, errores y backup de archivos grandes. No es necesario para integrar cinco piezas únicas ya proporcionadas; aumenta riesgo y tiempo sin mejorar este encargo.

La primera opción limpia y suficiente es el catálogo curado con un campo opcional. La aprobación vigente y la petición explícita del usuario autorizan integrar los videos; el contrato concreto debe registrarse antes del código bajo el gobierno del producto, sin otra confirmación rutinaria. Esta revisión propone ese contrato, no declara todavía ejecutadas las pruebas ni aprobado el contenido de clips aún en análisis.
