# FTD · Registrar tour desde survey o datos de la pareja

**Status:** escalated-to-contract
**Lane:** FTD de diseño completado; integración funcional escalada a Contrato CP0–CP5
**Date:** 2026-11-08
**Author:** Codex, a solicitud de Roger
**Ticket:** Conversación

## Claridad

- **Solicitud:** «agregar un modulo para registrar el tour iniciando con una foto a un survey o con el registro de la informacion de la pareja del tour».
- **Entendimiento:** agregar al proyecto Stitch actual el recorrido Registrar tour, con entrada por foto de survey o formulario manual de pareja. Ambas rutas convergen en revisión editable y confirmación.
- **Hecho cuando:** las nuevas pantallas están guardadas en el lienzo de `16859674583431881734`, conservan las referencias existentes y muestran entrada, foto, revisión, captura manual, confirmación, siguiente paso y recuperación de errores.
- **Alcance autorizado ahora:** artefactos de diseño como continuación del proyecto Stitch. El usuario confirmó «Stitch y app funcionando» y aprobó CP2 v1 el 2026-11-10: «Apruebo v1; implementar».
- **Datos:** exclusivamente ejemplos sintéticos. Ningún survey real se procesa ni se carga a Stitch.

| Pregunta | Respuesta de trabajo | Estado |
|---|---|---|
| ¿Dónde agregar el diseño? | Proyecto Stitch de Sales Academy elegido previamente por el usuario. | Resuelta por contexto |
| ¿Qué entradas ofrece? | Foto de survey y registro manual de información de la pareja. | Solicitado |
| ¿Qué campos se conocen? | La pareja requiere una propuesta de campos nuevos; se describen como propuesta de UX en DESIGN-TOUR.md. | Resuelta para diseño |
| ¿Se implementa ahora en producción? | El diseño puede completarse sin esa respuesta; el runtime queda fuera de este FTD. | Fuera de alcance |

## Contexto observado

- App del rep: `prototypes/smart-agenda-mockup/`, HTML/CSS/JS y API Python stdlib.
- Importador vigente: `/ops/`, jefe/admin; foto o texto con vista previa. El contrato aprobado `work/features/2026-11-07-ops-import-preview/cp2-spec.md` admite únicamente leads anónimos `Lead #` y excluye crear personas, app del rep y persistir imágenes.
- Por ello, la captura real de pareja y permisos del rep necesitarían contrato CP2, modelo de datos y pruebas específicos. Los mockups no cambian ni amplían el contrato existente.

## Alcance del diseño

El nombre de acceso es «Nuevo tour» para distinguirlo de la captura de resultados existente «Registrar tour en 30 s».

Ocho pantallas nuevas con prefijo `TOUR`: inicio, foto, revisión asistida, formulario manual, resumen, tour listo, recuperación por imagen ilegible y revisión de escritorio. Conexión visual con Hoy, Calendario, Copiloto y Meet & Greet; no se reemplazan las capturas originales del lienzo.

## Validación

Excepcion TDD: diseño visual y documentación sin código productivo, API, modelo de datos, OCR ejecutable ni despliegue. Se verifica el lienzo, HTML exportado, campos, errores y continuidad de ambas rutas.

| Tarea | Fase | Comando o evidencia | Resultado |
|---|---|---|---|
| Inventario | VALIDADO | README, spec ops-import-preview y captura Hoy | Identificado importador anónimo existente y nueva necesidad de datos de pareja. |
| Diseño | VALIDADO | Stitch UI y get_project | Ocho pantallas y 64 nodos finales; ver CP4. |
| Campos | VALIDADO | Skill form-cro + HTMLParser | Etiquetas vinculadas; límites visuales registrados en CP4. |
| Preservación | VALIDADO | Comparación de IDs fuente con línea base de 54 nodos | 54/54 preservados más KPI actualizado del usuario. |

## TRUST 5

| Dimensión | Evidencia |
|---|---|
| Tested | Ocho pantallas verificadas; pruebas funcionales en curso bajo CP3. |
| Readable | Español breve, etiquetas visibles y campos opcionales explícitos. |
| Unified | Mismo patrón visual de app, pasos cortos y resumen previo al registro. |
| Secured | Solo datos simulados; extracción propuesta revisada por persona, sin inferir datos ausentes. |
| Trackable | Solicitud citable, fuentes, proyecto, IDs y evidencia en esta feature. |

## Escalamiento

Confirmación de alcance funcional y aprobación CP2 citadas en cp2-spec.md. Historia LISTA verificada el 2026-11-10 (exit 0). La excepción TDD de diseño no cubre código productivo.
