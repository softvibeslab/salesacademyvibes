# ADR-001 · Galería versionada y guía editorial

Estado: aceptada para este incremento autorizado. Fecha:2026-11-07.

La guía narrativa cabe en el contrato CMS actual. Una galería de fotografías y capturas con composición fija no necesita ampliar bloques ni aceptar HTML arbitrario. Se entrega una página estática en el prefijo de assets existente y una guía CMS que la enlaza por id room-day. Así se reutilizan publicación y revisiones sin nuevas tablas o permisos.

Las imágenes y el HTML estáticos son públicos cuando se sirve el paquete: archivar la guía retira su entrada editorial, no protege ni borra esos assets. El CMS edita la guía, no la composición de las seis escenas. Se documenta esta diferencia en la entrega. Descartado ampliar el CMS o crear una simulación de backend para una tarea de contenido y diseño.
