# CP2 · Contrato de escenarios y capturas

**Estado:** alcance autorizado por petición explícita; registrado antes de código productivo. Ver CP0 para citas, sin nueva aprobación atribuida.

## Requisitos y Criterios de aceptacion

- REQ-01 / AC-01: analizar por planos el MP4 indicado, conservar su hash y mapear conceptos a funciones observadas. Entregar inventario de 15 capturas originales, 12 móviles y 3 escritorio, con URL, dimensiones y SHA256. Ningún POST o envío remoto.
- REQ-02 / AC-02: seis escenarios con Ana y Jorge y horarios narrativos 08:45,09:10,10:10,12:20,15:30,16:30. Texto final en evidence/video/scenario-storyboard.json. Mostrar situación, acción en app, diálogo ficticio, siguiente decisión humana y límites. Etiquetas visibles de simulación y captura real con datos de ejemplo.
- REQ-03 / AC-03: página estática growth/site/assets/scenarios/index.html, seis artículos semánticos, navegación por anclas, anterior/siguiente nativos y progreso opcional por JS. Todo disponible sin JS. Scroll nativo, profundidad discreta, reduced-motion sin animación. No resultados automáticos ni envío de acciones ficticias.
- REQ-04 / AC-04: tres fotografías generadas, originales conservados con prompts. Capturas intactas enlazadas en tamaño completo. Seis composiciones exportadas PNG para presentar los casos; se rotulan como composiciones y no screenshots originales. Catálogo de 15 pantallas accesible desde la galería.
- REQ-05 / AC-05: agregar guía room-day / un-dia-en-la-sala / type guide al seed y acceso desde landing y resource.html condicionado por recurso publicado. Contrato y endpoints actuales sin cambios. CMS edita título/texto/medios registrados de la guía; composición estática requiere cambio de código. Nueva demo con base aislada, sin sobrescribir la anterior.
- REQ-06 / AC-06: móvil 360/390 y escritorio 1440, sin desbordamiento; controles de 44px, foco visible, imágenes con alt, sin descargas de medios externos ni reproducción automática. Navegación y descarga funcionan; reducción de movimiento y sinJS conservan seis escenas.
- REQ-07 / AC-07: ZIP de assets y fuente con manifiesto, README y evidencia. Sin secretos/datos runtime. Regresión existente afectada pasa. Preview local, sin publicación externa.

## Contratos y Repo Paths

No cambia API, JSON editorial público ni esquema SQLite. Manifiestos de capturas/storyboard son assets versionados de construcción, no nuevos endpoints ni campos del CMS. Rutas bajo /growth-assets/scenarios/. Archivos: index.html, scenarios.css, scenarios.mjs, screens/*.png, scenes/*.webp, compositions/*.png. Integración: growth/site/templates/landing.html y resource.html, growth/content/seed.json. Pruebas: growth/tests/test_scenarios.py, scenarios-browser.mjs. Documentación y medios originales en esta feature.

## Requisitos no funcionales y Seguridad

NFR-01: Sin CDN ni dependencias nuevas. Fotos locales optimizadas y carga diferida, dimensiones explícitas. NFR-02: Ningún texto ficcional sobre la imagen original de app. No datos personales ni cifras de resultado inventadas. NFR-03: Enlaces externos solo para abrir demo voluntariamente; galería no consulta ni modifica el servicio. Fuentes visuales y limitaciones explicadas una vez y en cada composición exportada. NFR-04: Reducir movimiento elimina transformaciones decorativas.
