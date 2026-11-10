# Activación privada · Nuevo tour

**Fecha:** 2026-11-10. **Estado:** activación privada ejecutada por el coordinador en el VPS, salida 0. Servicio y timer activos; siete cuentas verificadas. Este documento incorpora sus resultados sin contenidos de credenciales.

Roger autorizó: «Crear accesos privados para las cuentas actuales y guardar las claves fuera del sitio». La UAT y la revisión de backups quedaron registradas antes de la activación en `evidence/uat-browser-final.md` y `evidence/backup-activation-review.md`.

## Script revisado y ejecutado

`/private/tmp/activate-salesacademy-tour.py` es un script operacional de una sola finalidad, sin contraseñas incluidas. No cambia código productivo. El modo por defecto hace únicamente preflight de lectura en el VPS. Además de la revisión de sintaxis y smoke local, el coordinador ejecutó la activación remota y verificó su smoke privado; evidencia `evidence/activation-private.json`.

Excepcion TDD: configuración operacional de cuentas, EnvironmentFile y despliegue; se valida mediante preflight, inspección y smoke real acotado después de cumplir gates. Las funciones productivas de autenticación/registro ya tienen evidencia RED → GREEN separada.

## Comportamiento y límites

- Requiere root, servicio `salesacademy-ops` activo con usuario `www-data`, timer habilitado/activo, store 0600 y directorio 0700 con propietario correcto.
- Verifica hashes de los cinco módulos sensibles contra la versión publicada y el directorio conocido de seis cuentas. Si IDs, roles o salas cambian, se detiene para revisar el alcance del smoke.
- Provisiona las seis cuentas actuales y `admin`, con contraseñas aleatorias individuales de 32 bytes de entropía, mediante `provision_private_user.py` y stdin. No imprime contraseñas, hashes, cookies ni cuerpos privados.
- Guarda entrega de claves en `/root/salesacademy-tour-access.json`, root:root 0600, fuera del sitio y del repositorio. Guarda hashes en `/etc/salesacademy-ops/private-users.json`, www-data:www-data 0600. El directorio de configuración queda root:www-data 0750 para permitir al servicio leer exclusivamente archivos que sus permisos permitan.
- Una reejecución coherente conserva contraseñas. Puede completar un primer aprovisionamiento interrumpido usando la entrega ya guardada. Si hashes y entrega no coinciden, o hay cuentas desconocidas, se detiene sin rotación.
- Configura variables no secretas en `/etc/salesacademy-ops/tour-registration.env`, root:root 0600, mediante drop-in `90-tour-private.conf`. No edita ni imprime `admin.env` ni otros secretos existentes.
- Cambia globalmente a autenticación privada, zona `America/Cancun`, Origin de `https://salesacademy.softvibes.art` y activa el registro. Las sesiones demo previas dejan de ser válidas según el contrato.
- Si falla la activación, intenta conservar autenticación privada con captura apagada y mantiene las credenciales para recuperarse. Nunca vuelve automáticamente a autenticación demo ni restaura un store antiguo.

## Ejecución coordinada

Copiar el script revisado a una ruta temporal root-only del VPS. Ejecutarlo con Python, no pegando claves en argumentos ni imprimiendo el archivo de entrega.

```bash
# Preflight sin mutaciones:
python3 /root/activate-salesacademy-tour.py

# Preparación autorizada de accesos, sin activar captura:
python3 /root/activate-salesacademy-tour.py --provision-only

# Solo después de que el coordinador registre UAT y revisión de backups:
python3 /root/activate-salesacademy-tour.py --activate --gates-approved
```

`--gates-approved` es una afirmación del operador; no inspecciona backups ni convierte UAT pendiente en aprobada. La preparación inicial no ejecutó estos comandos en remoto. La ejecución posterior coordinada sí activó la función, con UAT y revisión de backups documentadas.

## Resultado productivo y entrega

Preflight: seis personas, siete tours existentes y cero registros privados. Se provisionaron siete accesos sin rotar credenciales previas; no se imprimió material secreto. El smoke confirmó siete logins, rechazo de contraseña demo y encabezado falso, restricción de rep vecino y otra sala, idempotencia y eliminación del fixture sintético. Los siete tours previos permanecieron sin cambios. OCR disponible, zona Cancún, servicio y timer activos.

