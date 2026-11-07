# Spec (CP2)

**Status:** approved
**Feature:** `ops-import-preview`
**Product:** `Sales Academy (salesacademy.softvibes.art)`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`

## 1. Problem

Asignar tours uno a uno no sirve cuando el jefe ya tiene la lista en CSV, en un mensaje o en una foto. Pegar directo al API crearía datos inválidos.

## 2. Users And Areas

| User / Area | Need |
|---|---|
| Jefe de sala | Importar su lista y ver qué se va a crear |
| Administrador | Igual, en cualquier sala |
| Rep | No importa; solo consulta sus tours |

## 3. Goal

En un CSV de ejemplo de 2 filas válidas, el preview las mapea y, tras confirmar, existen en `GET /api/tours` con el mismo `Lead #`. Una fila con nombre real no se crea.

## 4. Scope

Included:

- Superficie en `/ops/`: archivo, foto/cámara, pegar texto.
- `POST /api/imports/preview`.
- Mapeo a `repId` del directorio, fecha, hora, `Lead #`, estado, nota ≤ 80.
- Previsualización editable y confirmación por filas seleccionadas vía `POST /api/tours`.

Excluded:

- `.xlsx`, creación de personas, persistir archivos, visión cloud, app del rep.

## 5. Requirements (Functional)

- REQ-001: When el jefe o el admin envía texto, CSV, JSON o foto a `POST /api/imports/preview`, the system shall devolver filas mapeadas y no crear tours.
- REQ-002: If un nombre no está en el directorio o el lead no es `Lead #\d{3,4}`, the system shall marcar `issues` y no seleccionar esa fila.
- REQ-003: If la fila se empalma con un tour existente o con otra fila del preview, the system shall marcar `clash`.
- REQ-004: When el usuario confirma una fila sin issues, the system shall crearla con `POST /api/tours`.
- REQ-005: If el actor es rep, the system shall responder 403.
- REQ-006: If la foto no se puede leer, the system shall devolver filas vacías y un aviso, sin guardar la imagen.

## 6. Requirements (Non-Functional)

| Type | Requirement | Target | Verified In |
|---|---|---|---|
| Performance | NFR-001: preview de ≤ 40 filas o 1.5 MB de imagen | < 20 s | CP4 |
| Security | NFR-002: sin vendedor; imagen no se escribe | RAM only | ADR-001 |
| Privacy | NFR-003: leads con nombre real no pasan | issue | test T02 |
| Accessibility | NFR-004: controles con label y teclado | dropzone + tabla | UI |

## 7. Security Considerations

- [x] Foto: no se persiste. Texto: mismas reglas de lead/nota que `clean_visit`.
- [x] Jefe solo ve/confirma reps de su sala (el POST ya lo aplica; el preview marca issue).
- [x] Sin secretos ni datos reales en fixtures.

## 8. RACI

- Accountable: Roger (PO)
- Responsible: agente
- Consulted: privacidad (ADR-001)
- Informed: equipo demo

## 9. Layer Profile

- backend
- frontend (web-ui `/ops/`)

## 10. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| OCR borroso | 0 filas | aviso + pegar texto |
| CSV con clientes reales | PII en store | issue si el lead no es `Lead #` |
| Empalme masivo | 409 en confirm | `clash` en preview |

## 11. Test Plan (initial)

| REQ / NFR | How to verify | Type |
|---|---|---|
| REQ-001 | CSV → preview; GET tours igual | unit + e2e |
| REQ-002 | "Juan Pérez" / Pedro → issues | unit |
| REQ-003 | Ana 09:30 choca con v1 | unit |
| REQ-004 | POST tours de la fila aceptada | e2e |
| REQ-005 | `rep:ana` → 403 | e2e |
| REQ-006 | imagen sin OCR → warning, 0 writes | e2e |

## 12. Acceptance Criteria

- AC-01: Preview de CSV válido no escribe tours.
- AC-02: Ana + `Lead #8801` sale mapeada y seleccionable.
- AC-03: Nombre de lead real o rep desconocido sale con issue y desmarcada.
- AC-04: Confirmación crea el tour; el rep lo ve en GET.
- AC-05: El rep no llama preview.
- AC-06: La foto no aparece en `ops.json`.

## 13. OpenAPI (preview)

`POST /api/imports/preview`

Headers: `X-Ops-Actor`, `Content-Type: application/json`

Body:

```json
{
  "text": "string, optional",
  "filename": "string, optional",
  "mime": "text/csv | application/json | image/jpeg | image/png",
  "image": "base64, optional",
  "defaultDate": "YYYY-MM-DD"
}
```

Response 200:

```json
{
  "ok": true,
  "engine": "rules | tesseract | none",
  "warnings": ["string"],
  "rows": [
    {
      "index": 0,
      "selected": true,
      "source": "string",
      "clash": false,
      "issues": [],
      "visit": {
        "repId": "ana",
        "date": "2026-11-06",
        "start": "09:00",
        "end": "10:00",
        "lead": "Lead #8801",
        "status": "pendiente",
        "note": ""
      }
    }
  ]
}
```

Códigos: 401 sin actor, 403 rep, 400 cuerpo vacío o inválido, 413 > 2 MB.

Confirmar: `POST /api/tours` existente, una vez por fila aceptada. No hay `/api/imports/confirm` en v1.
