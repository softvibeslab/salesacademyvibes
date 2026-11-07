# Avance y proyección

**Overall: Yellow.** El demo e2e de tours está cerrado. Falta identidad de producción y métricas reales. No hay baseline de velocity ni presupuesto en este repo.

## Hecho en este periodo

- Producto live en una sola URL de app más tablero y Copiloto.
- Tablero de sala con alcance por rol (declarado, no autenticado).
- Fuente de tours en el servidor. La app del rep las lee.
- Recorrido comprobado: Rosa → Teo → app de Teo; Ana no ve ese tour.
- Script e2e del API en local y en https://salesacademy.softvibes.art/api/.
- Repo público y rama `feat/sala-tours-sync`.
- Resultado del tour de punta a punta: el rep cierra, el jefe corrige, Home calcula sus indicadores. Historia aprobada por el PO y evidencia TDD en `work/features/2026-11-07-resultado-del-tour/`.

## Now

Lo que ya se puede mostrar.

| Ítem | Dónde se verifica | Owner |
|---|---|---|
| Demo de app + tablero + Copiloto | URLs live | Roger |
| Asignación de tours que baja al rep | `/ops/` y app, dos pestañas | Roger |
| Roadmap de 11 pasos con video | App → Roadmap | Roger |
| Plantillas de recursos | App → Recursos | Roger |

## Next

Hipótesis, no fechas de release ni KPI.

| Si | Entonces se ve | Horizonte | Owner |
|---|---|---|---|
| Se decide autenticar antes de tours reales | El tablero deja de ser un selector de rol | Antes del primer dato de sala | Roger |
| Se versiona el Copiloto en este repo | `/copiloto/` sale del mismo árbol que la app | Siguiente corte de código si se pide | Roger |
| Un jefe recorre el demo en una llamada | El relato «tú asignas, el rep lo ve» se usa en venta | Próxima demo | Roger |

## Later

| Si | Entonces se ve | Nota |
|---|---|---|
| Hay ventas reales por leer | Perfil deja el ejemplo (Home ya calcula desde resultados del demo) | No hay API de ventas en este repo |
| Hay más de un tenant | Un JSON y un header de rol no bastan | No diseñado |
| Se quiere push al teléfono | El poll de 15 s se sustituye | No hay websockets hoy |

## Qué no estamos construyendo

- Contraseña o SSO en este corte.
- Websockets.
- Cargar nombres de clientes o leads reales.
- Unir este repo con `salesacademyapp` o `vcsAcademyMobile`.
- Cambiar DNS, comprar VPS o tocar `salesacademy.softvibes.pro` (`:8010`).
- Inventar métricas de adopción o ingreso.

## Riesgos

| Riesgo | Señal | Mitigación ya en código |
|---|---|---|
| Tomar el demo por producción | Alguien pega un apellido en el lead | El API exige `Lead #` + 3 o 4 dígitos |
| Escritura pública | Cualquiera puede mandar `X-Ops-Actor: admin` | Demo; no hay tours reales; reset de ejemplo |
| Dos editores | Último guardado gana | Actualizar / poll; no hay merge |
| Copiloto fuera de este git | El chat live no se reproduce solo con este repo | La ruta `/copiloto/` en el VPS se dejó intacta |

## Cómo se sabrá que Next cerró

Un usuario entra al tablero sin elegir rol a mano, asigna un tour, y ese tour aparece en la app de la persona correcta. Hasta entonces, el estado sigue Yellow.
