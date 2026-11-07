# Inventario complementario — SalesAcademy

Fecha: 2026-11-07. Revisión en solo lectura del workspace `SoftvibesSites`. Este documento complementa el inventario raíz; no certifica publicación, calidad o seguridad de los sitios. No se consultaron secretos, bases de clientes, credenciales ni material multimedia privado.

Se leyeron `AGENTS.md`, `PROMPT-TELEGRAM.md`, el catálogo `index.html`, la skill `landing-inventory-first` y las fuentes que se indican. Se contrastó la oferta real con los README: varios conservan texto de una plantilla anterior. Las comparaciones son respecto a entrenamiento y operación comercial B2B de SalesAcademy.

| Proyecto / familia | Fuente de oferta y evidencia | Nicho / audiencia | Conversión observada | Landing / análisis | Stack constatado | Comparación |
|---|---|---|---|---|---|---|
| Blooming Skincare | `blooming-skincare/sitio/src/pages/index.astro`: «Tu piel, nuestra pasión», servicios, carta y precios | Clínica estética y skincare | Agendar cita / preguntar por WhatsApp | Landing fuente; análisis en `sitio/public/analisis/index.html` | Astro 5, componentes + TypeScript, PHP en plantilla | Distinto; agenda puede inspirar el patrón de CTA, no la base de nicho |
| Frank Hernández | `frank-hernandez/sitio/src/pages/index.astro`: «Capital inteligente con visión de estilo de vida» y propiedades | Asesoría de inversión inmobiliaria | WhatsApp / agenda de asesoría / catálogo | Landing fuente; `sitio/public/analisis/index.html` | Astro 5, contenido Markdown/TypeScript; PHP de contacto según README de plantilla | Distinto; captación consultiva relacionada, no formación ni operación B2B |
| Katya Varela | `katya-varela/sitio/src/pages/index.astro`: propiedades rentables Riviera Maya | Asesoría inmobiliaria | WhatsApp / agenda de asesoría / catálogo | Landing fuente; `sitio/public/analisis/index.html` | Astro 5 + TypeScript | Distinto; reutilizar solo patrones de filtros y contenido organizado |
| Mario Villanueva | `mario-villanueva/sitio/index.html`: «Vender mejor empieza con tu ritmo», Método BEAT y curso | Formación en ventas y método comercial, marca personal | Entrar al curso; recorrido problema → método → curso → trayectoria | `sitio/index.html`, `sitio/analisis/index.html`, `fuentes/analisis.md`; variante `version-estructurada/` | HTML/CSS/JavaScript estático | Mismo nicho de formación en ventas; candidato obligatorio. La venta a responsables de tres salas requiere adaptar la arquitectura; no importar método, nombres, pruebas sociales o contenido |
| Suemi García | `suemi-garcia/sitio/src/pages/index.astro`: «Invierte donde ya se vive bien» | Asesoría inmobiliaria | WhatsApp / agenda / catálogo | Landing fuente; `sitio/public/analisis/index.html` | Astro 5 + TypeScript | Distinto; proceso consultivo relacionado |
| Ieoushua Barragán | `MusicSites/ioushua-barragan/index.html`: contrabajista, quinteto y trayectoria | Música profesional, contratación y EPK | Booking / escuchar / agendar fecha | Landing fuente; `analisis/index.html`; variante `alt-cultura/` | HTML/CSS/JS; CMS Node sin dependencias (`scripts/cms-server.mjs`, `scripts/build-site.mjs`) | Distinto; útil para catálogo de medios y publicación, no base del nicho |
| Rhomán | `MusicSites/ioushua-barragan/rhoman/index.html`: curaduría de música futurista | DJ / marca artística | Booking / ver showcase | Landing propia dentro de colección MusicSites | HTML/CSS/JavaScript | Distinto; producto artístico distinto, no simple variante de Ieoushua |
| Blestyum / Val Madero | `clientes/blestyum-valmadero/sitio/src/pages/index.astro`: «Vive el Caribe que otros solo vacacionan», propiedades | Marca y captación inmobiliaria | WhatsApp / ver catálogo | Variante de familia `valmadero/` y `ValmaderoAnalysis/` | Astro 5 + TypeScript, catálogo Markdown | Distinto; no contar como nuevo proyecto ni como ventas B2B |
| Los HDP el Podcast | `los-hdp-podcast/landing/index.html`, README y `mediahub/README.md`: episodios, segmentos y archivo | Podcast político / audiencia, patrocinadores e invitados | Ver episodios, YouTube/Spotify, calendario, canal WhatsApp, media kit | Landing, `/links`, `/analisis`; visor privado en `mediahub/web/` | HTML/CSS/JS + scripts Python; inventario CSV/JSON y Markdown de conocimiento; PWA | Distinto en nicho, muy relacionado en MediaHub: una fila por pieza, procedencia, temas, transcripción con tiempo y vistas por colección. No es CMS editorial completo |
| Malandra | `malandra-cerveceria/src/pages/index.astro` importa `public/data/site-content.json`; lotes, proceso y bitácora | Cervecería artesanal | Conocer lotes / Instagram / registros originales | Landing fuente; `docs/MEDIA-ANALYSIS.md`; README identifica dominio temporal noindex | Astro 7 + TypeScript; CMS PHP/JSON en hosting compartido; tests Node/Playwright | Distinto; ejemplo de contenido editable con estado de evidencia y recursos de video. No confundir lotes documentados con disponibilidad comercial |
| Mónica Arteaga × DK del Karibe | `monica-arteaga-dkdelkaribe/index.html`, README: DK44 + marca personal | Campaña y asesoría inmobiliaria bilingüe | Conversación contextual por WhatsApp | Landing ES/EN + `analisis/index.html` noindex | HTML/CSS/JS sin build; `tests/smoke.mjs` | Distinto; útil para campaña + captación atribuible y separación del análisis |
| Laura Luna Broker | `laura-luna-broker/index.html`, README: claridad, acreditación y asesoría | Marca personal de broker inmobiliaria | Formulario que prepara WhatsApp con fuente/objetivo/presupuesto/plazo | Landing ES/EN + `analisis/index.html` | HTML/CSS/JS; eventos `window.dataLayer` sin plataforma externa; smoke tests | Distinto; patrón de prueba verificable y CTA contextual, no CMS |

