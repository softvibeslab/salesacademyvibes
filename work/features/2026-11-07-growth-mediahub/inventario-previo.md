# Inventario previo y decisión de base

**Fecha:** 2026-11-07. **Estado:** revisión para propuesta, no auditoría completa de cada sitio.

El workspace solicitado contiene SoftvibesSites y AIS-OS. Se contrastó el catálogo index.html (45 entradas declaradas) con carpetas inmediatas, portadas fuente y README. Se incluyeron proyectos fuera del catálogo y productos de colecciones; se agruparon análisis/variantes. No se ejecutaron builds ni se comprobaron todas las publicaciones: un título en fuente no prueba funcionamiento. Se excluyeron dependencias, ZIP, backups, archivos multimedia privados, prospectos y repos externos de herramientas de la evaluación como landing.

El nicho del encargo es formación y operación de salas de ventas de clubes vacacionales, con conversión B2B hacia demo/piloto. El mismo producto ya tiene landings; Mario confirma también formación en ventas en el workspace. Por ello se reutiliza, sin necesidad de buscar una plantilla nueva en Envato.

## Inventario de productos y bases

Las rutas son relativas a SoftvibesSites. “Análisis” indica archivo/carpeta constatado, no auditoría validada. Los archivos Astro dinámicos se contrastaron con oferta/README o con la inspección complementaria. No se trasladan cifras, clientes, contactos, imágenes ni testimonios.

