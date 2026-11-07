# Auditoría de insumos · VSL, continuidad y escenarios

Fecha: 7 de noviembre de 2026. Inspección local de lectura; no se enviaron mensajes ni operaciones al producto.

## Video solicitado

El archivo `media/reals/WhatsApp Video 2026-11-07 at 06.02.39.mp4` es **idéntico byte a byte** a `WhatsApp Video 2026-11-07 at 06.01.26.mp4`, ya analizado e integrado como `smart-agent`.

| Elemento | Resultado verificado |
|---|---|
| SHA-256 de ambos originales | `d10f73ebe4566d97eadf098ef96565cda04c478e03fe937fcb5f2d53181cc2b7` |
| Original | 32.879456 segundos; 576×1024; 24fps; H.264 y AAC; 6,862,030 bytes |
| Derivado web existente | 32.879002 segundos; 576×1024; 24fps; H.264 y AAC; 5,549,996 bytes |
| Archivo reutilizable | `growth/site/assets/films/smart-agent.mp4` |
| Equivalentes accesibles | `smart-agent.es.vtt` y `smart-agent.es.txt` existen |
| Procedencia del derivado | Conversión completa H.264 CRF23/AAC96k/faststart documentada en la entrega v3, sin cambiar el original |

[Evidencia de metadatos y hashes](evidence/vsl-media-verification.json). La diferencia de menos de una milésima de segundo entre original y derivado corresponde a la duración reportada tras transcodificación; no se recortó la película. No es necesario generar otro video para destacar el archivo solicitado.

La transcripción existente termina en «Agenda una demo». La voz presenta al agente como apoyo al proceso, conocimiento y guía; el montaje incluye SMART y Roleplay Live como visión del producto. Es coherente usarlo como VSL de aproximadamente 33 segundos y acompañarlo por la invitación a solicitar una demostración. La etiqueta de contexto debe explicar brevemente que el video presenta una visión y que la demo permite revisar el alcance disponible; no convertir el render de una llamada o una hoja SMART en prueba de funcionalidad ya conectada.

## Referencias inspeccionadas en navegador

Ambas referencias respondieron **200**. Se usó Chromium con viewport1440×1000 y390×844; todos los métodos distintos de GET/HEAD se bloquearon preventivamente. No se intentaron escrituras, no hubo errores JavaScript y no se solicitó ningún MP4 antes de reproducir.

| Referencia | Lo observado | Qué conviene conservar |
|---|---|---|
| `http://salesacademy.localhost:4188/descubre/` |5 capítulos; escena persistente; dispositivo que cambia de interfaz; cinco videos completos al final; botón Reducir movimiento; anclas activas por scroll | Profundidad limitada, continuidad de la escena y capítulo activo; mantener espacio fijo entre texto y dispositivo |
| `http://simulacion.localhost:4189/growth-assets/scenarios/index.html` |6 situaciones; foto de sala + captura intacta + diálogo; índice por anclas; catálogo15capturas; ningún reproductor | Contexto humano, lectura de situación→acción→decisión, separación clara de fotografía generada y captura real |

[Inspección y estados](evidence/references-inspection.json), [inicio v3](evidence/v3-overview-desktop.png), [práctica v3](evidence/v3-practice-stage.png), [práctica v4](evidence/v4-practice-scene.png), [móvil v3](evidence/v3-overview-mobile.png), [móvil v4](evidence/v4-overview-mobile.png).

La principal discontinuidad actual es que el visitante recorre primero varios capítulos abstractos y encuentra las escenas humanas en otra página. Integrar las fotos de preparación/conversación/coaching en la misma escena animada une las referencias sin exigir otra experiencia distinta. El video destacado debe poder encontrarse antes de recorrer toda la landing.

La banda de consentimiento está fija abajo y ocupa parte del primer viewport de v3. La VSL y su CTA deben seguir accesibles incluso mientras está visible; no ubicar el único botón de demo debajo de esa banda ni detrás de un control decorativo.

## Condiciones de integración recomendadas

- Reutilizar el `videoId: smart-agent` desde el documento publicado. Si se usa en el hero, excluirlo de la colección inferior para que la página mantenga una sola instancia de esa película.
- Conservar `controls`, `playsinline`, `preload=none`, pista española y texto equivalente. El scroll no debe iniciar transferencia del MP4 ni sonido. El CTA funciona antes y después de ver el video; no es necesario terminarlo para solicitar demo.
- Las fotos de escenarios son fondos/contexto; las capturas siguen intactas y separadas de las frases simuladas del agente. No dibujar respuestas generadas sobre los PNG reales como si se hubieran obtenido de la aplicación.
- El WhatsApp solicitado se representa mediante un enlace explícito al número internacional **529843163268** y texto previamente codificado para solicitar demo. No se envía mensaje automáticamente, no se crea una cita al pulsar y no se incorporan datos del diagnóstico al mensaje.
- La validación del CTA debe verificar número, texto decodificado, nombre accesible y comportamiento sin JS. Se puede interceptar/cancelar la navegación del enlace en QA; no hace falta abrir una conversación real ni enviar nada.
- No añadir un SDK de WhatsApp o un iframe externo: un enlace convencional mantiene el contacto por elección y evita conexión de terceros antes de pulsar.

## Pruebas existentes y cambios que necesitan contrato explícito

`growth/tests/cinematic.mjs` verifica cinco capítulos y un único escenario persistente, actualización ida/vuelta, preferencias de movimiento, cinco reproductores con captions, reproducción/pausa por teclado, ausencia de descarga automática, móvil/sinJS y existencia de `#demo-form` con POST.

| Verificación | Tratamiento propuesto |
|---|---|
|5 capítulos e IDs start/method/practice/coaching/scale | Puede conservarse mientras el significado editorial se centra en los agentes de IA y las escenas humanas |
| Una sola escena persistente | Conservar y ampliar con fotos; probar que los cambios de foto/interfaz ocurren sin cubrir texto |
|5 reproductores | Conservar si hay1VSL arriba y4clips abajo. Si CP2 decide retirar el rail, actualizar la expectativa por el contrato, no para ocultar un fallo |
| `#demo-form` POST | Si el nuevo CTA sustituye el formulario por WhatsApp, declarar la sustitución en CP2 y cambiar la prueba por enlaces salientes voluntarios. Si el formulario permanece como alternativa, conservar la prueba |
| Movimiento reducido/móvil/sinJS | Mantener contenido, video manual y CTA en los tres modos; sin scroll capturado |
| CMS draft/publish/archive | La VSL respeta el estado del recurso; no dejar una instancia hardcoded que revele un clip editorial retirado |

`growth/tests/quality-browser.mjs` limita actualmente la suma de todos los assets referenciados a500KB. Al añadir fotos y más screenshots, esa suma aumenta aunque haya carga diferida. Conviene fijar en CP2 un presupuesto claro de **transferencia inicial medida** y reportar por separado los assets diferidos y los5.55MB del MP4 VSL. No presentar el atributo lazy como evidencia de transferencia evitada sin medir requests.

La inspección de referencias no ejecuta la aceptación de la nueva versión: sus capturas y resultados describen exclusivamente v3/v4. La evidencia nueva de implementación debe registrarse por separado.
