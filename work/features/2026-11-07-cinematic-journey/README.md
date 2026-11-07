# Sales Academy v3 · del método a la transformación

La experiencia ya integra los videos aportados, un recorrido continuo de cinco capítulos y casos de uso con interfaces reales. Conserva el diagnóstico, los recursos abiertos y el CMS de Sales Academy.

## Abrir la experiencia

- [Landing con recorrido cinematográfico](http://salesacademy.localhost:4188/descubre/)
- [Las cinco películas](http://salesacademy.localhost:4188/descubre/#historias)
- [Mediahub](http://salesacademy.localhost:4188/mediahub/) · [CMS](http://salesacademy.localhost:4188/cms/) · [acceso privado local](/private/tmp/salesacademy-growth-v3-access.txt)
- [Análisis del recorrido](http://salesacademy.localhost:4188/descubre/analisis/)
- [Comparar v2](http://localhost:4187/descubre/) · [Comparar v1](http://127.0.0.1:4186/descubre/)
- [Código, videos y documentación ZIP](../../../growth/dist/salesacademy-growth-v3.zip)

Son vistas locales. [Instalación y reinicio](../../../growth/README.md). La v3 tiene datos y cuenta independientes; no reemplaza publicaciones editadas en v2 ni la app operativa del dominio público.

## El viaje

| Capítulo | Caso de uso | Interfaz que lo acompaña |
|---|---|---|
| El inicio | Reconocer el punto de partida del equipo | Roadmap, Recursos y Agenda de la demo |
| El método | Elegir una habilidad y preparar la conversación | Roadmap real |
| La práctica | Ensayar con un recurso concreto | Biblioteca de Recursos real |
| El equipo | Acordar una observación y una siguiente acción | Agenda real y guía de coaching |
| La transformación | Compartir el método y preparar un piloto en tres salas | Interfaces de demo y ruta propuesta |

El representante y su equipo son los protagonistas. Sales Academy acompaña; la transformación se cuenta mediante acciones, sin inventar mejoras de ventas ni salas ya desplegadas.

Una sola escena permanece mientras cambia el encuadre, la profundidad y la pantalla del dispositivo. El movimiento se mantiene junto al texto; no lo cruza. El scroll es nativo y admite regresar, saltar capítulos y reducir movimiento. Móvil presenta una lectura secuencial y una colección horizontal de películas; teclado, preferencia del sistema y modo sin JavaScript conservan el contenido.

## Los videos

Se analizaron los seis archivos mediante metadatos, fotogramas distribuidos y transcripción local offline. **06.01.26 y 06.02.39 son idénticos**: se integraron cinco piezas únicas, conservando el vínculo con ambos originales. Los cinco clips mantienen voz y duración completas, con H.264/AAC, faststart, poster WebP, subtítulos VTT y transcripción legible. Son 22.63 MB de video frente a 34.30 MB originales únicos; los cinco posters suman 121 KB. Los originales no cambiaron.

Los videos son piezas conceptuales del proyecto. Las pantallas del recorrido son capturas reales de la demo. Sus mensajes de visión no se presentan como una verificación de funciones, autonomía, disponibilidad o resultados actuales. Los subtítulos se obtuvieron con ASR local y se normalizaron editorialmente; no se afirma una transcripción manual perfecta ni una evaluación de música/efectos.

Los diálogos se reproducen completos cuando el visitante lo decide. La continuidad inspirada en DigitalSpace se construye con cámara visual y capas; no se arrastra la voz adelante y atrás con el scroll. Antes de reproducir no se transfieren cuerpos MP4. Cada player permite pausa, subtítulos y reintento; iniciar otro pausa el anterior.

## Gestión en CMS

En Recursos, abre una película y elige **Video de la colección**. Edita título, texto, formato, audiencia, portada y estado. Guardar crea un borrador; Vista previa lo muestra de forma privada; Publicar cambia la página pública. La portada elegida tiene prioridad sobre el poster original. Las publicaciones anteriores sin videoId se pueden restaurar como borrador.

La colección es un conjunto curado de cinco activos públicos del paquete; archivar retira el recurso del sitio, pero no vuelve confidencial el archivo estático. La biblioteca de medios mantiene su soporte de imágenes/PDF; no hay subida general de videos. No se añadió proveedor, dependencia productiva, tabla ni endpoint.

## Análisis y evidencia

- [Análisis de los seis archivos](analysis-videos.md) · [validación de derivados](evidence/media/derivative-validation.json)
- [DigitalSpace: observación y adaptación](referencia-digitalspace.md)
- [Contrato y criterios](cp2-spec.md) · [decisión técnica](adr-001-curated-video.md)
- [Revisión de backend, CMS y reproducción](backend-videos.md)
- [Validación completa y límites](cp4-validation.md)
- [Accesibilidad dirigida](evidence/a11y-v3.md)
- [Revisión visual final](evidence/visual-final.md) · [portada escritorio](evidence/screenshots/final-desktop-start.png) · [móvil](evidence/screenshots/final-mobile-390.png)

La base sigue siendo Sales Academy, del mismo nicho ya inventariado. Se conserva el [inventario v2](../2026-11-07-growth-visual-v2/inventario-delta.md) y se actualiza solo la entrada del catálogo de SoftvibesSites. DigitalSpace aporta un patrón de experiencia; no se incorporaron sus videos, marca, activos ni código. Skills utilizadas: landing-inventory-first, page-cro, epic-design, a11y-audit y code-reviewer, adaptadas al stack y contrato existentes.
