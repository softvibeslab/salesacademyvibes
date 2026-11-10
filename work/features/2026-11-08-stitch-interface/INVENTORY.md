# Inventario de interfaz · Sales Academy → Stitch

Fecha: 8 de noviembre de 2026. Proyecto nuevo de Stitch: `8496026853797356014`.

Alcance autorizado: trasladar la interfaz del módulo `growth` a un nuevo espacio de diseño. Este inventario no acredita que cada pantalla ya se haya importado en Stitch. El estado de importación lo registra el coordinador en la entrega. El runtime público permanece independiente.

## Fuentes verificadas

- Producto: `/Users/rogergv/Documents/SoftvibesLab/SalesAcademyVibes`.
- Interfaz pública actual: https://v5.salesacademy.softvibes.cloud/descubre/.
- Release de referencia del asesor: `20261107-advisor-rich-07`.
- Templates: `growth/site/templates/landing.html`, `hub.html`, `resource.html`, `diagnostic.html`, `analysis.html`, `privacy.html`, `cms.html`, `base.html`, `macros.html`.
- Comportamiento: `growth/site/assets/advisor.mjs`, `cms.mjs`, `diagnostic-ui.mjs`, `diagnostic.mjs`, `cinematic.mjs`, `media-player.mjs`, `scenarios/scenarios.mjs`.
- Contenido publicado inicial: `growth/content/seed.json`; películas: `growth/content/video-catalog.json`.
- Identidad: `site.css`, `public-v2.css`, `landing-v2.css`, `ai-journey.css`, `hub-v2.css`, `cms.css`, `advisor.css`, `scenarios/scenarios.css`.

## 25 pantallas base

Cada número es una pantalla base o familia con variantes de estado explícitas. La landing móvil tiene una pantalla dedicada (02); las demás adaptaciones móviles son variantes responsivas; estados como vacío/error no requieren inventar una ruta nueva. La lista cubre toda la navegación y los editores, no solamente el primer viewport.

| ID | Pantalla base | Ruta o estado | Contenido y variantes | Fuente principal |
|---|---|---|---|---|
| 01 | Landing cinematográfica · escritorio | `/descubre/` | Hero/VSL, cinco pilares, jornada, películas, recursos, FAQ y demo; desktop; consentimiento | landing.html, ai-journey.css |
| 02 | Landing cinematográfica · móvil | `/descubre/`, 390/360px | Variante móvil completa de 01; contenido apilado, película/pantallas compactas, CTA y asesor accesibles | landing.html, ai-journey.css |
| 03 | MediaHub | `/mediahub/` | Biblioteca, filtros q/role/topic/type, resultados y vacío | hub.html, hub-v2.css |
| 04 | Recurso escrito | `/mediahub/antes-del-tour/` y otras guías/matriz | Lectura, metadatos, bloques/listas/tablas, descarga, fuente y siguiente paso | resource.html |
| 05 | Recurso con película | `/mediahub/smart-agent/` y otras cuatro películas | Poster, play, controles, subtítulos, transcripción y contexto | resource.html, macros.html |
| 06 | Diagnóstico · pregunta | `/descubre/diagnostico/` | Seis preguntas; progreso, cuatro opciones, anterior/siguiente y validación | diagnostic.html, diagnostic-ui.mjs |
| 07 | Diagnóstico · orientación | Mismo path, resultado | Prioridades coordinación/práctica/evidencia, acciones, revisar respuestas/reiniciar | diagnostic-ui.mjs |
| 08 | Jornada y escenarios | `/growth-assets/scenarios/index.html` | Portada, seis momentos con índice, escena+captura, catálogo de 16 pantallas, CTA | scenarios/index.html |
| 09 | Análisis del recorrido | `/descubre/analisis/` | Visión IA, cinco pilares, recorrido a demo, tres salas y revisión de alcance | analysis.html |
| 10 | Privacidad | `/descubre/privacidad/` | Diagnóstico, solicitudes, conversación, medición y conservación | privacy.html |
| 11 | Asesor · bienvenida | Modal global, pestaña Conversar | Lanzador, saludo, tres sugerencias, intro audiovisual, composer y privacidad | advisor.mjs/css |
| 12 | Asesor · conversación | Mismo modal tras respuesta | Burbujas, respuesta breve, nuevas sugerencias, dos recursos; detalle, error/reintento/límite | advisor.mjs/css |
| 13 | Asesor · video | Tarjeta del modal tras play | Película vertical compacta, controles, audio/VTT, contexto; pausa/cierre | advisor.mjs/css |
| 14 | Asesor · solicitud y revisión | Pestaña Coordinar demo | Formulario opcional de contexto/horario; estado revisión con resumen editable, WhatsApp y consentimiento desmarcado | advisor.mjs/css |
| 15 | CMS · acceso | `/cms/` sin sesión | Composición editorial de dos columnas, usuario/contraseña, error y regreso al sitio | cms.html/css |
| 16 | CMS · inicio | `/cms/`, `data-page=home` | Métricas, flujo editorial, accesos rápidos y señales consentidas; owner/editor | cms.mjs home() |
| 17 | CMS · landing | `data-page=landing` | Hero, recorrido, FAQ, SEO; guardar, cambios pendientes, preview | cms.mjs landing() |
| 18 | CMS · recursos | `data-page=resources` | Listado/búsqueda, estados, nueva ficha y edición | cms.mjs resourceList() |
| 19 | CMS · editor de recurso | Recurso nuevo/existente | Idea, formato/rol/tema, bloques seguros, video, portada, adjuntos, fuente/revisión | cms.mjs resourceEditor() |
| 20 | CMS · biblioteca de medios | `data-page=media` | Cards imagen/PDF, revisión/derechos/archivado, paginación y vacío | cms.mjs mediaLibrary() |
| 21 | CMS · medio | Subida y edición del medio | Archivo, metadatos, alternativa, origen/derechos, revisión, preview, dónde se utiliza | cms.mjs uploadMedia()/editMedia() |
| 22 | CMS · solicitudes | `data-page=requests` | Contacto, contexto, consentimiento y seguimiento; vacío/paginación | cms.mjs requests() |
| 23 | CMS · asesor IA | `data-page=advisor` | Métricas de chat, lead sintético, resumen revisado, preferencia de horario, seguimiento | cms.mjs advisorLeads() |
| 24 | CMS · publicaciones | `data-page=publications` | Historial, publicación y recuperación como borrador; confirmaciones, vacío | cms.mjs publications() |
| 25 | CMS · usuarios | `data-page=users` y editor | Lista, nuevo usuario, editar rol/acceso/contraseña; owner/editor | cms.mjs users()/userEditor() |