| Proyecto/ruta | Nicho y audiencia | Conversión/oferta | Landing o evidencia | Análisis | Stack observado/documentado | Comparación | Variantes |
|---|---|---|---|---|---|---|---|
| `BeerVibes` | Experiencias y operación cervecera | Idea; sin conversión implementada | `README.md` | no constatado en revisión dirigida | concepto | Distinto | — |
| `CaimanTugurio` | Restaurante/bar, menú | Consultar menú | `index.html` | no constatado en revisión dirigida | HTML/JS | Distinto | — |
| `MenuVibes` | Software de menús QR/restaurantes | Consultar producto o pedir por WhatsApp | `index.html` | no constatado en revisión dirigida | HTML/JS/Supabase | Relacionado: producto B2B, otro sector | — |
| `MenuVibes-private` | Operación interna de MenuVibes | Herramientas; no landing pública constatada | `sin portada raíz constatada` | no constatado en revisión dirigida | web/herramientas | Relacionado; no base pública | — |
| `MusicSites/ioushua-barragan` | Música profesional/EPK | Booking y escuchar | `index.html` | analisis/index.html | HTML/JS/Node CMS | Distinto | alt-cultura |
| `MusicSites/ioushua-barragan/rhoman` | DJ y marca artística | Booking/showcase | `index.html` | no constatado en revisión dirigida | HTML/CSS/JS | Distinto | — |
| `atelier-noisette` | Repostería artesanal | Consulta por celebración | `site/index.html` | site/analisis/index.html | HTML/CSS/JS | Distinto | — |
| `auerea` | Activos y vehículos | Elegir unidad y agendar recorrido | `index.html` | no constatado en revisión dirigida | HTML/CSS/JS | Distinto | — |
| `berova-mama-blog` | Cocina y maternidad | Leer recetas/recursos | `README.md` | no constatado en revisión dirigida | Node/HTML/CSS/JS | Relacionado: publicación editorial | — |
| `blooming-skincare` | Clínica estética y skincare | Agendar cita | `sitio/src/pages/index.astro` | sitio/public/analisis/index.html | Astro/TypeScript/PHP | Distinto | — |
| `chambaq` | Gestión de costes para restaurantes | Definición MVP; sin app implementada | `README.md` | no constatado en revisión dirigida | especificación | Distinto | — |
| `cisne-negro-cerveceria` | Cervecería y experiencia local | Menú, visitas, comunidad | `sitio/index.html` | sitio/analisis/index.html | HTML/JS/Python/Flask/SQLite | Relacionado: CMS y mediahub seleccionados | hosting-independiente; consultoria-beervibes |
| `colegios-875` | Desarrollo residencial, Aura Residences | Consultar proyecto/recorrido | `index.html` | analisis/index.html | HTML/JS/Vapi según catálogo | Distinto: es inmobiliaria, no colegio | analisis-colegios875; propuesta-colegios875 |
| `detailbox-academy` | Capacitación técnica automotriz | Elegir curso y consultar | `index.html` | analisis/index.html, docs/RESEARCH.md | HTML/CSS/JS | Relacionado: formación, otro oficio/compra | — |
| `diana-velas-love` | Velas artesanales | Catálogo y pedido | `src/pages/index.astro` | docs/RESEARCH.md | Astro/PHP | Distinto | — |
| `diana-yoga-life` | Yoga y práctica personal | Elegir formato/contactar | `index.html` | no constatado en revisión dirigida | HTML/media | Distinto | — |
| `emir24-fit` | Fitness y coaching | Consultar asesoría | `src/pages/index.astro` | docs/RESEARCH.md | Astro/PHP | Distinto | — |
| `fabiola-mvp` | Acompañamiento personal | Ruta de programa y contacto voluntario | `index.html` | analisis/index.html | HTML/PHP | Relacionado: contenido y opt-in; otro nicho | analisis-fabiola; contenido-fabiola |
| `frank-hernandez` | Asesoría inmobiliaria | Agenda/WhatsApp | `sitio/src/pages/index.astro` | sitio/public/analisis/index.html | Astro/TypeScript/PHP | Distinto | — |
| `gaby-de-la-mora` | DJ y booking | Contratar/showcase | `sitio/index.html` | sitio/analisis/index.html | HTML/CSS/JS | Distinto | — |
| `garvi` | Ecommerce demostrativo | Carrito/pedido copiable | `index.html` | no constatado en revisión dirigida | HTML/CSS/JS | Distinto | — |
| `grupo-zamna-realty` | Inmobiliaria y campaña | Evaluar propiedad/contactar | `sitio/index.html` | sitio/analisis/index.html | HTML/CSS/JS | Distinto | — |
| `hopepaoo` | Cantante y performer | Booking/contenido | `index.html` | analisis/index.html | HTML/JS/editor local | Distinto; editor local no basta como CMS | final/deploy/public_html variantes; no se decidió canónica |
| `ivy-loya-real-estate` | Asesoría inmobiliaria | Catálogo/contacto | `src/pages/index.astro` | docs/RESEARCH.md | Astro/TypeScript/PHP | Distinto | — |
| `karla-duarte-cirujana` | Cirugía y atención médica | Consulta | `sitio/index.html` | sitio/analisis/index.html | HTML/PHP/media | Distinto | — |
| `katya-varela` | Inmobiliaria | Agenda/catálogo | `sitio/src/pages/index.astro` | sitio/public/analisis/index.html | Astro/TypeScript | Distinto | — |
| `klh-hub-rentas` | Rentas inmobiliarias | Filtrar propiedad y consultar | `index.html` | analisis/index.html | HTML/CSS/JS | Relacionado: catálogo contextual, otro nicho | — |
| `laura-luna-broker` | Broker inmobiliaria | Formulario a conversación contextual | `index.html` | analisis/index.html | HTML/CSS/JS | Distinto; útil patrón de atribución | — |
| `los-hdp-podcast` | Podcast y medios | Consumir episodio/media kit | `landing/index.html` | no constatado en revisión dirigida | HTML/JS/Python | Relacionado: taxonomía/procedencia de medios | — |
| `malandra-cerveceria` | Cervecería artesanal | Conocer lotes y proceso | `src/pages/index.astro` | no constatado en revisión dirigida | Astro/TypeScript/PHP | Distinto; útil contenido con evidencia | — |
| `mario-villanueva` | Formación en ventas | Método/curso | `sitio/index.html` | sitio/analisis/index.html | HTML/CSS/JS | Mismo nicho amplio; B2C/marca personal, adaptar a B2B | version-estructurada |
| `monica-arteaga-dkdelkaribe` | Campaña inmobiliaria bilingüe | WhatsApp contextual | `index.html` | analisis/index.html, ANALISIS.md | HTML/CSS/JS | Distinto | — |
| `mystic-nails-art` | Uñas y estética | Agendar servicio | `sitio/index.html` | analisis/index.html, ANALISIS.md | HTML/CSS/JS | Distinto | — |
| `ocean-caribbean-playacar` | Propiedad residencial premium | Visita/consulta | `index.html` | analisis/index.html | HTML/CSS/JS | Distinto | — |
| `plantilla-inmobiliaria-astro-cms` | Plantilla inmobiliaria saneada | Catálogo/formulario de ejemplo | `src/pages/index.astro` | no constatado en revisión dirigida | Astro/PHP | Relacionado: arquitectura reusable, otro nicho | — |
| `resortes-momo` | Fabricación y suministro industrial | Cotización contextual | `site/index.html` | no constatado en revisión dirigida | HTML/JS/PHP/MySQL | Relacionado: CMS/solicitud B2B, otra oferta | — |
| `smooth-group` | Arquitectura y diseño | Explorar proyectos/contactar | `index.html` | no constatado en revisión dirigida | HTML | Distinto | — |
| `softvibes-corporativo` | Productos digitales y agentes B2B | Primer flujo/conversación | `site/index.html` | no constatado en revisión dirigida | HTML/CSS/JS | Relacionado: entrada consultiva | — |
| `softvibes-flow` | Registro privado de proyectos y CRM | Gestión interna | `README.md` | no constatado en revisión dirigida | aplicación web; README | Relacionado; no landing del nicho | — |
| `softvibes-funnel` | Servicios digitales y diagnóstico | Scorecard/contacto | `site/index.html` | no constatado en revisión dirigida | HTML/JS | Relacionado: patrón de embudo | — |
| `suemi-garcia` | Asesoría inmobiliaria | Agenda/catálogo | `sitio/src/pages/index.astro` | sitio/public/analisis/index.html | Astro/TypeScript | Distinto | — |
| `tania-go-inventario` | Inventario inmobiliario bilingüe | Comparar y consultar propiedad | `index.html` | analisis/index.html | HTML/CSS/JS | Relacionado: filtros y contexto | — |
| `the-close-factory` | Inteligencia comercial inmobiliaria | Diagnóstico y piloto | `index.html` | analisis/index.html | HTML/CSS/JS | Relacionado: operación comercial B2B | — |
| `turquesa-importaciones` | Calzado infantil mayorista | Catálogo/pedido WhatsApp | `index.html` | no constatado en revisión dirigida | HTML/CSS/JS | Distinto | — |
| `valmadero` | Marca y asesoría inmobiliaria | Catálogo/contacto | `src/pages/index.astro` | no constatado en revisión dirigida | Astro/TypeScript/PHP | Distinto | clientes/blestyum-valmadero; ValmaderoAnalysis |
| `viva-aerobus` | Aerolínea; propuesta independiente | Explorar propuesta editorial | `README.md` | no constatado en revisión dirigida | Node/HTML/CSS/JS | Distinto; CMS como alternativa técnica | — |
| `viva-match` | Control de lanzamiento inmobiliario | Reporte y planificación | `index.html` | no constatado en revisión dirigida | HTML/JS | Distinto; no landing/app comercial | — |
| `vivemar` | Inmobiliaria | Catálogo/contacto | `src/pages/index.astro` | no constatado en revisión dirigida | Astro/TypeScript/PHP | Distinto; patrón CMS inicial | vivemar-alt; analisis-vivemar; redirect-vivemar |

