# CP0 · Intake

**Estado:** CP2 v1 aprobado; implementación local construida y validación integrada completada.
**Historia:** work/stories/2026-11-07-growth-mediahub.md
**Readiness:** LISTA, según expediente HU-SA-GROWTH-001 y aprobación registrada en su sección 22.
**Fecha:** 2026-11-07

Solicitud: crear landing, análisis, embudo invisible y mediahub con CMS para Sales Academy, aplicando patrones de SoftvibesSites y considerando la implementación en tres salas.

Áreas: Producto/Marketing, Frontend, Backend, Datos, QA, Seguridad y DevOps. Agente: Codex; no se depende de otro IDE. No se encontró `project-profile.local.yml` en SalesAcademyVibes ni `.ecosystem360` instalada. El módulo incluye `growth/project-profile.example.yml` con runtime y comandos reales; ese archivo no declara una instalación del harness.

**Aprobación citable:** «si lo apruebo contruye lis artefactis» — Roger, responsable del proyecto / Product Owner, conversación Codex del 2026-11-07, después de presentar la v1 y CP2. Autoriza construir los artefactos y la implementación local. El mensaje anterior «sigue» no se usa como sustituto de esa aprobación.

Entrega construida en `growth/`: landing, análisis público de la propuesta, mediahub con tres recursos, diagnóstico sin registro, CMS autenticado, biblioteca de medios, recepción local de solicitudes, versiones y respaldo/restauración. El análisis se sirve en `/descubre/analisis/` con `X-Robots-Tag: noindex, nofollow`. El expediente conserva investigación, inventario y decisiones en este producto. No se modifica el paquete Ecosistema 360 ni los clientes fuente.

La implementación conserva separadas las rutas y los datos operativos; el recorrido de tres salas sigue identificado como propuesta. No se ha desplegado en el dominio público. Las pruebas de módulos tienen evidencia RED/GREEN; la ejecución E2E completa del CMS y el cierre local CP4/CP5 tienen evidencia en sus documentos.

Trazabilidad: [historia LISTA](../../stories/2026-11-07-growth-mediahub.md), [CP2](cp2-spec.md), [ADR-001](adr-001-editorial-separation.md) y [plan con rutas reales](cp3-implementation-plan.md). La evidencia histórica anterior a la aprobación no sustituye la comprobación de cierre del estado actual.