El CMS usa una sola ruta con estados internos. No crear rutas ficticias de producción para cada módulo. Las vistas owner incluyen Inicio, Landing, Recursos, Medios, Solicitudes, Asesor IA, Publicaciones y Usuarios. Editor ve los cuatro primeros.

## Nueve recursos de referencia

| Slug | Formato | Título actual |
|---|---|---|
| antes-del-tour | Plantilla | Prepara el próximo tour con IA |
| coaching-con-una-accion | Guía | Coaching y agentes de IA: el siguiente paso |
| piloto-en-tres-salas | Matriz | Agentes de IA: una ruta para tres salas |
| un-dia-en-la-sala | Guía | Un día en la sala con agentes de IA |
| smart-agent | Video | Agentes de IA en el día a día de tu sala |
| menos-caos | Video | IA para ordenar la siguiente acción |
| sistema-conectado | Video | Agentes de IA alrededor de tu proceso |
| infraestructura-comercial | Video | Tu método, acompañado por agentes de IA |
| conocimiento-en-practica | Video | Del conocimiento a la práctica con IA |

Los seis videos originales contienen cinco piezas únicas. Este paquete incluye sus posters, no copias adicionales de los MP4.

## Referencias de la app operativa: 16 capturas

Grupo separado de las 25 pantallas del sitio/CMS. No son nuevas rutas de `growth`.

1. Hoy · móvil.
2. Agenda · móvil.
3. Roadmap · móvil.
4. Descubrimiento · móvil.
5. Negociación · móvil.
6. Preparar mi tour · móvil.
7. Practicar objeción · móvil.
8. Objeción de precio · móvil.
9. Después del tour · móvil.
10. Meta del mes · móvil.
11. Progreso semanal · móvil.
12. Copiloto · móvil.
13. Hoy · escritorio.
14. Roadmap · escritorio.
15. Tablero de sala · escritorio.
16. Meet & Greet · presentación retocada de la captura aportada.

Fuente: `growth/site/assets/scenarios/screens/`; copias sin alteración en `references/app/`. La captura original de Meet & Greet permanece en la fuente; el paquete usa la presentación retocada aprobada.

## Evidencia y límites de fidelidad

`references/` contiene 49 archivos copiados byte a byte, con origen, SHA256, tamaño y dimensiones PNG en `reference-manifest.json`:

- 16 referencias públicas de landing, recorrido, recursos, diagnóstico, análisis y galería.
- 8 estados del asesor actual, desktop/móvil, procedentes del smoke público con conversaciones sintéticas.
- 4 capturas CMS locales: dashboard desktop/móvil, editor de video y solicitudes del asesor con datos de integración sintéticos.
- 16 capturas de la demo operativa ya usadas públicamente.
- 5 posters de películas conceptuales.

Las capturas de landing y dashboard anteriores al asesor rich no prueban su estilo final: para el asesor prevalece `references/advisor/`; para Meet & Greet prevalece la referencia 16 de app. No hay una captura independiente existente de cada módulo CMS ni de privacidad; esas pantallas deben reconstruirse con los templates/estados descritos o capturarse localmente con datos sintéticos. No se ocultó esta ausencia bajo una supuesta importación completa.

`references/cms/15-home-*.png` muestra cuentas sintéticas de QA. `22-advisor-leads-desktop.png` proviene de una base efímera con lead ficticio. Las imágenes del asesor público no guardaron leads ni enviaron WhatsApp. No se incluyen contraseñas, tokens, DB, usuarios reales del CMS ni conversaciones reales de visitantes.

Archivo portátil: `salesacademy-stitch-references.zip`; hash en `reference-bundle.json`. El ZIP es una entrega de referencias; su creación no implica que Stitch admita importarlo como proyecto funcional.


## Mapa estable y cambio de numeración

`screen-map.json` registra 25 pantallas con IDs semánticos. Móvil 02 ya está incluido en esas 25; no hay una pantalla 26 por contarlo nuevamente. Los nombres numéricos de las referencias son históricos y permanecen intactos; el mapa vincula esos archivos a la nueva numeración. El catálogo de 16 capturas de app sigue separado y no suma pantallas del sitio/CMS.

Revisión de privacidad de las referencias: `reference-privacy-review.md`. Los alias de cuenta visibles en las capturas CMS son exclusivamente usuarios efímeros de pruebas; no son accesos de producción.
