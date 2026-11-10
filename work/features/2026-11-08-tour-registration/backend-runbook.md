# Runbook backend · Registro privado de tours

**Estado:** modo privado activo desde el 2026-11-10. Evidencia de ejecución en `evidence/activation-private.json` y `activation-runbook.md`.
**Fecha:** 2026-11-10

## Paquete y datos

Conservar el store existente; no ejecutar `reset` ni copiar fixtures sobre producción.

Destino de código observado: `/opt/salesacademy-ops/`. Instalar juntos `ops_api.py`, `ops_import.py`, `ops_context.py`, `ops_tasks.py`, `private_auth.py`, `tour_registration.py`, `survey_preview.py`, `provision_private_user.py` y `cleanup_registrations.py`. El API importa estos módulos al arrancar.

Store existente: `/var/lib/salesacademy-ops/ops.json`. Directorio privado `0700`, archivo `0600`, propietario de servicio `www-data`. Las escrituras atómicas crean archivos `0600`. La colección `tourRegistrations` no se envía a endpoints públicos. No migrar, reinicializar ni transformar visitas existentes durante instalación.

## Configuración segura

El código funciona inicialmente con `OPS_TOUR_REGISTRATION_ENABLED=0`; conserva la demo previa. Para activar captura real, preparar en el archivo de entorno del servicio:

```text
OPS_AUTH_MODE=private
OPS_PRIVATE_CREDENTIALS_FILE=/etc/salesacademy-ops/private-users.json
OPS_TOUR_REGISTRATION_ENABLED=1
OPS_TOUR_REGISTRATION_MODE=private
OPS_TIME_ZONE=America/Cancun
OPS_TOUR_REGISTRATION_ORIGIN=https://salesacademy.softvibes.art
```

El archivo de credenciales queda fuera del repo, `0600`, legible por el usuario del servicio. El modo privado es global: deja de aceptar la contraseña demo compartida. Al rotar o retirar una credencial se invalidan las sesiones de ese usuario mediante una huella de su versión y material de credencial. Al cambiar de modo no se aceptan sesiones del modo anterior.

No habilitar hasta verificar cuentas privadas, permisos, retención y backups. En la publicación del 2026-11-10 se corrigió y verificó el directorio a `0700`, conservando propietario; store `0600`. El endpoint de capacidades reporta `canRegister:false` si el almacenamiento privado no cumple.

## Provisión sin exponer contraseñas

La herramienta recibe contraseña por stdin o solicita entrada oculta cuando corre desde terminal interactiva. No usar contraseña en argumentos ni guardar una contraseña real en documentación/historial.

```bash
python3 /opt/salesacademy-ops/provision_private_user.py --file /etc/salesacademy-ops/private-users.json --user ana
```

Repetir para cada ID real del directorio y para `admin`, con credenciales individuales. La herramienta rota versión/sal/hash en cada ejecución y no imprime la contraseña ni el hash. Validar IDs contra el directorio vigente antes de provisionar: el login solo acepta admin o personas existentes. Debe preservarse propietario legible por el servicio al operar desde otra cuenta del sistema.

Revocar un usuario:

```bash
python3 /opt/salesacademy-ops/provision_private_user.py --file /etc/salesacademy-ops/private-users.json --user ana --delete
```

## Retención

Instalar `salesacademy-registration-cleanup.service` y `.timer` en `/etc/systemd/system/`. El servicio usa el mismo store y bloqueo que la API; no recorre ni toca otros productos. El timer diario es persistente. La API además purga al arrancar y en operaciones; las lecturas nunca devuelven registros vencidos. Plazo personal 30 días, máximo operativo 31 días por cadencia diaria.

```bash
systemctl daemon-reload
systemctl enable --now salesacademy-registration-cleanup.timer
systemctl list-timers salesacademy-registration-cleanup.timer
systemctl restart salesacademy-ops
```

El borrado de PII conserva agenda anónima y tombstone sin hash personal. Reintentar ese requestId devuelve `409 registration_expired`. El borrado autorizado de un tour elimina también su registro privado. Deben validarse backups por separado: este código no garantiza la retención de copias remotas ni modifica sus políticas.

La revisión de respaldos está en `evidence/backup-activation-review.md`: copias de release sin datos; política estándar de Hostinger con rotación inferior a 30 días, sin inventario individual acreditado. El plazo del almacén activo y la edad de cada respaldo son distintos; no se promete eliminación absoluta de toda copia en 31 días. Antes de reabrir una restauración, ejecutar la limpieza con la fecha actual y verificar permisos y credenciales privadas.

Para ejecutar solo la limpieza, bajo el mismo usuario/entorno del servicio:

```bash
OPS_DATA=/var/lib/salesacademy-ops/ops.json python3 /opt/salesacademy-ops/cleanup_registrations.py
```

## Verificación local ejecutada

Desde `prototypes/smart-agenda-mockup`:

```bash
python3 -B tests/test_tour_registration.py
python3 -B -m unittest discover -s tests -p 'test_*.py'
env -u OPS_BASE node tests/e2e-ops.mjs
```

Pruebas locales usan directorios temporales, cuentas sintéticas y localhost. Nunca ejecutar la suite e2e anterior con `OPS_BASE` de producción: incluye reset. La revisión publicada debe ser no destructiva o usar un staging con store separado.

`GET /api/tour-registrations/capabilities` es seguro sin sesión; `canRegister` solo es verdadero con sesión adecuada. Para pruebas funcionales, iniciar sesión y enviar JSON con Origin del sitio; no usar `X-Ops-Actor`. No copiar cookies en reportes. El formulario nuevo funciona sin Tesseract por la ruta manual. OCR requiere ejecutable y datos de idioma `eng`/`spa`; falta, timeout o ilegibilidad devuelven advertencia recuperable y no crean tour.

## Desactivar y rollback

Apagar `OPS_TOUR_REGISTRATION_ENABLED` deshabilita nuevos endpoints, pero las guardas de tours vinculados continúan protegiendo los registros. No volver a una versión de `ops_api.py` anterior a estas guardas mientras existan datos privados. Revertir código sin revisar esa condición dejaría reset/reasignaciones públicas con autoridad sobre visitas vinculadas.


## Proxy de preview publicado

El vhost `/etc/nginx/sites-available/salesacademy.softvibes.art.conf` mantiene `/api/` con 32 KB y añade esta excepción exacta para el contrato de imagen. No aplicar el límite amplio a login, Hermes u otros sitios. La corrección de 413, prueba de nginx, recarga y smoke HTTPS están en `evidence/nginx-preview-413-diagnosis.md`, `nginx-preview-413-green.json` y `https-final-smoke.json`.

```nginx
location = /api/tour-registrations/preview {
    proxy_pass http://127.0.0.1:8026;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_read_timeout 30s;
    client_max_body_size 2000000;
}
```
