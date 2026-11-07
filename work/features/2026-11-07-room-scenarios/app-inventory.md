# Inventario de pantallas reales de Sales Academy

Fecha de consulta: 7 de noviembre de 2026. Fuente: https://salesacademy.softvibes.art/ y su enlace público https://salesacademy.softvibes.art/ops/.

Se entregan **12 capturas móviles de 390 × 844 y 3 de escritorio de 1240 × 900**, tomadas en Chromium con escala 1. Son capturas del viewport de la demo publicada, sin añadir mensajes, datos, marcos ni UI inventada. Los escenarios de sala, actores y horarios narrativos deben presentarse fuera de estas imágenes como simulaciones. La fecha del contenido de ejemplo es viernes 6 de noviembre, aunque la consulta se realizó el día 7.

## Trazabilidad y reproducción

- [Manifiesto](evidence/app/capture-manifest.json): URL, estado, secuencia de selectores observados, viewport, contexto, SHA-256, tamaño de cada PNG y solicitudes bloqueadas.
- Cada PNG tiene un archivo hermano `.dom.json` con texto nativo de la página, controles y contenido de iframe.
- [Script de captura](evidence/app/capture-readonly.cjs): abre contextos aislados y permite solo GET/HEAD. No simula respuestas del servidor.
- [Validación](evidence/app/validation.json): 15/15 dimensiones correctas y hashes coincidentes; 0 solicitudes de escritura intentadas en la captura final.
- [Hoja de contacto](evidence/app/contact-sheet-review.jpg): solo índice visual de revisión; los archivos PNG son la evidencia original.
- Skill aplicada: `browser-automation`, para navegación con selectores observados, captura y limpieza de contextos. No se aplicaron técnicas de evasión ni se usaron sesiones privadas.

Reproducción desde la raíz del producto: `node work/features/2026-11-07-room-scenarios/evidence/app/capture-readonly.cjs`. El script utiliza Playwright ya instalado en `vcsAcademyMobile/node_modules`; `PLAYWRIGHT_MODULE` permite indicar otra instalación. `CAPTURE_IDS=12-copilot-mobile` repite una captura conservando el manifiesto existente.

## Capturas

| Archivo | Pantalla | Tamaño | Estado observado y alcance |
|---|---|---|---|
| [01-today-mobile.png](evidence/app/01-today-mobile.png) | Home: jornada de sala | 390 × 844 | Vista inicial; Ana, Sala Norte; la propia app presenta metas de ejemplo. |
| [02-calendar-mobile.png](evidence/app/02-calendar-mobile.png) | Calendario de tours | 390 × 844 | Calendario visible de Ana sin cambiar fechas ni tours. |
| [03-roadmap-mobile.png](evidence/app/03-roadmap-mobile.png) | Roadmap: 11 pasos | 390 × 844 | Progreso de ejemplo:4 de11módulos. |
| [04-discovery-mobile.png](evidence/app/04-discovery-mobile.png) | Paso4: Descubrimiento | 390 × 844 | Guion y checklist reales; no se ejecuta el paso en Copiloto. |
| [05-negotiation-mobile.png](evidence/app/05-negotiation-mobile.png) | Paso10: Precio y negociación | 390 × 844 | Lección de la demo; no se ejecuta ni cambia progreso. |
| [06-tour-preparation-mobile.png](evidence/app/06-tour-preparation-mobile.png) | Preparar mi tour | 390 × 844 | Plantilla con ejemplo nativo: una pareja de jubilados. No se envía. |
| [07-objection-practice-mobile.png](evidence/app/07-objection-practice-mobile.png) | Practicar objeción | 390 × 844 | Vista previa nativa: tiempo. No se genera respuesta ni se envía al manager. |
| [08-price-objection-mobile.png](evidence/app/08-price-objection-mobile.png) | Biblioteca: objeción de dinero | 390 × 844 | Guion de ejemplo ya publicado. No se consulta al Copiloto. |
| [09-after-tour-mobile.png](evidence/app/09-after-tour-mobile.png) | Después del tour | 390 × 844 | Plantilla visible; no es un reporte generado ni feedback de un tour real. |
| [10-monthly-goal-mobile.png](evidence/app/10-monthly-goal-mobile.png) | Meta del mes | 390 × 844 | Valor de ejemplo nativo60000; no se edita ni guarda. No es una hojaSMART. |
| [11-weekly-progress-mobile.png](evidence/app/11-weekly-progress-mobile.png) | Perfil: esta semana | 390 × 844 | Cambio de filtro visual semanal; cifras demostrativas, no resultados de implementación. |
| [12-copilot-mobile.png](evidence/app/12-copilot-mobile.png) | Copiloto: pantalla inicial | 390 × 844 | Chat visible en estado inicial, sin escribir ni enviar mensajes. SalaS1, rolRep por defecto. |
| [13-today-desktop.png](evidence/app/13-today-desktop.png) | Home en escritorio | 1240 × 900 | Layout real al ampliar viewport; no se rediseñó para escritorio. |
| [14-roadmap-desktop.png](evidence/app/14-roadmap-desktop.png) | Roadmap en escritorio | 1240 × 900 | Layout real al ampliar viewport. |
| [15-room-board-desktop.png](evidence/app / 15-room-board-desktop.png) | Tablero de sala: jefe de sala | 1240 × 900 | Vista pública inicial de jefe de sala; ninguna acción de asignar, editar, quitar o resultado. |

