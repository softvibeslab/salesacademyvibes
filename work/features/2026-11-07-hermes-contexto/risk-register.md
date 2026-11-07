# Risk Register

**Feature:** `hermes-contexto` · **Owner:** `Roger (PO)` · **Date:** `2026-11-07`

| ID | Risk | Category | Impact | Likelihood | Score | Owner | Mitigation | Status |
|---|---|---|---|---|---|---|---|---|
| RSK-001 | El modelo inventa datos fuera del contexto | quality | M | M | 4 | agente | Regla explícita en la personalidad + «sin datos» cuando falla; UAT en vivo | open |
| RSK-002 | Fuga de datos de otro usuario al prompt | security | H | L | 3 | agente | El puente usa la cookie del llamante; mismo filtro de alcance que `/tours`; pruebas | open |
| RSK-003 | Costo por resúmenes automáticos | cost | M | M | 4 | PO | Máximo 3 por usuario y día, en caché local | open |
| RSK-004 | La demo usa la fecha de ejemplo (2026-11-06) y la hora real del dispositivo | quality | L | H | 3 | agente | `today` viaja desde la app (fecha de ejemplo); la hora es la local | accepted |
