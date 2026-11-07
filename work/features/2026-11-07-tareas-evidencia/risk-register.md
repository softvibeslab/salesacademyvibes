# Risk Register

**Feature:** `tareas-evidencia` · **Owner:** `Roger (PO)` · **Date:** `2026-11-07`

| ID | Risk | Category | Impact | Likelihood | Score | Owner | Mitigation | Status |
|---|---|---|---|---|---|---|---|---|
| RSK-001 | Un rep sube una foto con datos de un cliente | privacy | H | M | 6 | PO | Aviso + consentimiento obligatorio; visible solo rep/jefe; borrado a 30 días | open |
| RSK-002 | Archivo malicioso disfrazado de imagen | security | M | L | 2 | agente | Firma de bytes, nombre controlado, `nosniff`, fuera del webroot | mitigated |
| RSK-003 | Disco del VPS | ops | L | L | 1 | agente | ≤ 700 KB por tarea y retención de 30 días | accepted |