## Qué existe y qué no se verificó

| Capacidad | Evidencia real | Cómo presentarla |
|---|---|---|
| Preparar jornada y consultar tours | Home y Calendario; tres tours de Ana con estados y sin resultado | Organización diaria demostrativa. No atribuir cierres o ventas a esta implementación. |
| Aprender venta consultiva | Roadmap de 11 pasos, progreso de ejemplo 4/11, guiones, errores y checklist | Aprendizaje en contexto y consulta de una lección. |
| Preparar perfil del visitante | Plantilla SK-14 con perfil nativo “una pareja de jubilados” | Preparación del tour. La vista previa no generó un plan en esta captura. |
| Consultar objeciones | Biblioteca LIB-02 con guion de sala; SK-13 con vista previa de objeción de tiempo | Consulta y preparación de práctica. No se capturó una conversación ni una evaluación generada. |
| Retroalimentación tras un tour | Plantilla SK-15 “Después del tour” | Punto de entrada para reflexionar. No representa un informe real generado. |
| Meta mensual | SK-09 con ejemplo $60,000 y campo Meta | Meta de volumen. No equiparar a una hojaSMART con todos sus criterios. |
| Progreso individual | Perfil → Esta semana, marcado “Sala de ejemplo” | Indicadores de demo, no evidencia de mejora atribuible al producto. |
| Copiloto | Saludo automático real de la sala S1 y compositor | Interfaz inicial. No se enviaron mensajes ni se validó respuesta a consultas. |
| Operación de jefe de sala | Enlace real Calendario → Abrir tablero de sala → `/ops/`; columnas Ana/Luis | Tablero operativo visible. No se ejecutaron sus acciones ni se verificó el ciclo de escritura. |
| SMART / GoalSheet del video | No observado en las rutas accesibles inspeccionadas | Concepto pendiente de contraste; no afirmar disponibilidad por nombres en código local. |
| RoleplayLive / simulación en vivo | No observado como pantalla o sesión ejecutable en este recorrido | Escena conceptual de práctica acompañada por la plantilla real. |
| Analítica del líder sobre coaching | Existe ficha SK-18 “Sala del manager”, con texto de ranking y acceso solo manager/admin; no se ejecutó | No mostrar un ranking o feedback inventado como screenshot real. El tablero `/ops/` confirma asignación visual de tours, no esa analítica. |
| Tres salas | El Copiloto expone selector S1/S2/S3; el tablero operativo usa Sala Norte/Sala Sur | No declarar una implementación operativa de 3 salas ya validada. Capturamos estados por defecto, no sincronización entre salas. |

## Seis escenarios cotidianos que las capturas pueden sostener

