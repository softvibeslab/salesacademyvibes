# CP5 · Cierre

Estado: completado y publicado el 7 de noviembre de 2026.

## Entrega

[Sales Academy V5](https://v5.salesacademy.softvibes.cloud/descubre/) incorpora el asesor con verde oscuro y dorado de mayor contraste, texto más legible, respuestas breves, hasta tres sugerencias contextuales y dos tarjetas de contenido publicado. Los videos se reproducen dentro del chat con audio y subtítulos. Una respuesta extensa conserva su original en «Ver detalle».

El agente sigue conectado al perfil Hermes sales-academy-advisor. El visitante puede preparar una solicitud y horario preferido para Chris por WhatsApp; Chris confirma la demo. El guardado para seguimiento sigue siendo opcional y consentido.

## Validación

90 pruebas Python, 20 Node, 22 de la nueva experiencia, 18 de regresión original, cinco de integración Flask/SQLite y 14 de navegador público aprobadas. Las dos respuestas reales de Hermes tuvieron 64 y 62 palabras. No se enviaron mensajes ni se guardaron leads de prueba en producción. Detalle y límites en CP4.

## Operación y reversión

Release activo advisor-rich-07; anterior advisor-links-06 conservado. Solo cuatro archivos de V5 y la identidad SOUL cambian, sin migración. 326 archivos de runtime, permisos y servicios verificados.

Para revertir, restaurar las dos SOUL desde la copia privada registrada en deployment.json conservando dueño/modo, apuntar current al release anterior y reiniciar V5. No modificar estados ni credenciales. Runbooks: growth/deploy/versions/README.md y growth/deploy/advisor/README.md.

## Límites

Los videos expresan visión conceptual y conservan su etiqueta. La disponibilidad de modelo sigue sujeta al proveedor existente; el enlace a Chris permanece disponible ante un fallo. Las pruebas de accesibilidad cubren esta mejora y no representan una certificación WCAG completa.
