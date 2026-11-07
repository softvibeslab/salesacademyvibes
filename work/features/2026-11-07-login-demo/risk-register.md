# Risk Register

**Feature:** `login-demo`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`

| ID | Risk | Category | Impact | Likelihood | Score | Owner | Mitigation | Status |
|---|---|---|---|---|---|---|---|---|
| RSK-001 | La contraseña demo es pública: cualquiera con la guía entra como rep o jefe | security | M | H | 6 | PO | Solo datos sintéticos; el admin (restaurar, mover reps) queda privado; cambiar `OPS_DEMO_PASSWORD` cuando haya testers reales | accepted |
| RSK-002 | Sin `OPS_ADMIN_PASSWORD` en el servidor el admin no puede entrar | ops | M | M | 4 | PO | Runbook de una línea para el operador | open |
| RSK-003 | Integración con trabajo ajeno en los mismos archivos | tech | M | M | 4 | agente | Esperar el commit de la otra sesión; volver a correr todas las suites antes del deploy | open |
| RSK-004 | El bloqueo por intentos vive en memoria; se reinicia con el servicio | security | L | L | 1 | agente | Aceptable para el demo | accepted |

## Accepted Risks (Waivers)

| Risk ID | Reason | Approved By | Expires |
|---|---|---|---|
| RSK-001 | Decisión explícita del PO para facilitar pruebas | Roger (PO), 2026-11-07 | antes de datos reales |