Todos estos escenarios son **propuestos y ficticios**. Ningún resultado comercial se presenta como hecho.

| Momento simulado | Captura primaria | Apoyo | Límite del relato |
|---|---|---|---|
| 1. Antes de abrir: consultar agenda y foco del día |01-today-mobile |02-calendar-mobile  / 15-room-board-desktop | El líder revisa las asignaciones visibles; no se simula una asignación real sobre el servidor. |
| 2. Antes de recibir una pareja: preparar preguntas |06-tour-preparation-mobile |04-discovery-mobile | Los rasgos del visitante son ficticios; no hay datos personales reales. |
| 3. En mesa: escuchar necesidades antes de presentar |04-discovery-mobile |03-roadmap-mobile | Se ilustra consulta de guion y checklist, sin fingir transcripción o diagnóstico automatizado. |
| 4. Ante “está muy caro”: consultar el recurso |08-price-objection-mobile |05-negotiation-mobile | La conversación externa es simulada; el guion visible es el publicado por la demo. |
| 5. Después del tour: revisar y practicar con el líder |09-after-tour-mobile |07-objection-practice-mobile | No equivale a RoleplayLive ni a feedback generado; se muestra el acceso a la práctica. |
| 6. Al cerrar el día: revisar avance y siguiente objetivo |11-weekly-progress-mobile |10-monthly-goal-mobile | Datos de ejemplo nativos. No convertir $34,500, 29% o $60,000 en promesas de rendimiento. |

## Procedencia de los datos de ejemplo

La app etiqueta explícitamente “Metas de ejemplo”, “Sala de ejemplo”, “Ejemplo de volumen”, “Guion de la sala de ejemplo” y “El recorrido de la venta consultiva. Ejemplo de sala”.

El tablero `/ops/` no repite esa etiqueta en su cabecera, por lo que se comprobó su correspondencia exacta con el fixture local antes de capturarlo:

- `prototypes/smart-agenda-mockup/ops-store.js:11` declara `EXAMPLE_LEADS` y `defaultOps()` con Jorge, Rosa, Ana, Luis, Mira y Teo, Sala Norte/Sur y los mismos horarios/identificadores visibles.
- `prototypes/smart-agenda-mockup/server/ops_api.py:79` define `seed()` con esos mismos registros; las cuatro tarjetas visibles coinciden en representante, hora, identificador y nota.
- No aparecen correos, teléfonos, apellidos ni nombres reales de invitados en las capturas. Los leads tienen identificadores del fixture (`Lead #4920`, etc.).

No se restauró el ejemplo, cambió de rol, asignó, editó, quitó, registró un resultado ni envió una consulta. La protección de red habría abortado métodos distintos de GET/HEAD; no hubo intentos de esos métodos en el lote final.

## Observaciones de UX de la demo

- Home y Roadmap en 1240 px conservan una columna centrada de aproximadamente 560 px. El tablero `/ops/` sí usa dos columnas amplias. Las capturas de escritorio documentan ese comportamiento real.
- Los módulos4 y10 incluyen un bloque de video nativo negro del iframe de YouTube; su reproducción no se verificó. Para una pieza principal conviene preferir Roadmap o las fichas de recursos y conservar estas lecciones como evidencia de guion.
- En el Copiloto embebido, el botón flotante + se superpone parcialmente al botón Enviar a 390 px. Se conservó tal cual; el screenshot no maquilla ese detalle.
- Home inicia con contadores 0 y Perfil semanal contiene valores de ejemplo independientes. Son estados demostrativos, no una cronología conectada de resultados reales.
- La captura de Copiloto espera el saludo ya renderizado para evitar conservar un iframe aún en carga; no se escribió texto en el compositor.

## Validación

Excepción TDD: este alcance produce documentación y evidencias visuales mediante lectura de una demo; no cambia código productivo, contratos ni datos del sitio. Validación ejecutada: lectura de UI y DOM, comprobación de procedencia de datos, revisión visual de las 12 capturas móviles y las 3 de escritorio, dimensiones exactas, hashes y ausencia de solicitudes de escritura. Los límites observados quedan documentados arriba.
