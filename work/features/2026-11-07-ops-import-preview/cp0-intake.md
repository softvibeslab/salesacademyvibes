# Intake (CP0)

**Status:** approved
**Feature:** `ops-import-preview`
**Product:** `Sales Academy (salesacademy.softvibes.art)`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`
**Excepcion Ready:** solicitud directa del PO el 2026-11-07: agregar o importar rápido por archivo, imagen o fotografía, analizar, mapear y mostrar previsualización para confirmar.

## 1. Entrada

Resumen en una frase: el jefe carga un archivo, un texto o una foto de agenda, ve el mapeo propuesto y confirma cuáles tours se crean.

## 2. Contexto

Hoy cada tour se captura a mano en `/ops/`. Hay listas en papel, CSV y fotos de pizarra. Sin preview, un pegado masivo escribiría leads con nombre real o reps que no existen.

## 3. Fuentes

| Fuente | Tipo | Acceso | Sensible |
|---|---|---|---|
| Tablero vivo | UI | `/ops/` | no |
| Contrato tours | API | `POST /api/tours`, `clean_visit` | no |
| Directorio | seed | Ana, Luis, Mira, Teo | no |

## 4. Preguntas Abiertas

Ninguna que bloquee. Confirmación = `POST /api/tours` por fila aceptada. Fotos no se persisten. Sin vendedor cloud.

## 5. No-Goals

- Autenticación real.
- Excel `.xlsx`, Google Sheets ni WhatsApp.
- Crear reps nuevos desde el archivo.
- Guardar la foto o el original.
- Enviar la imagen a un proveedor externo.
- Cambiar `X-Ops-Actor`.

## 6. Capas Afectadas (preliminar)

- [x] backend (`server/ops_api.py`, `server/ops_import.py`)
- [x] frontend (`ops/`)
- [x] docs (`docs/stack-y-api.md`, guía del tablero)