El smoke posterior de preview encontró un límite de proxy insuficiente y el coordinador lo corrigió: ubicación exacta de preview con límite de 2 000 000 bytes; las demás rutas API conservan 32 KB. Backup de configuración `tour-proxy-20261110T224035Z`; `nginx -t` y recarga correctos. La repetición HTTPS con fixture de 59 KB devolvió 200, Tesseract, cinco campos correctos y `no-store`, sin guardar tours; la sesión se cerró. Los hashes HTTP coinciden con los recursos `20261110tour2`. Evidencia detallada en `evidence/https-final-smoke.json`.

El archivo de entrega del VPS está en `/root/salesacademy-tour-access.json` 0600. Los hashes están en `/etc/salesacademy-ops/private-users.json` 0600. El coordinador completó la copia local en `/Users/rogergv/.config/salesacademy/initial-access.json` 0600, dentro de directorio 0700, fuera del repositorio y del sitio. `evidence/credential-handoff.json` contiene únicamente rutas/permisos y resultado; no contiene claves ni hashes.

La retención máxima de 31 días corresponde al almacén activo. Los backups tienen su propio contador desde la captura y la política estándar del proveedor fue revisada sin inventario individual de snapshots. No se modificaron políticas remotas. Tras restaurar una copia, ejecutar la limpieza antes de reabrir acceso privado. La UAT móvil fue emulada; cámara física, corpus representativo OCR y precisión de manuscritos no están acreditados.

## Verificación adicional del script

Se ejecutó `smoke()` del activador contra el `ops_api.py` real en un servidor localhost temporal, con siete cuentas ficticias provisionadas por la CLI real y siete visitas sintéticas anteriores. Pasó el recorrido normal completo: alta 201, replay 200, lecturas 200/404 según rol, rechazo 401 de contraseña demo/actor falso, `no-store` en todas las rutas consultadas y DELETE 200 solo del fixture. Las siete visitas anteriores quedaron intactas y todas las sesiones del smoke se revocaron.

Un segundo recorrido simuló pérdida de respuesta justo después de la escritura de alta. El `finally` localizó el registro por `requestId` + `createdBy=ana` + nombre sintético, usó su `tourId` para borrarlo y dejó cero registros privados/cero sesiones, conservando las siete visitas. Esto verifica los nombres y retornos actuales del contrato; no depende de que esos campos estén expuestos en la respuesta pública, porque la resolución del fixture lee el store solo en el VPS como operador.

Evidencia: `evidence/activation-script-local-review.json`. Esa revisión local usó HTTP loopback y comprobó los atributos de la cookie; por sí sola no acredita TLS ni systemd productivos. Durante esa revisión no se ejecutó `main()`, `preflight()` ni `provision()` contra rutas del VPS. La activación remota posterior está acreditada por separado. Los cinco hashes de backend del script coinciden con la versión revisada. El script no necesitó correcciones funcionales tras la revisión local; SHA256 `b090b4540d15a8ca22e36c8ded88e95af2fe3bc1e72660f43ad1a7d25d4c6e81`.

## Smoke incluido al activar

El script comprueba HTTPS con certificados válidos y rechaza redirecciones para no reenviar credenciales a otro destino. Verifica:

1. Modo privado, capacidad habilitada, zona Cancún y cookies Secure/HttpOnly/SameSite.
2. Login de las siete cuentas; rechazo de la contraseña demo compartida y del encabezado falso sin cookie.
3. Una alta sintética de Ana en un horario futuro libre, seguida de replay con el mismo requestId: debe devolver el mismo tour.
4. Propietario, jefe original y admin leen; rep vecino y otra sala no leen. Un PATCH con actor falso no modifica el tour privado.
5. Proyecciones públicas y contexto no contienen los nombres sintéticos.
6. Borra únicamente el tour creado por ese requestId y nombre sintético, comprueba que desaparece y que las visitas preexistentes no cambiaron. No usa `/reset`.
7. Cierra todas las sesiones del smoke. El tombstone técnico sin PII queda por diseño.

La limpieza se intenta también ante error y puede localizar la alta por requestId después de una respuesta incierta. No se elimina ningún tour solo por coincidencia de nombre. Un fallo de limpieza queda expresamente reportado para revisión; no se afirma que la app quedó limpia sin comprobarlo.

Las respuestas finales JSON contienen únicamente estado, conteos, rutas de archivos y booleanos. Guardar esa salida como evidencia de activación, nunca copiar la entrega de claves al repo. Para entregar acceso al usuario, el coordinador puede transferir el archivo privado por SSH a una ubicación local fuera del repositorio con permisos 0600; este script no realiza esa transferencia.