## Hallazgos de integridad del inventario

- `blooming-skincare`, `frank-hernandez`, `katya-varela`, `suemi-garcia` y `clientes/blestyum-valmadero` conservan en package/README la denominación «vivemar-real-estate». Su nicho se determinó con la portada real, no por ese nombre residual.
- Mario es formación en ventas: sí prueba que el nicho existe en el workspace; no hace falta inventar una nueva base de Envato por incompatibilidad de stack.
- La base principal debe ser la del propio producto: `SalesAcademyVibes/sitios/plantilla`, configuración `sitios/marcas/sales-academy.json` y `investment/pitch-sales-academy/landing.template.html`. Se constató la existencia de la plantilla y la configuración por marca; estas no son nuevas landings de clientes.
- Las herramientas y archivos privados del podcast quedan excluidos de cualquier copia. Los derivados transcritos son un patrón de organización; no constituyen autorización para trasladar contenido.
- El estado Git raíz mostró modificaciones/no rastreados en Cisne Negro, Close Factory y Los HDP. No se cambió ninguna fuente ni se infirió que los archivos no rastreados fueran descartables.

## Selección de bases por función

1. **Identidad y producto:** SalesAcademy propio, preservando la relación con la implementación de tres salas.
2. **Narrativa de formación:** Mario `sitio/index.html`, por problema → método → siguiente paso; adaptar estructura, no contenido ni metodología ajena.
3. **Operación comercial B2B:** `the-close-factory/index.html`, `calc.js` y `main.js`, por diagnóstico, resultado orientativo, piloto y WhatsApp contextual. Su calculadora está separada y tiene `tests/calc.test.mjs`. Se revisaron portada y README. Las promesas comerciales y resultados son propios del cliente y no se reutilizan.
4. **Embudo:** `softvibes-funnel/site/index.html` y `app.js`, scorecard integrado y paso a conversación. Según documentación, el guardado a Sheets depende de configurar un webhook todavía pendiente; no se puede afirmar que hay captura persistente operativa. Adaptar para valor primero y contacto voluntario, sin abrir WhatsApp automáticamente.
5. **MediaHub editorial:** patrón de Cisne Negro, resumido abajo. El visor de Los HDP aporta procedencia, taxonomías y transcripciones, no sustituye permisos/editor/publicación.

## CMS / MediaHub de Cisne: capacidades constatadas en código

Fuentes leídas: `cisne-negro-cerveceria/backend/cms_server.py`, `cms_content.py`, `cms_media.py`, `06-plan-cms-mediahub.md`; existe también evolución en `hosting-independiente/` que debe compararse antes de copiar componentes.

- Stack: Flask/Python, Werkzeug y SQLite; frontend HTML/CSS/JS en `sitio/cms/`.
- `cms_server.py` crea `cms.sqlite` con usuarios, sesiones, contenido/revisiones y actividad. Roles owner/editor. Contraseñas verificadas con hashing; token de sesión aleatorio almacenado mediante digest, expiración y CSRF para cambios. Protección antes de `/cms/api/`, `/cms/preview` y rutas admin. La presencia de esos controles no equivale a una auditoría de seguridad ejecutada.
- Rutas reales: login/logout/session; lectura de estado; borrador; publicar; historial; restaurar; biblioteca; carga/edición/archivo/uso de medios; usuarios y actividad. Se encuentran en los decoradores de `cms_server.py`.
- `cms_media.py` mantiene `media.sqlite` y directorios de originales/derivados; metadatos, origen, miniaturas y tratamiento de duplicados están separados del contenido editorial. No se requiere usar archivos de clientes como semilla.
- El plan define borrador → vista previa → publicación → historial, referencias estables y almacenamiento fuera del directorio reemplazado por despliegue. Es adecuado como contrato de capacidades; solo se deben declarar terminadas aquellas probadas en SalesAcademy.
- No trasladar Pasaporte, socios, canjes, integración de club, usuarios, credenciales, marcas, inventarios o esquemas de alcohol. El Content Hub de estrategia tiene una especificación independiente (`estrategia-contenido/09-spec-content-hub.md`); no asumir que todas sus vistas, automatizaciones o publicaciones en redes están funcionando por existir el plan.

## Límite de esta revisión

Se inspeccionaron fuentes y documentación; no se ejecutaron builds de otros clientes ni se comprobaron sus despliegues. En SalesAcademy se requieren pruebas propias de autorización, persistencia, borradores, publicación, restauración, carga de archivos, búsquedas y recorrido móvil. No se modificó el catálogo ni proyectos fuente.
