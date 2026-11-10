# Corrección de selección de foto durante UAT

**Fecha:** 2026-11-10. **Contrato:** CP2 v1 aprobado; corrección dentro de REQ-02/05 y AC-02/09.

## Hallazgo

El coordinador abrió Nuevo tour → Foto → Elegir imagen en Chrome local y seleccionó el survey ficticio. Al cerrar el selector, la página seguía vacía sin error. La revisión de código identificó que los chequeos de sesión, cada quince segundos y al recuperar visibilidad, llaman a `setSession`, que repinta el formulario reemplazando `sheets.innerHTML`. Si el selector del sistema sigue abierto, su input queda desconectado; el evento change posterior no puede propagarse al listener delegado del contenedor.

## Corrección

`openSurveyPicker` crea un input temporal fuera de `#sheets`, por lo que sobrevive a los refrescos de sesión. Recoge change directamente en ese input y limpia su valor/nodo al seleccionar o cancelar. La época de sesión y el token de foto se capturan al abrir: una selección tardía tras expiración o cambio de flujo se descarta antes de normalizar. Se retiraron los inputs antiguos del HTML y el handler delegado que dependía de ellos. Los límites de imagen, OCR y permisos se mantienen.

## Evidencia ejecutada

| Caso | Fase | Comando | Resultado observado |
|---|---|---|---|
| Selector abierto durante refresco | RED | `node --test tests/tour-photo-picker.mjs` | La selección no entrega el archivo: array observado vacío frente a un archivo esperado |
| Selector y expiración | RED | Mismo comando | El input conserva el valor del archivo después de la selección tardía |
| Selector y regresión del módulo | GREEN | `node --test tests/tour-photo-picker.mjs tests/tour-registration.mjs tests/tour-registration-ui.mjs` | 21 pruebas pasan, cero fallos |

Salidas: `photo-picker-red.txt` y `photo-picker-green.txt`. `node --check` de agenda.js y tour-registration.js salió 0; `git diff --check` salió 0.

La nueva prueba ejecuta la función real de integración y el controlador real con un arnés pequeño que reproduce la desconexión DOM y propagación del evento; no pretende ser una prueba de navegador. La repetición visual por CUA corresponde al coordinador. No se desplegó desde este trabajo ni se generaron cuentas reales.

Archivos productivos: `prototypes/smart-agenda-mockup/agenda.js`, `tour-registration.js`. Prueba nueva: `tests/tour-photo-picker.mjs`. El coordinador debe actualizar versión de caché y paquete antes de publicar.
