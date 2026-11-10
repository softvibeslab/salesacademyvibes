# CP0 · Nuevo tour desde survey o captura manual

**Status:** approved
**Feature:** tour-registration
**Product:** Sales Academy
**Owner:** Roger (PO)
**Date:** 2026-11-08
**Historia:** work/stories/2026-11-08-tour-registration.md

Aprobación de Roger el 2026-11-10: «Apruebo v1; implementar». La historia y CP2 v1 quedan aprobados; se ejecuta el gate antes de código.

## 1. Entrada

Origen: conversación con Roger.

Solicitud: «agregar un modulo para registrar el tour iniciando con una foto a un survey o con el registro de la informacion de la pareja del tour».

Al aclarar alcance, el usuario respondió «Stitch y app funcionando». Esa respuesta confirma los entregables deseados; **no es aprobación del contrato CP2 v1**, que aún no se había presentado.

El asesor necesita comenzar un tour desde el survey o desde la información de sus visitantes y revisar lo capturado antes de registrarlo.

## 2. Contexto

- La app vigente usa `agenda.js`, `agenda.css` y una API Python stdlib. El importador actual admite listas y leads anónimos; no registra datos de pareja.
- «Registrar presentación» corresponde al resultado de un tour terminado. El nuevo acceso se llama «Nuevo tour».
- La demo admite acceso por encabezado al tablero y credenciales compartidas. Los datos personales requieren un modo privado con autenticación individual y proyecciones públicas anónimas.
- El diseño en Stitch está autorizado. Integración funcional, modelo privado y autenticación escalan del FTD visual al carril Contrato CP0–CP5.

## 3. Fuentes

| Fuente | Tipo | Acceso | Sensible |
|---|---|---|---|
| Solicitud y confirmación de alcance | Conversación | Citas anteriores | No |
| `DESIGN-TOUR.md` | Propuesta UX | Esta feature | Solo datos ficticios |
| `cp2-spec.md` v1 | Contrato propuesto | Esta feature | Define tratamiento privado; sin datos reales |
| `prototypes/smart-agenda-mockup/agenda.js`, `ops-api.js`, `ops-store.js` | Código consultado | Workspace | No se copiaron credenciales |
| `work/features/2026-11-07-ops-import-preview/cp2-spec.md` | Contrato existente | Workspace | Importador anónimo |
| `work/features/2026-11-07-hermes-contexto/cp2-spec.md` | Contrato existente | Workspace | Contexto sin contactos |
| `docs/stack-y-api.md` | Runbook consultado | Workspace | Rutas de despliegue, sin secretos |

## 4. Puntos Abiertos

- Aprobación de Roger sobre CP2 v1, criterios y datos sintéticos de la historia. Bloquea código.
- Validación de las decisiones propuestas: retención de 30 días, zona America/Cancun y separación demo/privado. Se aprueban o ajustan junto al contrato.
- Provisión de credenciales privadas y comprobación de configuración activa. Bloquea activación con datos reales, no pruebas locales sintéticas tras aprobar CP2.
- Corpus representativo de surveys: diferido para medir calidad de manuscritos. No se promete OCR universal.

## 5. No-Goals

CRM externo, visión cloud, mensajes automáticos, datos de solvencia o identidad oficial, edición posterior del registro privado, borrador recuperable tras recarga, modificación del flujo de resultados y envío de PII por URL al Copiloto.

## 6. Capas Afectadas

- Frontend: entrada, foto/manual, revisión, confirmación, detalle y navegación.
- Backend: preview local, endpoints privados, validación, autenticación y permisos.
- Datos: colección privada, escritura atómica, idempotencia y retención.
- Operación: flag de capacidad, provisión privada, validación de despliegue y recuperación.
- Documentación/QA: historia, contrato, trazabilidad y evidencia ejecutada.

## 7. Responsables

Roger aprueba alcance y contrato. Ingeniería implementa tras ese gate; QA verifica datos, aislamiento y flujos; operación provisiona credenciales y valida la activación privada.

## 8. Tamaño y Gate

Tamaño M/L por autenticación, privacidad y múltiples capas; estimación temporal no comprometida. Contrato obligatorio por cambio de API, datos y permisos, independientemente de la duración.

- [x] Contexto, fuentes, límites y responsables ubicados.
- [x] Preguntas relevantes registradas en la historia.
- [ ] Historia LISTA y aprobación CP2 v1.