## Bases propias de Sales Academy

| Base | Oferta / conversión | Evidencia | Decisión |
|---|---|---|---|
| `SalesAcademyVibes/sitios/plantilla` + `sitios/marcas/sales-academy.json` | Entrenamiento y coaching de salas; propuesta/piloto | Configuración real, estilos core y scripts | Base principal de arquitectura modular e identidad |
| `investment/pitch-sales-academy/landing.template.html` | Recorrido de producto y brief comercial | README y fuente existentes | Reutilizar flujo y jerarquía; no arrastrar finanzas/precios históricos |
| `prototypes/smart-agenda-mockup/` | Demo app/tablero | Código, docs actuales y GET de portada | Preservar y enlazar; no sustituir por landing |
| `vcsAcademyMobile/work/stories/2026-11-06-piloto-3-salas.md` | Piloto de entrenamiento en tres instancias | Historia EN REVISION | Fuente contractual pendiente; no prueba de implementación |

## Otros directorios revisados o excluidos

- `analisis-*`, `propuesta-colegios875`, `contenido-fabiola`, `ValmaderoAnalysis`, `clientes/blestyum-valmadero`, `vivemar-alt` y `redirect-vivemar` se agrupan con el producto correspondiente.
- `scroll-craft`, `scroll-world` y sus onboarding, `skills-dashboard`, `codex-design-skill`, `playbook-mvp`, `softvibes-agentes`, `hermes-softvibes-specialist`: documentación/herramientas, no evidencia de un nuevo nicho implementado. Aportan narración, revisión visual, orquestación y catálogo; no es necesario ejecutar todos sus flujos para esta entrega.
- `MoneyPrinterV2`, `awesome-cursorrules`, `agency-agents`, `skills`: repos externos de herramientas, excluidos de revisión exhaustiva.
- `media-archivo-vivemar`, `output`, `outputs`, `tmp`, `recuperacion-hosting-20261104`: archivos/resultados/backups, excluidos como producto y no copiados.
- AIS-OS: el workspace lo incluye; revisión dirigida de contexto por el agente no encontró otro contrato de Sales Academy que autorice esta feature. No se escaneó información personal ajena al proyecto.

