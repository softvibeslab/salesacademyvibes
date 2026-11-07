# Sales Academy · landing, embudo, mediahub y CMS

**7 de noviembre de 2026 · v1 implementada y comprobada localmente.**

Roger aprobó el paquete y el CP2 con «si lo apruebo contruye lis artefactis». La historia está LISTA. Se construyeron los artefactos y se verificaron con 36 pruebas Python, 7 pruebas JavaScript y 15 recorridos de navegador, todos correctos.

## Abrir la entrega

| Entregable | Enlace local |
|---|---|
| Landing comercial | [Abrir landing](http://127.0.0.1:4186/descubre/) |
| Análisis visual | [Abrir análisis](http://127.0.0.1:4186/descubre/analisis/) |
| Diagnóstico de seis preguntas | [Diagnosticar](http://127.0.0.1:4186/descubre/diagnostico/) |
| Mediahub y tres recursos completos | [Abrir mediahub](http://127.0.0.1:4186/mediahub/) |
| CMS con usuarios y permisos | [Abrir CMS](http://127.0.0.1:4186/cms/) |
| Código, instalación y operación | [Manual](../../../growth/README.md) |
| Paquete de fuentes y documentación | [ZIP](../../../growth/dist/salesacademy-growth-v1.zip) |

La vista local usa el puerto 4186. En esta sesión el acceso del propietario está en `/private/tmp/salesacademy-growth-access.txt`, fuera del repositorio y del paquete, con permisos 0600. Los datos de revisión están en `/private/tmp/salesacademy-growth-preview`; el manual explica cómo configurar almacenamiento persistente. No hay contraseña predeterminada.

## Qué quedó construido

El recorrido aporta recursos antes de solicitar contacto: landing → recurso abierto → diagnóstico → recomendación → solicitud voluntaria. El diagnóstico no envía respuestas; la medición opcional exige permiso. El formulario conserva por separado la elección de recibir novedades.

El CMS incluye edición de textos/FAQ/SEO y recursos por bloques, biblioteca de imágenes/PDF, revisión y derechos, cuentas owner/editor, borradores persistentes, preview privada, publicación completa, historial, restauración a borrador, bandeja de solicitudes y métricas agregadas. Se comprueban conflictos de edición, sesiones, CSRF, tipos y tamaño de archivos, referencias públicas y recuperación de datos.

La ruta propuesta para tres salas está diferenciada del despliegue real del piloto, cuya historia sigue en revisión. La captura de Roadmap es de la demostración existente y está identificada como ejemplo. La raíz, `/ops/`, `/copiloto/` y `/api/` del producto existente no se reemplazaron. No se hizo despliegue público, push, envío de mensajes ni compra de servicios.

## Análisis y contenido

- [Análisis y decisión](analisis.md).
- [Landing, embudo, diagnóstico, doce piezas editoriales, tres recursos y cinco correos borrador](landing-y-embudo.md).
- [Inventario de 48 productos/familias](inventario-previo.md) y [complemento](inventario-complementario.md).
- [Historia aprobada](../../stories/2026-11-07-growth-mediahub.md), [CP2](cp2-spec.md), [ADR](adr-001-editorial-separation.md) y [CP3](cp3-implementation-plan.md).
- [Pruebas y TRUST 5](cp4-validation.md), [cierre y límites](cp5-closure.md).

Se aplicaron landing-inventory-first, business-context, page-cro, content-strategy, copywriting, analytics-tracking, email-sequence, playwright-pro, a11y-audit y code-reviewer según su función; enrich/feature y las reglas de Ecosistema 360 estructuraron historia, contrato y evidencia. El índice operativo SoftvibesSites incorpora Sales Academy sin cambiar estados de otros proyectos.

La comprobación CRO histórica sobre el shell de la demo es un insumo limitado; no representa una medición de conversión ni una nota de esta nueva landing. La evidencia final se encuentra en CP4. Los gates de historia, gobierno y calidad se ejecutaron sobre los artefactos reales; no se declara instalado el framework en este producto.
