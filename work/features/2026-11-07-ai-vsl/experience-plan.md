# Mezcla propuesta · agentes de IA en la jornada

Estado: diseño previo a CP2; no implementación productiva en esta tarea. Fecha:2026-11-07.

## Decisión de experiencia

Un hero editorial presenta la promesa de agentes de IA y la VSL de33 segundos, antes del scroll largo. Después, una sola escena persistente combina fotografías de la sala y pantallas reales: el visitante sigue cinco momentos sin perder el hilo espacial. La conversión principal es solicitar una demo por WhatsApp; diagnóstico y mediahub quedan como opciones de exploración.

La identidad conserva negro/oliva/oro de v3 y la luz costera/crema de v4. Las fotos son fondos completos; las capturas conservan fondo y proporciones, siguiendo epic-design. No se recortan personas ni se fabrican nuevas pantallas. Los assets ya comprobados bastan para este incremento.

## Orden y jerarquía

1. **Hero + VSL:** izquierda, titular sobre agentes IA y beneficio cotidiano; CTA WhatsApp y ancla “Ver cómo acompaña tu jornada”. Derecha, reproductor vertical completo y reconocible, 33s, poster, controles/captions nativos; fotografía de sala como contexto discreto. El CTA permanece visible junto al player y no depende de terminarlo. Sin autoplay ni carga MP4 antes de acción.
2. **Cinco pilares en continuidad:** índice breve y botón de movimiento. Copy a la izquierda, fotografía + teléfono legible a la derecha en escritorio. Son cinco capítulos con `data-chapter` y IDs existentes: `start`, `method`, `practice`, `coaching`, `scale`.
3. **Puente a la jornada completa:** acceso a los seis escenarios existentes y sus15capturas, condicionado por guía room-day publicada.
4. **Más visiones de IA:** las otras cuatro películas. No duplicar smart-agent si ya apareció en VSL. Publicación CMS sigue controlando qué se muestra; retiro del clip elimina reproductor del hero y deja alternativa de demo.
5. **Recursos y preguntas:** contenidos editables existentes, foco en usar IA con el método de la sala.
6. **Demo por WhatsApp:** cierre sencillo, teléfono explícito y CTA; el formulario local existente puede permanecer como alternativa secundaria para conservar su utilidad, sin competir visualmente.

## Escena por capítulo

| ID | Pilar / momento | Fotografía | Pantalla auténtica | Transformación narrativa |
|---|---|---|---|---|
| start | Preparar con un agente IA | briefing.webp | 06-tour-preparation-mobile.png | Pasar del recurso disponible a una preparación concreta. |
| method | Consultar el método con IA | consultation.webp | 12-copilot-mobile.png | Tener un lugar donde preguntar y volver al material aprobado. |
| practice | Ensayar con apoyo de IA | coaching.webp | 07-objection-practice-mobile.png | Preparar una pregunta y ensayar una duda frecuente. |
| coaching | Convertir la reflexión en una acción | coaching.webp | 09-after-tour-mobile.png | Consultar la plantilla y acordar con el líder qué practicar. |
| scale | Un enfoque compartido, sala por sala | briefing.webp | 03-roadmap-mobile.png | Llevar agentes, recursos y responsables a un piloto definido. |

El capítulo start puede incluir la intención08:45 y preparación09:10, conservando los seis momentos del relato ampliado. Los cinco pilares son una organización editorial, no cinco agentes desplegados ni cinco sistemas autónomos. No usar mensajes nuevos sobre las screenshots. Las posibilidades de IA se muestran como propuesta de acompañamiento y demo; no se presentan SMART/RoleplayLive como funciones verificadas.

## Movimiento y legibilidad

Reutilizar `journey.mjs` y `journeyState` sin nueva dependencia ni lógica si basta: ya suministran `data-active`, progreso global y por capítulo, guardan preferencia y suspenden actualizaciones fuera de vista. `ai-journey.css` puede añadir:

- Plano0: fotografía amplia de contexto con fundido breve, contraste protegido detrás del texto.
- Plano1: luz cálida y línea de recorrido, traslación de10–25px.
- Plano2: fotografía de escena bien definida en la mitad derecha; 3–5% de variación de escala y encuadre.
- Plano3: teléfono de235–285px, proporción390/844, elevación de20–30px y rotación máxima4°. Nunca invade la columna de texto.
- Plano4: etiqueta breve con el momento y una pregunta de ejemplo, fuera de la captura.

Una única `.journey-stage` sticky mantiene continuidad. El teléfono cambia pantalla por `data-active`; los fondos cambian por el mismo estado. La transición entre capítulos permanece corta para no dejar dos capturas legibles superpuestas. Al reducir movimiento o usar móvil/sinJS, cada capítulo muestra su foto y captura en flujo normal, sin sticky ni transformaciones.

El hero VSL queda fuera de `data-journey`; así su reproducción no está ligada al scroll y sus controles siguen accesibles. El bloque contextual puede animarse solo al desplazarse, sin movimiento continuo. Se conserva scroll nativo y navegación por anclas, con objetivos44px y foco visible.

## Contratos a fijar por raíz

- `resources` ya contiene solo recursos publicados; colección deduplicada por `videoId`. Destacar `smart-agent` solo si existe en esa colección. Colección restante filtra ese ID; el total de videos publicados no cambia.
- Reutilizar `video_player(r)` y `media-player.mjs`, que ya manejan captions, pausa de otros players y recuperación. Evitar un segundo reproductor o controles propios innecesarios.
- WhatsApp debe provenir de un único valor compartido definido por raíz, por ejemplo `whatsapp_demo_url`, con número529843163268 y mensaje codificado. Solo enlace; ninguna llamada de red, tracking adicional ni envío automático. Mostrar +52 9843163268 como contacto autorizado.
- Campos `doc.hero` y `doc.sections` siguen editables; no ampliar CMS para esta versión. Etiquetas de escenario y texto de pilares pueden permanecer versionadas, igual que v4.
- Mantener el formulario local `#demo-form` con contrato anterior como alternativa, o ajustar explícitamente tests si raíz decide retirarlo. Esta propuesta lo conserva secundario para reducir regresión.

## Rutas y QA

Ownership de implementación propuesto: `growth/site/templates/landing.html` y `growth/site/assets/ai-journey.css`; nuevo módulo JS solo si el comportamiento no cabe en CSS/progreso existente. Raíz controla base.html, seed, helper WhatsApp y otros templates.

Mantener selectores `[data-journey]`, `[data-chapter]`, `[data-journey-stage]`, `[data-motion-toggle]`, para las cinco pruebas existentes; el hero destacado sigue sumando cinco films totales cuando todo está publicado. Añadir pruebas previas de VSL única/publicación, href correcto, fotos dentro de escena animada, ausencia MP4 inicial y móvil sin desbordamiento. Revisar visualmente1440/980/390/360 y posiciones intermedias, no solo anclas.

Preservar v3/v4 antes de editar código. No tocar archivos operativos con cambios ajenos ni sus bases. La nueva demo local tendrá estado separado y empaquetado v5.
