# FTD: `quitar-infra-docs`

**Status:** done
**Lane:** FTD
**Author:** `RogerDevAndroid`
**Branch:** `feat/sala-tours-sync`
**Date:** `2026-11-07`
**Ticket:** `N/A (hallazgo de seguridad del analisis del 7 de noviembre de 2026)`
**Historia (opcional):** N/A

> Carril Fast-Track (`rules-neutral/workflow-lanes.md`). Escribe Intencion, Alcance y
> Checklist ANTES del primer cambio de codigo. Si aparece un criterio de escalamiento,
> para y pasa a CP0-CP5: este documento se vuelve insumo del intake.

## Claridad

- **Solicitud:** Roger pidio quitar de la documentacion publica la IP del VPS y el nombre de la llave SSH ("si hazlo todo", 7 de noviembre de 2026).
- **Entendimiento:** se reemplaza la linea de acceso SSH en `docs/stack-y-api.md` y `docs/wiki/Stack-y-API.md` por una referencia al runbook privado del equipo, y se agrega un chequeo que falla si `README.md` o `docs/` vuelven a llevar una IP publica o el nombre de una llave privada. No se reescribe la historia de git ni se toca el VPS.
- **Hecho cuando:** `scripts/check-public-docs.sh` sale en 0 en el repo y la pagina publicada en GitHub Pages ya no contiene la IP.

| # | Pregunta | Respuesta | Estado |
|---|---|---|---|
| 1 | Ninguna: la solicitud es clara. La IP ya estuvo publica; endurecer el VPS (llave, firewall) queda como recomendacion, fuera de este FTD. | N/A | Respondida |

## Intencion

El repo y GitHub Pages son publicos. La documentacion indicaba el host y el nombre de la llave para entrar al VPS que tambien sirve otros sitios. Quitarlo reduce la superficie de reconocimiento y deja un chequeo que evita reintroducirlo.

## Alcance

- Incluye: `docs/stack-y-api.md`, `docs/wiki/Stack-y-API.md`, nuevo `scripts/check-public-docs.sh`.
- No incluye: reescribir la historia de git (la IP sigue en commits anteriores), rotar la llave, cambiar firewall o DNS, el codigo de la app o del API.
- Capa: documentacion del repo.

## Escalamiento

Confirma que NO aplica ninguno (si alguno aplica, este trabajo va por CP0-CP5):

- [x] Una sola capa.
- [x] Sin cambio de contrato (API/OpenAPI, eventos, payloads).
- [x] Sin cambio de esquema ni migraciones.
- [x] Sin auth, autorizacion, datos sensibles ni superficie externa nueva. (Reduce superficie; no agrega.)
- [x] Sin dependencias nuevas.
- [x] Sin decision que amerite ADR.
- [x] Menos de 2 dias.

## Checklist (tests primero)

- [x] T01-test: `scripts/check-public-docs.sh` detecta IP publica o nombre de llave en `README.md` y `docs/` - hecho cuando `bash scripts/check-public-docs.sh` FALLA (exit 1) listando las dos lineas de `stack-y-api`.
- [x] T01-impl: reemplazar la linea SSH en ambos documentos - hecho cuando `bash scripts/check-public-docs.sh` PASA (exit 0).

## Evidencia

| Tarea | Fase | Comando | Resultado observado |
|---|---|---|---|
| T01 | RED | `bash scripts/check-public-docs.sh` | exit 1. `FALLA: la documentacion publica expone detalles de infraestructura.` 4 hallazgos: IP publica y nombre de llave en `docs/stack-y-api.md:91` y `docs/wiki/Stack-y-API.md:91`. |
| T01 | GREEN | `bash scripts/check-public-docs.sh` | exit 0. `OK: README.md y docs/ sin IP publica ni nombres de llave.` Diff: 2 archivos, 1 linea cada uno. |

Excepcion TDD (solo si aplica): N/A. El cambio es de documentacion, pero tiene un chequeo ejecutable.

## TRUST 5 (alcance FTD)

- [x] Tested: evidencia RED -> GREEN arriba y suite completa en verde.
- [x] Readable: nombres claros, sin codigo muerto.
- [x] Unified: sigue los patrones de la capa.
- [x] Secured: sin secretos ni datos reales; inputs validados si aplica.
- [x] Trackable: commit `b1ea8b6` cita este documento; publicado en `feat/sala-tours-sync` y `main`.

## Siguiente

Hecho: GitHub Pages reconstruido desde `b1ea8b6` (2026-11-07T09:07:49Z); `stack-y-api` ya no contiene la IP ni el nombre de la llave (grep = 0) y muestra la referencia al runbook privado. Gate `verify-governance --strict` en verde. Fuera de este FTD: la IP sigue en la historia de git; endurecer el VPS (solo llave, sin password, firewall) se recomienda aparte.
