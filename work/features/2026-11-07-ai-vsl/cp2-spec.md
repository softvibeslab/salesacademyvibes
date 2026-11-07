# CP2 · Contrato de la versión IA/VSL

Estado: incremento autorizado por solicitud explícita; registrado antes de código. No se atribuye una revisión adicional del PO.

## Requisitos y Criterios de aceptacion

- REQ-01 / AC-01: nuevo hero con mensaje agentes de inteligencia artificial, VSL smart-agent en primer bloque, controles nativos, poster, subtítulos y reproducción voluntaria. Una sola instancia de este clip en landing; otros4 permanecen accesibles. VSL se toma de recurso publicado/preview autorizado. Si se archiva, desaparece del bloque y colección sin mostrar borrador.
- REQ-02 / AC-02: cinco pilares/capítulos continuos con IDs start/method/practice/coaching/scale. Fotos de escenas y capturas reales responden al scroll junto con profundidad sutil. Scroll nativo, sin secuestrar rueda. Móvil, sinJS y reduced-motion muestran una historia lineal completa con todas las acciones.
- REQ-03 / AC-03: IA es la propuesta transversal de hero, pilares, casos, mediahub, guía, galería y cierre. Ejemplos de preguntas al agente se rotulan como propuestos/simulados; no se inventan respuestas observadas, métricas ni funciones operativas SMART/Roleplay Live. Se preserva distinción foto generada, pantalla de demo y visión en video.
- REQ-04 / AC-04: CTA primario «Solicitar demo por WhatsApp» a https://wa.me/529843163268 con texto codificado: «Hola, quiero conocer los agentes de IA de Sales Academy y agendar una demo para mi sala de ventas.» Mismo destino en header, hero, VSL/cierre, hub y galería. Se abre por acción del visitante; nunca envía automáticamente, bloquea lectura ni requiere ver el video completo. Mensaje no incorpora respuestas del diagnóstico ni otros datos personales.
- REQ-05 / AC-05: número y mensaje centralizados en growth/server/campaign.py para plantillas; enlaces estáticos equivalentes verificados por test. Sin API de WhatsApp, SDK, contactos, envío, tracking nuevo ni cambio de CSP. Un clic no equivale a cita confirmada. El formulario actual puede permanecer como alternativa secundaria y conserva sus permisos/consentimiento.
- REQ-06 / AC-06: contrato CMS y SQL sin cambios. Hero/textos/recurso VSL siguen draft/preview/publish/archive. Number/mensaje de campaña son configuración versionada, no nuevos campos CMS. Guía room-day y recursos existentes adaptan copy en nueva semilla; no sobreescriben bases de versiones previas.
- REQ-07 / AC-07: capturas360/390/1440, sin overflow/solapamiento, foco y teclado, mínimo44px CTAs principales. Videos sin transferencia MP4 hasta acción. Links WhatsApp comprobados por intercepción antes de red, sin enviar mensajes. Paquete nuevo y demo localagentes.localhost4190. V3/v4 recuperables.

## NFR y Seguridad

NFR-01: Sin dependencia ni CDN nuevo. Reutilizar assets y matemáticas del scroll; rAF a demanda, suspensión fuera de vista/pestaña oculta. NFR-02: Sin autoplay ni scrubbing del audio; captions disponibles. NFR-03: reduced-motion del sistema y control manual reducen movimiento. HTML esencial accesible sinJS. NFR-04: datos privados fuera del código; contenido sintético identificado; no modificación remota. No promesas de ahorro medido o aumento de ventas.

NFR-05: Tras medir la composición inicial (1,095,110bytes sin MP4), objetivo de optimización800,000bytes para todos los assets referenciados sinvideo. Se codifican cinco capturas WebP lossless con igualdad de píxeles comprobada y tres fotos WebP70 sin recorte ni cambio de resolución; originales y v4 quedan intactos. Reportar transferencia fría real y total aparte. Este presupuesto sustituye500KB de v3 por el nuevo conjunto visual; no se declara rendimiento de campo.

## Repo Paths y contratos

Presentación: growth/site/templates/landing.html, base.html, hub.html, resource.html, diagnostic.html, analysis.html; assets/ai-journey.css y assets/scenarios/index.html. Comportamiento: journey.mjs existente o ai-journey.mjs si lo requiere el nuevo montaje. Contexto interno: server/campaign.py y app.py. Contenido: content/seed.json, catálogo existente sin cambio de ruta. Pruebas: tests/test_ai_campaign.py y tests/ai-vsl-browser.mjs; runner existente. Documento de entrada/salida CMS, API, autenticación y tablas no se amplían. Evidencia y ADR en esta feature.
