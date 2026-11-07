# ADR-001: OCR y mapeo locales, sin vendedor de fotos

**Status:** accepted
**Date:** 2026-11-07
**Owner:** backend / privacidad

## Context

El PO pide analizar archivo, imagen o fotografía. Subir la foto a un LLM cloud mezclaría PII (nombres, teléfonos escritos en pizarra) con un tercero. El API de tours ya rechaza leads que no son `Lead #NNN`.

## Decision

1. `POST /api/imports/preview` solo propone filas. No escribe `ops.json`.
2. Confirmar usa el contrato existente `POST /api/tours` (mismas reglas de `clean_visit`, empalme y sala).
3. CSV, JSON y texto se mapean con reglas en proceso (stdlib).
4. Las fotos se leen con Tesseract local si está instalado. Si no, el preview pide pegar el texto. La imagen vive en RAM y se descarta.
5. No se llama a Ollama cloud, Gemini, ni ningún proxy de visión.

## Consequences

### Positive

- La foto no queda en disco ni en el store.
- El mapeo es reproducible en tests.

### Negative

- Sin Tesseract, la foto no extrae texto.
- Un CSV sucio o una foto borrosa produce filas con `issues`, no magia.

### Neutral

- Límite de cuerpo 2 MB solo en preview.

## Alternatives

| Alternative | Reason Accepted / Rejected |
|---|---|
| Cliente llama N veces a `/api/tours` sin preview | Rejected: escribiría basura |
| `POST /api/imports/confirm` batch | Rejected en v1: duplica `clean_visit`; el cliente confirma con el POST ya existente |
| Visión en la nube | Rejected: PII |

## Validation

- Preview no cambia el recuento de tours.
- Lead con nombre real sale como issue, no como visita.
