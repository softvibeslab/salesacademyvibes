# Referencia DigitalSpace y dirección de experiencia

**Fecha:** 2026-11-07. **Tipo:** análisis de referencia, sin cambios al sitio consultado.

## Lo observado

Se abrió [DigitalSpace](https://digitalspace.softvibes.pro/) en Chromium, con respuesta HTTP200, en escritorio1440×1000 y móvil390×844. Se inspeccionaron seis posiciones de scroll por viewport. El lector web no pudo acceder; la revisión visual sí se hizo en navegador real.

La página presenta ocho capítulos, una escena de fondo persistente, indicador de progreso, enlaces a capítulos y controles de avance/retroceso. El cambio de escena mantiene el mismo universo espacial. La altura observada fue16028px en escritorio y13540px en móvil. Los formularios y planes aparecen sobre el fondo cinematográfico; en móvil ciertos paneles tienen su propio scroll y el fondo muy brillante compite con texto secundario. Son observaciones de esas vistas, no una auditoría de contraste.

No se observó canvas/WebGL. La continuidad se obtiene mediante videos y capas CSS: no es evidencia de una película grabada en una sola toma. Las capturas de consulta y fuentes públicas se guardaron temporalmente en `/private/tmp/salesacademy-v3-reference/`; no se incorporan como activos de Sales Academy.

## Mecánica confirmada en fuentes públicas

| Fuente | Observación |
|---|---|
| [video.js](https://digitalspace.softvibes.pro/js/video.js?v=15) | Dos elementos de video silenciados. Se busca `currentTime` según avance del capítulo; durante el28% final se mezclan mediante opacidad. Se prepara la escena siguiente y se pausa al cambiar visibilidad. |
| [voyage.js](https://digitalspace.softvibes.pro/js/voyage.js?v=14) | Scroll nativo observado con listener pasivo y actualización requestAnimationFrame. Fondo, estrellas y luz tienen velocidades distintas. Los capítulos miden165–230svh; el texto también se desvanece según posición. |
| [styles.css](https://digitalspace.softvibes.pro/styles.css?v=17) | Escenario sticky100svh, video cover y paneles semánticos superpuestos. El diseño reduce transformaciones en móvil/reduced-motion. Parte del contenido depende de opacidad inicial cero; no debe trasladarse esa dependencia a Sales Academy. |

## Qué se adopta y qué se simplifica

**Adoptar:** una dirección de cámara reconocible, sensación de avanzar por un mismo espacio, capas de profundidad y continuidad entre la situación inicial y la transformación. El producto real debe permanecer como referencia visual durante el recorrido.

**Simplificar:** cinco capítulos breves, scroll natural, enlaces de salto, una sola escena persistente y profundidad moderada. No añadir ocho formularios, tiempos de espera simulados, interfaz de ciencia ficción operativa ni enormes tramos vacíos. El diagnóstico real de Sales Academy sigue siendo la herramienta de conversión; el relato explica por qué usarla.

El aprendizaje local complementario viene de `scroll-craft/plugins/nateherk-design/skills/scroll-craft/references/hero-depth.md` y `references/taste.md`: capas con velocidades distintas, escala como profundidad, un movimiento coherente, tipografía legible y composición móvil específica. Se leyeron como referencias; no se copió ni instaló su motor.

## Relato propuesto para Sales Academy

La persona que dirige o trabaja en la sala es protagonista. La app funciona como guía y herramienta; la transformación se expresa en acciones observables, sin prometer cifras de ventas.

| Momento | Situación y cambio | Evidencia visual adecuada |
|---|---|---|
| 01 · El punto de partida | El método existe, pero llevarlo a cada conversación requiere práctica | Escena de equipo/presentador de los videos suministrados y portada de app real |
| 02 · Encontrar una ruta | Convertir conocimiento disperso en el siguiente paso de aprendizaje | Roadmap real con sus pasos; ejemplo de preparación antes de la conversación |
| 03 · Practicar con intención | Elegir una habilidad y un recurso para el momento actual | Pantalla real de Recursos; plantilla o guía abierta |
| 04 · Llevarlo a la jornada | Organizar preparación y acompañamiento del equipo | Agenda real; caso concreto de líder/representante, sin inventar integraciones |
| 05 · Compartir el método | Revisar lo aprendido y proponer una implantación gradual en tres salas | Ruta de piloto identificada como propuesta y acceso al diagnóstico |

Los videos suministrados son anuncios verticales con presentador, locución y escenas conceptuales; el analista de medios identificó cinco clips únicos de seis archivos. No conviene arrastrar la locución adelante y atrás como si fuera un fondo mudo de DigitalSpace. La continuidad puede construirse con cámara CSS, pósters y la app real; los clips se reproducen completos por decisión de la persona. Una interfaz conceptual de los videos no acredita capacidades ni métricas reales del producto.

## Estructura viable para implementación

`section.journey` contiene un escenario decorativo y una lista semántica de cinco capítulos. El escenario aporta fondo, guía visual y teléfonos reales con capas de profundidad. Cada capítulo conserva encabezado, explicación breve, figura de interfaz real y una acción útil. El motor puede realzar el escenario en escritorio sin ocultar textos.

La galería de clips ofrece título, descripción contextual, póster y video con controles nativos, `preload="none"` y reproducción explícita. La misma pieza puede enlazarse desde el caso de uso pertinente y desde Mediahub. Las escenas conceptuales se etiquetan como tales; los ejemplos de la app se identifican como demostración.

## Condiciones de calidad

- Scroll nativo, teclado y enlaces de capítulo; no capturar la rueda ni bloquear el cursor.
- Móvil: capítulos secuenciales con figura propia y desplazamientos más cortos; evitar paneles con scroll dentro del scroll y texto sobre rostros o subtítulos incrustados.
- Movimiento reducido y sin JavaScript: contenido y figuras completos, sin tramos altos vacíos ni contenido esencial invisible.
- Reproducción voluntaria, sin audio automático; pausar cuando se abandona el video y evitar descargar los cinco MP4 al entrar.
- Control visible para detener movimiento ambiental si existe. Mantener CTA, foco y contraste durante todos los estados, no solo en el primer frame.
- Verificar en navegador inicio, transición intermedia, cierre, regreso hacia arriba, móvil, reduced-motion y reproducción de cada clip.

Este documento propone coreografía; no afirma que la v3 ya esté implementada o probada.
