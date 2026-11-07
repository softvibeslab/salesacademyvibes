# Sales Academy v5 · Agentes de IA en el día a día

Esta versión reúne los efectos del recorrido cinematográfico y las escenas de una jornada de time share. El mensaje central es **cómo los agentes de inteligencia artificial pueden apoyar la preparación, la consulta del método, la práctica y el acompañamiento del equipo**.

**Estado de entrega:** versión local construida y validada. Pasaron 70 pruebas de módulos y 34 recorridos de navegador. [Validación completa](cp4-validation.md) y [QA visual/funcional](evidence/browser-qa.md).

## Abrir la nueva versión

- [Landing y VSL](http://agentes.localhost:4190/descubre/)
- [Seis escenarios de uso de IA](http://agentes.localhost:4190/growth-assets/scenarios/index.html)
- [Mediahub](http://agentes.localhost:4190/mediahub/)
- [Guía de la jornada con agentes de IA](http://agentes.localhost:4190/mediahub/un-dia-en-la-sala/)
- [CMS de esta versión](http://agentes.localhost:4190/cms/)

Son direcciones locales: requieren que el servidor de esta vista esté activo. La entrega no implica una publicación en el dominio remoto. El acceso al CMS se conserva fuera del código y de los paquetes públicos.

## Qué combina

| Elemento | Resultado en v5 |
|---|---|
| Entrada comercial | Hero enfocado en agentes de IA y una invitación directa a solicitar demo. |
| VSL | Video completo de aproximadamente 33 segundos, destacado al inicio, con controles, subtítulos y reproducción elegida por el visitante. |
| Cinco pilares | Preparar, consultar el método, practicar, acompañar y escalar con el contexto de cada sala. |
| Continuidad visual | Fotografías de escenarios y pantallas reales acompañadas por profundidad y movimiento de scroll. |
| Seis casos cotidianos | Una situación, una pregunta propuesta para el agente de IA y una siguiente decisión humana. |
| Mediahub y CMS | Textos y guía editorial centrados en IA, manteniendo los recursos y el flujo de borrador, vista previa y publicación. |
| Conversión | CTA coherentes a WhatsApp para iniciar la conversación sobre una demo. |

La experiencia conserva la lectura lineal en móvil, sin JavaScript y con movimiento reducido. Se revisaron 31 posiciones sin solapamientos. La carga inicial final es 726 KB sin video; el MP4 se carga al elegir reproducir.

## El video principal

La VSL utiliza el archivo aportado `WhatsApp Video 2026-11-07 at 06.02.39.mp4`, de 32.879 segundos. Se comprobó que es idéntico por SHA256 al archivo 06.01.26 analizado anteriormente. La web reutiliza el derivado [smart-agent.mp4](../../../growth/site/assets/films/smart-agent.mp4), con [subtítulos](../../../growth/site/assets/films/smart-agent.es.vtt) y [transcripción](../../../growth/site/assets/films/smart-agent.es.txt).

La pieza presenta la visión de Sales Academy y termina invitando a agendar una demo. La landing conecta ese cierre con WhatsApp. Se conserva la distinción entre la visión del video y las funciones observadas en las capturas; no se presenta una nueva película producida.

## Seis momentos con IA

| Hora ficticia | Situación | Apoyo que se propone explorar |
|---|---|---|
|08:45|Llegar con una intención|Preparar una pregunta abierta para trabajar una habilidad.|
|09:10|Preparar el tour|Ordenar preguntas para comprender la forma de viajar de los huéspedes.|
|10:10|Entender antes de proponer|Aclarar qué falta comprender antes de explicar una opción.|
|12:20|Practicar una duda|Ensayar una pregunta de clarificación con el equipo.|
|15:30|Conversar con el líder|Ordenar una reflexión y acordar una conducta observable.|
|16:30|Cerrar con el siguiente paso|Convertir la reflexión en una práctica para mañana.|

Ana, Jorge, Elena y Diego, los horarios y los diálogos son ficticios. Las preguntas al agente se rotulan como propuestas editoriales y permanecen fuera de las capturas. No se dibujan respuestas dentro de la interfaz para simular una ejecución que no ocurrió.

Se reutilizan 15 capturas reales y 3 fotografías ilustrativas generadas. Las pantallas conservan sus datos de ejemplo; las fotografías no son testimonios ni evidencia de una implementación. La galería permite abrir las capturas completas y descargar composiciones de los casos.

## Solicitar una demo por WhatsApp

Destino indicado por el usuario: **+52 984 316 3268**.

[Abrir el mensaje para solicitar una demo](https://wa.me/529843163268?text=Hola%2C%20quiero%20conocer%20los%20agentes%20de%20IA%20de%20Sales%20Academy%20y%20agendar%20una%20demo%20para%20mi%20sala%20de%20ventas.)

Texto preparado:

> Hola, quiero conocer los agentes de IA de Sales Academy y agendar una demo para mi sala de ventas.

El visitante abre WhatsApp, revisa el mensaje y decide enviarlo. El enlace no envía automáticamente ni confirma una cita. La fecha y el alcance de la demo se acuerdan en la conversación.

## Paquetes de entrega

- [Sitio, CMS, contenido y evidencia v5](../../../growth/dist/salesacademy-ai-vsl-v5.zip)
- [Kit de escenarios e imágenes con enfoque IA](../../../growth/dist/salesacademy-escenarios-ia-v5.zip)
- [Archivos de la galería](../../../growth/site/assets/scenarios/)

El sitio completo incluye fuente y materiales públicos; las cuentas, sesiones y datos privados del CMS se mantienen fuera de la distribución. El kit visual facilita reutilizar los screenshots y las seis composiciones actualizadas en una presentación. El acceso individual del CMS local está en `/private/tmp/salesacademy-growth-v5-access.txt`.

## Comparar con las versiones conservadas

- [V3 · recorrido cinematográfico](http://salesacademy.localhost:4188/descubre/) · [documentación](../2026-11-07-cinematic-journey/README.md)
- [V4 · un día en la sala](http://simulacion.localhost:4189/growth-assets/scenarios/index.html) · [documentación](../2026-11-07-room-scenarios/README.md)

V5 utiliza otro host y estado local para permitir la comparación. Los paquetes previos se conservan; esta entrega no requiere sobrescribir las bases de revisión anteriores.

## Decisiones y evidencia

- [Brief de campaña](campaign-brief.md): mensaje, recorrido y jerarquía de CTA.
- [Análisis y copy](analysis-and-copy.md): propuestas, fuentes y límites editoriales.
- [Contrato del incremento](cp2-spec.md) y [decisión VSL/WhatsApp](adr-001-vsl-whatsapp.md).
- [Validación editorial ejecutada](evidence/narrative-validation.json): contrato válido, transcripciones intactas, capturas preservadas y enlaces estáticos de WhatsApp.
- [Análisis ampliado del video](../2026-11-07-room-scenarios/video-deep-dive.md) e [inventario de la app](../2026-11-07-room-scenarios/app-inventory.md).

El CMS administra los textos y recursos editoriales. La composición animada, el número de campaña y los archivos de galería son configuración y código versionados. Archivar una guía retira su entrada editorial, pero no convierte los assets estáticos en archivos privados.
