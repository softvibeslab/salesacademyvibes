# Análisis de los videos aportados

Fecha: 2026-11-07. Se revisaron los seis archivos solicitados, sin modificar originales ni subirlos a servicios de transcripción. Hay **cinco videos únicos**: `06.02.39` y `06.01.26` son copias binarias idénticas. Integrar una sola copia evita repetir una pieza y descargar 6.86 MB innecesarios; ambos nombres se mantienen en la trazabilidad.

## Evidencia y límites

- `ffprobe` confirmó duración, resolución, codecs y pista de audio de cada archivo; se calculó SHA-256. [Metadatos](evidence/media/metadata.json).
- Se inspeccionaron ocho fotogramas distribuidos entre inicio y final de cada pieza y una segunda serie cada dos segundos de los cinco videos únicos. Las hojas de contacto y fotogramas se conservan en `evidence/media/`.
- La voz se transcribió localmente con `mlx-whisper` y `mlx-community/whisper-large-v3-turbo` ya instalados, con `HF_HUB_OFFLINE=1`. Se conservan JSON, TXT y subtítulos automáticos. No hubo descarga de modelo ni envío de audio.
- La transcripción identifica **locución en español**. No se realizó escucha humana ni clasificación fiable de música o efectos. La pista AAC estéreo se debe conservar en los videos completos; un extracto decorativo, si se usa, debe estar separado y sin audio.
- Los subtítulos VTT propuestos corrigen errores evidentes de ASR («Agenda Undemo», «Cuch», «Gold Sheet») a «Agenda una demo», «Coach» y «GoalSheet», en concordancia con el contexto y la interfaz representada. Son subtítulos automáticos revisados editorialmente, no una certificación de sincronía o transcripción manual.

## Inventario de los seis archivos

Todos son verticales H.264, `yuv420p`, audio AAC estéreo a 44.1 kHz. Total recibido: 41,161,144 bytes. Cinco únicos: 34,299,114 bytes y 181.26 segundos.

| Archivo WhatsApp | ID propuesto | Duración | Resolución / fps | Qué contiene |
|---|---|---:|---|---|
| `06.01.26.mp4` | `smart-agent` | 32.88 s | 576×1024 / 24 | Presentador en sala, integrante holográfico, objetivo SMART, roleplay, progreso de entrenamiento y cierre a demo |
| `06.01.29.mp4` | `menos-caos` | 41.38 s | 576×1024 / 24 | Presentador en terraza costera, notas, persona con teléfono, gráficos azules, sugerencia de coaching, objeciones y escenas de equipo |
| `06.01.30.mp4` | `sistema-conectado` | 41.38 s | 720×1280 / 24 | Misma locución reconocida que `menos-caos`; cambia el montaje por nodos, contexto/objetivo, interfaz negro/oro, chat, paneles conectados e infraestructura |
| `06.02.37.mp4` | `infraestructura-comercial` | 29.02 s | 480×848 / 24 | Presentador, Roadmap, asistente, persona esperando, roleplay y GoalSheet; cuestiona depender del gerente para entrenar |
| `06.02.38.mp4` | `conocimiento-en-practica` | 36.59 s | 480×848 / 30 | Presentador y equipo, asistente sobre teléfono, Roadmap, biblioteca y propuesta de alimentar métricas desde la actividad |
| `06.02.39.mp4` | Alias de `smart-agent` | 32.88 s | 576×1024 / 24 | Copia exacta de `06.01.26`; mismo SHA-256 `d10f73ebe4566d97eadf098ef96565cda04c478e03fe937fcb5f2d53181cc2b7` |

## Lectura de cada pieza

### 1. Smart Agent · el método acompañado

La locución introduce al agente como un nuevo integrante del equipo, conectado con proceso, conocimiento, objetivos SMART, roleplay y visibilidad para líderes. Se observan subtítulos amarillos incrustados por palabras. La escena más distintiva es la figura de luz dorada junto a la mesa alrededor de 5 s; después aparecen interfaces conceptuales negro/oro, una llamada de práctica y paneles de progreso.

**Uso propuesto:** capítulo «Encuentra una guía» y explicación de acompañamiento. Mostrar una captura real de Roadmap o Copiloto al lado del video conceptual. Poster sugerido: **4.93 s**. Extracto ambiental opcional: **3.9–5.8 s**; es una escena corta, no un plano secuencia completo. Video completo con controles para conservar el argumento y la voz.

### 2. Menos caos · reconocer el reto