## Selección y comparación

| Candidato | Adecuación | Ventaja | Límite / decisión |
|---|---|---|---|
| Sales Academy propio | Mismo producto, mismo comprador | Identidad y términos correctos; vanilla compatible | Elegido como base; contratos y contenido antiguos no son actuales por defecto |
| Mario Villanueva | Formación en ventas | Narrativa problema → método → curso | Comprador y metodología distintos; patrón secundario |
| The Close Factory | Operación comercial B2B | Diagnóstico y piloto, lógica separada de interfaz | No usar claims de cierres ni contenido inmobiliario |
| Softvibes Funnel | Embudo consultivo | Scorecard y siguiente paso contextual | No asumir recepción persistente: webhook pendiente según documentación |
| Cisne Negro CMS | Otro nicho, mismas tareas editoriales | Flask/SQLite, sesiones, CSRF, borradores, medios, publicación y recuperación en código | Referencia técnica elegida; excluir Pasaporte y datos de cliente; comparar evolución hosting-independiente antes de adaptar |
| Vivemar / plantilla Astro PHP | CMS y landing modular | Plantilla saneada disponible | Cambio a PHP/Astro innecesario para stack actual; patrones secundarios |
| Berova / Viva / MusicSites | Contenido y CMS | Bibliotecas y edición ligera | No seleccionados como backend principal; revisar durabilidad/permisos propios antes de reutilizar |
| Los HDP | Biblioteca multimedia | Procedencia, colecciones y transcripciones | Es visor/organización, no sustituto de permisos y publicación del CMS |

## Qué se aplica en Sales Academy

Una acción principal por etapa, contenido útil completo, diagnóstico explicable, CTA contextual, resultados comerciales separados de ejemplos, fuente editorial única, búsqueda con vacíos útiles, preview privada, borradores persistentes, control de publicación, revisiones recuperables, pruebas móviles y no contaminación entre clientes.

La revisión Git de referencias detectó trabajo previo ajeno; no se modificó. SalesAcademyVibes comenzó limpio en feat/sala-tours-sync, b101bc0. El catálogo global no se cambia todavía porque no se ha creado ni verificado una landing nueva; se actualizará tras implementar la feature aprobada.

Detalle de las portadas con README heredado, colecciones y CMS: [inventario-complementario.md](inventario-complementario.md).
