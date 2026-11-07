# CP5 · Cierre

Estado: completado y publicado el 7 de noviembre de 2026.

## Entrega

- V5: https://v5.salesacademy.softvibes.cloud/descubre/.
- CMS: https://v5.salesacademy.softvibes.cloud/cms/ → Asesor IA (owner).
- Widget también en MediaHub, diagnóstico y galería de escenarios.
- Perfil sales-academy-advisor en Hermes con conocimiento publicado, conversación aislada, límites y recuperación.
- Solicitud editable para Chris por WhatsApp529843163268; horario y zona preferidos, siempre pendiente de confirmación. Guardado para seguimiento opcional y consentido.
- El agente recomienda recursos reales; el recurso citado por nombre precede las coincidencias generales.

## Validación

83 pruebas Python,18 Node,18 navegador local,5 integración Flask/SQLite y12 navegador público. Smoke Hermes con conversaciones sintéticas aisladas; una consulta pública adicional comprueba la corrección de recomendaciones. Ninguna prueba envió mensajes externos ni guardó prospectos de prueba en producción. Detalle y límites en CP4.

## Operación y reversión

Activo: releases/20261107-advisor-links-06, anterior advisor-05; film-play-04 permite retirar la incorporación completa. Manifiesto SHA256 c40ac742e5d95fd689dfdd4e0a49fbb343eb538c2762759737e2d246bd47a3a9.

Runbooks: growth/deploy/versions/README.md y growth/deploy/advisor/README.md. Credenciales permanecen exclusivamente en VPS. No se accedió ni transfirió el archivo de accesos CMS. Estado editorial conservado, nuevas tablas aditivas y copia previa privada solo VPS. Retención cada5min: sesiones caducadas1h, solicitudes90d sin actividad.

## Límites intencionales

Chris confirma la demo por WhatsApp; no hay reservas automáticas ni campañas de seguimiento. Precios, condiciones e integraciones no documentadas se derivan a Chris. El guardado voluntario solo habilita seguimiento de la solicitud. La inferencia usa el proveedor existente y tiene límites de consumo; el enlace WhatsApp sigue disponible ante indisponibilidad.

## Memoria

La revisión detectó y resolvió persistencia incidental de Hermes con hogares efímeros por solicitud, carreras de reintento, recursos omitidos del contexto, colisión con VSL y reintroducción de datos eliminados del resumen. Pruebas y fallos originales se preservan. Un fallo de espacio local se resolvió reconstruyendo el entorno temporal y repitiendo la suite, sin ocultar el resultado fallido.
