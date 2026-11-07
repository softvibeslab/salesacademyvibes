# Importar tours con preview

**Carril:** Contrato (CP0–CP5)
**Status:** live en `/ops/` (caché `20261107w`)
**Fecha:** 2026-11-07
**Historia:** Excepción Ready — el PO pidió en chat agregar el módulo al tablero `/ops/`

El jefe o el administrador sube un CSV, pega texto o toma una foto. El API analiza y mapea al directorio (Ana, Luis, Mira, Teo) y a `Lead #`. El tablero muestra la previsualización. Nada se guarda hasta que confirma fila por fila con `POST /api/tours`.
