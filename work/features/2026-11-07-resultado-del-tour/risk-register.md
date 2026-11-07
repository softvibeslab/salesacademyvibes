# Risk Register

**Feature:** `resultado-del-tour`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`

> Riesgo = Impact x Likelihood. Revisar en CP1, CP3 y CP4.

## Register

| ID | Risk | Category | Impact | Likelihood | Score | Owner | Mitigation | Status |
|---|---|---|---|---|---|---|---|---|
| RSK-001 | `clean_visit` reconstruye el tour y un PATCH borra `result` | tech | H | H | 9 | agente | BR-10; prueba T08 escrita antes del código | open |
| RSK-002 | Identidad declarada (`X-Ops-Actor`): cualquiera escribe resultados | security | H | M | 6 | PO | Demo 100 % sintético; auth es historia previa a datos reales; el repo lo documenta como límite | accepted |
| RSK-003 | Ediciones concurrentes se pisan en silencio | data | M | M | 4 | agente | Versión optimista + 409 (REQ-003, T09) | open |
| RSK-004 | Notas libres con datos personales | security | M | M | 4 | agente | Filtro BR-11 en servidor (T11); aviso en UI | open |

## Accepted Risks (Waivers)

| Risk ID | Reason | Approved By | Expires |
|---|---|---|---|
| RSK-002 | El demo no lleva datos reales; bloquear esto bloquearía el demo completo. Condición: ningún dato real hasta la historia de autenticación. | Roger, PO (2026-11-07) | antes del primer dato real |