La locución describe un asistente que entiende objetivos, recuerda contexto y ayuda a actuar; menciona organizar pendientes, resumir mensajes, preparar reuniones, revisar métricas y reducir trabajo repetitivo. El montaje muestra notas y teléfono, aprendizaje, sugerencias, mapa de objeciones y colaboración. No se observaron subtítulos de locución incrustados; sí texto dentro de interfaces y gráficos.

**Uso propuesto:** explicar el problema y el cambio en la jornada del representante. El caso real que puede acompañarlo es «Preparar la siguiente conversación», con Agenda y Recursos de la demo. Poster sugerido: **6.21 s**, persona usando el teléfono. Extracto opcional: **5.8–7.8 s**. No reproducir las cifras o líneas ascendentes del montaje como resultados del producto.

### 3. Sistema conectado · el proceso toma forma

La transcripción coincide con la pieza anterior, pero el montaje enfatiza objetivos/contexto, conexiones, teléfono negro/oro, chat de objeciones y paneles. La retícula de nodos dorados/cian, alrededor de 10–13 s, es la referencia más útil para construir continuidad espacial con el diseño actual.

**Uso propuesto:** capítulo «Convierte el conocimiento en una ruta». Mantener una línea o trayectoria visual que conecte el recorrido, sin convertirla en una falsa consola operativa. Poster: **12.41 s**. Extracto opcional: **10.1–13.4 s**, silencioso y etiquetado como escena conceptual. El capítulo debe presentar también una interfaz real de la app, no solo un diagrama aspiracional.

### 4. Infraestructura comercial · de dependencia a método

La voz contrapone la dependencia del tiempo del gerente con un sistema de entrenamiento compartido. El montaje utiliza subtítulos amarillos por palabras, cambios bruscos de escala, Roadmap, asistente, roleplay y hoja de objetivos. Hay varios acercamientos con desenfoque/transición; no conviene usarlos como poster.

**Uso propuesto:** capítulo de transformación del líder: observar, acompañar y elegir la siguiente práctica. Poster: **13.06 s**, Roadmap conceptual legible como ilustración. Extracto opcional **11.7–14.0 s**. También puede usarse un fotograma del presentador para evitar que el visitante confunda esa interfaz con la demo actual.

### 5. Conocimiento en práctica · la transformación compartida

La locución parte de la inconsistencia del entrenamiento dependiente de una persona; introduce Smart Agent, coach 24/7, Top Producer Roadmap, videos/guiones/recursos, conocimiento de líderes y GoalSheet. Es la pieza más directa para contar la transferencia del conocimiento hacia práctica y seguimiento.

**Uso propuesto:** capítulo «Vuelve al equipo con una forma de trabajar», seguido por la propuesta de implementación en tres salas. Poster: **16.47 s**, presentador con teléfono y asistente visual. Extracto opcional: **15.8–17.5 s**. El montaje contiene una carta de prueba de televisión/barras de color cerca de **9 s**; parece un recurso de transición, pero no debe convertirse en poster ni fondo decorativo. Se conserva el original completo salvo una decisión editorial explícita de recorte.

## Lo observado no demuestra capacidades productivas

Los videos son piezas de visión/comunicación del producto: varias pantallas contienen texto deformado, nombres poco legibles, montos o gráficas de ejemplo y diseños distintos de la demo real. No acreditan una integración funcionando, cobertura 24/7, autonomía, ventas, resultados, adopción ni métricas de clientes. La locución es el mensaje del material aportado, no una validación técnica de todas sus afirmaciones.

Para el sitio, distinguir **«La visión en video»** de **«Así se ve en la demo»** con una etiqueta corta junto al medio y capturas reales por caso de uso. No se debe repetir una promesa de la voz como dato demostrado en un titular o contador. El contexto editorial puede resumir la intención: preparar, practicar y acompañar.

## Viaje del héroe aplicado a la experiencia

El protagonista es el representante y su equipo; la plataforma acompaña. Propuesta de arco, derivada del contenido:

1. **Una jornada dispersa:** conocimiento repartido, pendiente siguiente poco claro. Escena humana de `menos-caos`; interfaz real Agenda.
2. **Encuentra una guía:** el método aparece como camino. `smart-agent`; Roadmap real.
3. **Pasa a la práctica:** una conversación concreta y un recurso útil. `sistema-conectado`; Recursos/Copiloto reales, solo con funciones verificadas.
4. **Aprende con tu líder:** observación y siguiente acción compartida. `infraestructura-comercial`; guía de coaching existente, sin inventar un dashboard disponible.
5. **El método llega a cada sala:** propuesta de preparación, piloto y revisión. `conocimiento-en-practica`; ruta de tres salas y diagnóstico abierto.

## Implicaciones para scroll y reproducción

