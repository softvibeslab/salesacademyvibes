# CP5 · Registro privado activo

**Status:** complete — módulo activo, UAT y gobierno verificados
**Date:** 2026-11-10

Diseño de ocho pantallas entregado en el proyecto Stitch 16859674583431881734, con exportaciones y evidencia. CP2 v1 aprobado el 2026-11-10: «Apruebo v1; implementar». Roger autorizó después «Crear accesos privados para las cuentas actuales y guardar las claves fuera del sitio». La implementación está probada, publicada y **activa en modo privado** en `https://salesacademy.softvibes.art/`.

## Entregado

- Foto/manual, revisión humana, resumen, registro idempotente, agenda y detalle privado.
- Siete cuentas privadas verificadas: seis del directorio actual y administrador; acceso por asesor/sala, OCR local y retención diaria. Se rechazó la contraseña demo y un encabezado falso de actor.
- 39 pruebas Python, 21 frontend, ocho suites frontend previas, e2e operativo y controlador/API pasan. Cinco hallazgos de seguridad corregidos y revisados independientemente; el problema observado en el selector de foto se corrigió con RED → GREEN.
- UAT de captura manual hasta agenda, selector de foto, fallback OCR y teclado con datos sintéticos; vista móvil a 360/390 y escritorio a 1440. Recursos finales `20261110tour2`.
- Activación HTTPS con salida 0; servicio/timer activos. El smoke privado verificó siete logins, aislamiento, replay sin duplicado y borrado exclusivo del fixture. Los siete tours anteriores permanecieron intactos; no hubo reset.
- Preview OCR verificado por HTTPS con fixture sintético de 59 KB: respuesta 200, motor Tesseract, cinco campos esperados reconocidos, `no-store` y cero tours guardados. Se corrigió el límite de cuerpo del proxy exclusivamente para preview; la configuración pasó `nginx -t` antes de recargar. Los recursos publicados coinciden con `20261110tour2`.
- Claves en `/root/salesacademy-tour-access.json` 0600 y copia local `/Users/rogergv/.config/salesacademy/initial-access.json` 0600 dentro de directorio 0700. Hashes en `/etc/salesacademy-ops/private-users.json` 0600. Ningún secreto en repo, sitio, conversación o evidencia.
- Evidencia en `evidence/`: `activation-private.json`, `credential-handoff.json`, `uat-browser-final.md`, `https-final-smoke.json`, `backup-activation-review.md`; trazabilidad adicional en CP4. El coordinador ejecutó `verify-governance.sh --strict` con salida 0; `evidence/governance-final.txt`. `git diff --check` salió 0.

## Límites y operación

1. Las comprobaciones móviles usaron emulación de viewport. No se acredita una cámara física iOS/Android. El OCR requiere revisión humana: el fixture HTTPS verifica el motor y cinco campos, no un corpus representativo ni precisión de manuscritos.
2. El timer limita la información personal del almacén activo a treinta días, máximo efectivo de treinta y uno. La retención de cada backup se cuenta desde su captura. La política estándar del proveedor y la ausencia de jobs locales identificados fueron revisadas; no se obtuvo inventario individual de snapshots ni se afirma borrado absoluto de toda copia al día 31 desde el registro original.
3. Tras restaurar una copia, ejecutar la limpieza antes de reabrir el servicio privado. Para detener nuevas capturas, apagar el flag y conservar las guardas privadas; no volver a una versión anterior ni a demo mientras existan datos privados. Seguir `backend-runbook.md` y `activation-runbook.md`.

La elección de accesos, el recorrido UAT y la activación ya están resueltos. Los límites anteriores describen el alcance verificado; no se presentan como pruebas ejecutadas ni garantías adicionales.
