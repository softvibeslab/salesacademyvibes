# CP1 · Contexto y necesidades

**Estado:** Necesidades de CP2 v1 aprobadas e implementadas localmente; validación integrada completada.
**Historia:** work/stories/2026-11-07-growth-mediahub.md — HU-SA-GROWTH-001, Readiness LISTA.
**Aprobación:** «si lo apruebo contruye lis artefactis» — Roger, Product Owner, conversación Codex del 2026-11-07.

NEED-01: un visitante debe entender la propuesta antes de entrar al demo.
NEED-02: recursos y diagnóstico deben aportar valor sin captura forzada.
NEED-03: el equipo debe editar y publicar contenido con permisos e historial.
NEED-04: la expansión a tres salas requiere etapas y evidencia; no afirmar adopción que no consta.
NEED-05: conservar rutas y aislar datos operativos de editoriales.

Contexto del levantamiento: branch `feat/sala-tours-sync`, commit `b101bc0`; `docs/status.md` y `ficha-ejecutiva.md` de 2026-11-07. Es una referencia histórica del análisis, no una afirmación sobre el HEAD actual. El sitio raíz era el shell de la demo cargado por JavaScript. Nicho confirmado: salas comerciales de clubes vacacionales. El público prioritario B2B y los contenidos para líderes y representantes forman parte de la v1 aprobada.

## Necesidades y respuesta construida

| Necesidad | Implementación local | Criterios |
|---|---|---|
| NEED-01 | Landing renderizada en servidor en `/descubre/`, acceso a la demo existente y reporte público en `/descubre/analisis/` marcado noindex | AC-01, AC-02 |
| NEED-02 | Mediahub, tres recursos completos con descarga Markdown y diagnóstico de seis preguntas; solicitud voluntaria con consentimientos separados | AC-03, AC-04, AC-05, AC-06, AC-13 |
| NEED-03 | CMS con cuentas individuales owner/editor, borradores, conflictos, preview privada, publicación, historial, biblioteca y respaldo | AC-07, AC-08, AC-09, AC-10, AC-11, AC-12, AC-14 |
| NEED-04 | Etapas para una a tres salas rotuladas como propuesta; recursos de coordinación, práctica y evidencia sin atribuir ventas, despliegues o resultados no comprobados | AC-02, AC-05 |
| NEED-05 | Servicio editorial Flask/SQLite separado, datos privados fuera del sitio y restauración editorial sin afectar solicitudes ni operación; rutas existentes conservadas | AC-01, AC-07, AC-10, AC-11, AC-14 |

Alternativas y decisión técnica: [ADR-001](adr-001-editorial-separation.md), aceptado con CP2 v1. Alcance y 14 criterios de aceptación: [CP2](cp2-spec.md) y la historia LISTA. La aprobación del paquete ya está registrada; no permanece como bloqueo de desarrollo. El cierre de pruebas y TRUST 5 se registra en CP4, sin inferirlo de que los archivos existan.

## Refinamientos de integración de CP3

`resourceId` en analítica identifica el **id estable de un recurso publicado**, por ejemplo `before-tour`; el slug `antes-del-tour` se reserva para su URL. El refinamiento fue coordinado por los responsables de integración, frontend y backend y está reflejado en `growth/CONTRACT.md`, `growth/openapi.json` y pruebas RED/GREEN de ambos módulos. No incorpora campos libres, respuestas del diagnóstico ni datos de contacto en eventos.

La ruta `/descubre/analisis/` entrega un reporte público legible de propuesta y recorrido; usa `noindex, nofollow`. Los borradores, originales y preview editorial siguen requiriendo sesión. El contexto de plantillas `media_items` expone únicamente metadatos necesarios de medios referenciados y permite elegir la variante y alternativa accesible correctas.

La entrega local no equivale a publicar: DNS/hosting, habilitación de captación real, aviso final, responsable y programación operativa de retención siguen fuera del cierre local. Los 15 recorridos E2E completos pasaron; el detalle observado está en CP4.
