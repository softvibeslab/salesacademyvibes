# Sales Academy · Un día en la sala

La visión del video se convierte en **seis situaciones cotidianas de una sala de time share**, acompañadas por pantallas reales de Sales Academy. Ana y Jorge recorren una jornada ficticia: preparan una intención, escuchan a los huéspedes, ensayan una respuesta y acuerdan qué practicar después.

[Abrir la experiencia local](http://simulacion.localhost:4189/growth-assets/scenarios/index.html) · [Descargar solo imágenes](../../../growth/dist/salesacademy-screenshots-y-simulaciones.zip) · [Paquete completo v4](../../../growth/dist/salesacademy-room-scenarios-v4.zip)

La vista previa está activa localmente. La URL requiere que el servidor de esta demo siga abierto; no es una publicación en el dominio remoto. El ZIP contiene fuente, imágenes y evidencia; la [validación final](cp4-validation.md) documenta las comprobaciones ejecutadas.

## Qué contiene

| Pieza | Cantidad | Qué muestra |
|---|---:|---|
| Capturas reales | **15** | 12 pantallas móviles de 390×844 y 3 de escritorio de 1240×900 tomadas de la demo publicada. Conservan su interfaz y datos de ejemplo. |
| Escenarios de uso | **6** | Una acción concreta de la app, un diálogo ficticio y una siguiente decisión humana por momento de la jornada. |
| Fotografías ilustrativas con IA | **3** | Preparación, conversación con huéspedes y coaching en una sala costera ficticia; no son fotografías de una implementación o de clientes. |
| Composiciones de la experiencia | **6** | Combinan contexto ilustrativo, captura real y relato con etiquetas distintas. Una composición no se presenta como screenshot íntegro de la app. |
| Análisis detallado del video | **1** | Lectura por planos de los 32.88 segundos, con 32 nuevos fotogramas, dos hojas de contacto y correspondencia con funciones observadas. |
| Guion para un video futuro | **1** | [Lista de tomas](shot-list.md) para una pieza con sensación de recorrido continuo. Es una propuesta de producción; esta entrega no contiene un nuevo video filmado o generado. |

Las fotos fuente están en [assets/generated](assets/generated/); las instrucciones de generación se conservan en [image-prompts.json](image-prompts.json). Las pantallas originales, su procedencia y sus límites están documentados en el [inventario de la app](app-inventory.md).

## La jornada en seis acciones

Las horas son una propuesta narrativa, no un horario recomendado para la industria. Ana, Jorge, Elena y Diego son personajes ficticios. Los nombres o números que ya contiene una captura pertenecen a los datos de ejemplo de la demo; no son registros creados para este relato.

| Hora propuesta | Situación | Acción en pantalla | Siguiente decisión |
|---|---|---|---|
| **08:45** | Llegar con una intención | Consultar Hoy y Meta del mes. | Elegir una pregunta abierta para practicar. |
| **09:10** | Preparar antes de presentar | Revisar Preparar mi tour y el Roadmap. | Empezar por entender cómo quieren viajar los huéspedes. |
| **10:10** | Entender antes de proponer | Consultar el paso de descubrimiento. | Aclarar necesidades y revisar información confirmada. |
| **12:20** | Practicar una duda concreta | Abrir la plantilla Practicar objeción. | Ensayar una pregunta de clarificación con Jorge. |
| **15:30** | Convertir observación en coaching | Revisar Después del tour; usar el tablero de sala como contexto operativo cuando corresponda. | Acordar un ajuste observable para la siguiente práctica. |
| **16:30** | Cerrar con el siguiente paso | Volver al Roadmap y consultar el progreso de ejemplo. | Conservar una reflexión y preparar la práctica de mañana. |

Los diálogos completos y las indicaciones visuales están en el [análisis ampliado](video-deep-dive.md); el [storyboard estructurado](evidence/video/scenario-storyboard.json) facilita reutilizarlos en diseño y contenido.

## Lo que aprendimos al mirar más de cerca

El montaje original cuenta **guía → objetivo → práctica → visibilidad**. El salto que faltaba era mostrar qué hace una persona entre mirar una pantalla y tener una conversación. Por eso cada escenario une **situación → consulta real → siguiente decisión**.

El Roadmap, la preparación del tour, las plantillas de objeciones y el tablero operativo sí tienen pantallas observables. La interfaz SMART/GoalSheet y la llamada Roleplay Live del video no aparecieron como funciones equivalentes en las rutas inspeccionadas. En la experiencia se utilizan **Meta del mes** y **Practicar objeción** con su alcance real; los diálogos se identifican como simulaciones.

La transformación se cuenta mediante hábitos de trabajo: escuchar, preguntar, preparar y revisar con el líder. Los montos, porcentajes y curvas del video o de la demo no se convierten en resultados atribuidos al producto. Las escenas tampoco acreditan que ya se haya realizado una implementación operativa en tres salas.

## Cómo reconocer cada tipo de imagen

- **Captura de la demo:** pantalla obtenida del sitio real; se puede consultar su PNG original y el estado observado en el inventario.
- **Escena ilustrativa generada:** contexto fotográfico creado con IA, con personas ficticias y sin interfaz inventada presentada como producto.
- **Simulación de uso:** diálogo, horario y decisión propuestos para explicar un caso cotidiano.
- **Visión del producto:** representación conceptual que aparece en el video original y que se contrasta con la app disponible.

La composición mantiene las capturas separadas de los textos narrativos. Así puedes reconocer la interfaz real y, a la vez, imaginar cómo usarla durante una jornada.

## Mediahub y CMS

La guía **Un día en la sala** utiliza el contrato editorial existente: sus textos, tablas, estado y medios registrados se administran en el CMS. La experiencia visual y sus seis composiciones viven como archivos versionados en [growth/site/assets/scenarios](../../../growth/site/assets/scenarios/).

El CMS edita la guía; no es un editor visual de esas composiciones. Cambiar una imagen, el diseño de la escena o su inventario estático requiere actualizar los archivos de la experiencia. Archivar la guía retira su publicación editorial, pero no borra automáticamente los assets públicos. La [decisión técnica](adr-001-static-gallery.md) explica esta separación.

## Evidencia disponible

La inspección de la app se realizó en lectura: no se enviaron mensajes, registraron ventas, asignaron tours ni guardaron metas para conseguir screenshots. El [resultado de capturas](evidence/app/validation.json) verifica las 15 dimensiones y sus hashes; el [manifiesto](evidence/app/capture-manifest.json) conserva procedencia y estado.

El [control del análisis](evidence/video/analysis-check.json) confirma seis escenarios, 32 fotogramas y el hash original del video sin cambios. Pasaron 65 pruebas de módulos y 26 recorridos de navegador, incluida la galería en móvil, sin JavaScript y con movimiento reducido. La [revisión independiente](evidence/review.md) no deja bloqueantes; las [seis composiciones](evidence/compositions.json) se exportaron a 1600×1000.

La guía está en el [mediahub local](http://simulacion.localhost:4189/mediahub/un-dia-en-la-sala/), y la [landing](http://simulacion.localhost:4189/descubre/) incorpora el nuevo acceso. El [CMS local](http://simulacion.localhost:4189/cms/) usa una base separada de v3; su acceso privado está guardado fuera del proyecto en `/private/tmp/salesacademy-growth-v4-access.txt`.

Para continuar la producción audiovisual, la [lista de tomas](shot-list.md) propone un recorrido de 72 segundos inspirado en estas seis escenas y conserva la distinción entre material disponible y trabajo futuro.
