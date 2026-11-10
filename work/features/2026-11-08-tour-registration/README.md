# Nuevo tour · Sales Academy

Diseño guardado en [Stitch · Interfaz completa](https://stitch.withgoogle.com/projects/16859674583431881734). Ocho pantallas: entrada, foto, revisión, captura manual, resumen, éxito, recuperación y escritorio.

**Estado:** registro privado **activo** en [Sales Academy](https://salesacademy.softvibes.art/). [CP2 v1](cp2-spec.md) aprobado por Roger el 2026-11-10 con «Apruebo v1; implementar»; después autorizó «Crear accesos privados para las cuentas actuales y guardar las claves fuera del sitio». Se verificaron los siete accesos individuales y el smoke privado en producción. Los siete tours existentes se conservaron. Las claves se entregaron en un archivo local privado fuera del repositorio y del sitio, sin imprimirlas.

UAT del recorrido manual, selector de foto, fallback OCR y tamaños 360/390/1440 completada con datos sintéticos. El preview OCR por HTTPS reconoció los cinco campos del fixture sin guardar un tour. Pasan 39 pruebas Python y 21 frontend, además de regresiones e integración. Límites: móvil emulado, sin prueba de cámara física ni corpus representativo de OCR; revisión de backups basada en política estándar y configuración local, sin inventario individual de snapshots. El máximo de 31 días corresponde al almacén activo.

- [Diseño y recorrido](DESIGN-TOUR.md)
- [Contrato aprobado](cp2-spec.md)
- [Historia con criterios y fixtures](../../stories/2026-11-08-tour-registration.md)
- [Plan de implementación y pruebas](cp3-implementation-plan.md)
- [Decisión aceptada de datos y autenticación](ADR-001-private-tour-registration.md)
- [Modelo de amenazas](threat-model.md)
- [Evidencia de pruebas y publicación](cp4-validation.md)
- [Guía del módulo](guia-nuevo-tour.md)
- [Operación del backend](backend-runbook.md)
- [Activación privada y entrega de accesos](activation-runbook.md)
- [UAT final del navegador](evidence/uat-browser-final.md)
- [Evidencia de activación](evidence/activation-private.json)
- [Smoke HTTPS final y OCR](evidence/https-final-smoke.json)
- [Estado de entrega y límites](cp5-closure.md)
- `stitch/tour-01.html` a `tour-08.html`: exportaciones visuales, sin backend.

El lienzo final verificado tiene 64 nodos y conserva los 54 iniciales y los KPIs que el usuario actualizó simultáneamente. Las ocho pantallas se copiaron a instancias nuevas para unir las ediciones; sus HTML coinciden exactamente con la revisión refinada. IDs actuales en `evidence/screens-final.json`.