- Los archivos son montajes verticales con voz, no cinco tomas continuas ni video ancho. Estirarlos a pantalla completa o recortar al centro en escritorio elimina caras, subtítulos o interfaces. Usar contención vertical y una escena de fondo propia que continúe entre capítulos.
- Crear sensación de una sola toma mediante **un escenario persistente, una trayectoria y transiciones suaves de escala/posición**, mientras el contenido avanza. El movimiento puede ser simple; no necesita secuestrar el scroll ni perseguir cada fotograma de los videos hablados.
- Los videos completos deben arrancar por acción del visitante, con controles y subtítulos. `preload="none"` y posters; evitar descargar los 34 MB antes de elegir una pieza.
- La versión móvil debe conservar rostros/textos y presentar los capítulos en orden. Con movimiento reducido, ofrecer la misma historia en composición estable, sin perder texto, controles o CTA.
- Un extracto ambiental es opcional y separado, sin sonido, corto y pausable. Las tomas conceptuales de redes son mejores para un fondo discreto que una cara hablando en silencio detrás de párrafos.
- Las afirmaciones de disponibilidad, datos y resultados deben distinguirse del recorrido real de la demo. La transformación se cuenta mediante acciones concretas, no porcentajes inventados.

El [plan estructurado](evidence/media/integration-plan.json) contiene IDs, fuentes, tiempos de poster, extractos sugeridos, estado de captions y trazabilidad del duplicado. Los recortes son propuestas de análisis; CP2 decidió conservar las cinco piezas completas y no producir extractos ambientales automáticos.

## Derivados web construidos después de CP2

Se produjeron cinco MP4 completos, cinco posters WebP, cinco pistas VTT españolas y cinco archivos de texto equivalente en `growth/site/assets/films/`. El catálogo curado está en `growth/content/video-catalog.json`, con las claves exactas acordadas en CP2. No contiene rutas de los archivos originales.

| ID | MP4 | Poster | Duración final | Captions |
|---|---:|---:|---:|---:|
| `smart-agent` | 5,549,996 bytes | 21,764 bytes | 32.879 s | 9 bloques |
| `menos-caos` | 3,786,601 bytes | 23,520 bytes | 41.399 s | 10 bloques |
| `sistema-conectado` | 6,367,669 bytes | 22,980 bytes | 41.375 s | 10 bloques |
| `infraestructura-comercial` | 3,587,135 bytes | 37,864 bytes | 29.025 s | 9 bloques |
| `conocimiento-en-practica` | 3,342,374 bytes | 15,266 bytes | 36.594 s | 8 bloques |

Total MP4: **22,633,775 bytes**, aproximadamente 34% menos que los cinco originales únicos. Total posters: **121,394 bytes**. La carga inicial debe usar los posters; estas cifras no autorizan descargar todas las películas al abrir la página.

Codificación: H.264, CRF23, preset medium, `yuv420p`; audio AAC96k; `+faststart`; resolución original sin ampliar, máximo720px de ancho. Los posters usan480px como máximo. Se extrajo el fotograma con FFmpeg y se codificó WebP con Pillow ya instalado, calidad76/method6: el FFmpeg disponible no incluye el encoder `libwebp`, por lo que el primer intento de poster falló y se sustituyó por esa ruta sin agregar dependencias. Los MP4 de ese intento eran válidos y se reutilizaron en la reanudación.

Se ejecutó decodificación completa sin errores para los cinco MP4; se comprobaron codecs, resolución y duración; el átomo `moov` precede a `mdat` en todos, confirmando faststart. Los VTT tienen intervalos ordenados y dentro de la duración. Se inspeccionó la [hoja de posters finales](evidence/media/production-posters.jpg). Los seis SHA-256 originales permanecen idénticos a la primera lectura. [Validación ejecutada](evidence/media/derivative-validation.json).

Los subtítulos finales usan alineación automática por palabra y un máximo de dos líneas. Se conservan los resultados ASR sin corregir en `evidence/media/transcripts/` y `word-timing/`; los VTT por ID y los `.es.txt` incorporan únicamente las normalizaciones documentadas. No se presenta su precisión como perfecta ni se altera la voz original.

Receta reproducible: `python work/features/2026-11-07-cinematic-journey/evidence/media/derive-videos.py`, usando el Python con Pillow existente. `--resume` permite terminar posters/captions cuando ya están los MP4 derivados. Los comandos exactos, pesos, metadatos y hashes están en [derivatives.json](evidence/media/derivatives.json). La validación HTTP/MIME/Range y reproducción en navegador corresponden a la integración del sitio, no se infieren de la validación FFmpeg.
