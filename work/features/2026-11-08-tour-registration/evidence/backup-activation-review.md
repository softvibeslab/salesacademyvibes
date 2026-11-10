# Revisión de respaldos para activación privada

**Fecha:** 2026-11-10, America/Cancun. **Alcance:** inspección de solo lectura. No se crearon, eliminaron ni modificaron respaldos, políticas, credenciales o datos de visitantes.

## Resultado

La retención de la aplicación y los permisos están instalados. No se identificaron trabajos locales que respalden el store en las rutas inspeccionadas. El respaldo creado durante la publicación contiene exclusivamente código y un reporte técnico; no contiene el store ni claves.

La política pública vigente de Hostinger describe rotación de dos copias semanales y dos diarias, cuando estas últimas están habilitadas; cada copia nueva sustituye la más antigua. Las instantáneas manuales expiran al día. La frecuencia semanal es la predeterminada. Por inferencia, la edad habitual de la copia semanal más antigua es menor de catorce días si se ejecuta la cadencia, compatible con un límite de treinta días de retención de cada respaldo. [Fuente oficial consultada](https://www.hostinger.com/support/1583232-how-to-back-up-or-restore-a-vps-at-hostinger/).

Esto verifica la política estándar documentada; no acredita mediante inventario la configuración ni la fecha de las copias del VPS específico. Los conectores Hostinger disponibles no exponen operaciones VPS y la CLI Hostinger no está instalada. No existe evidencia positiva de una retención superior a la política documentada y no se justifica desactivar ni alterar los backups.

## Evidencia local del VPS

SSH de solo lectura a `76.13.231.12`, con la llave del despliegue ya autorizada. Se devolvieron únicamente permisos, rutas y estados; no se abrió el contenido del store ni archivos de credenciales.

| Comprobación | Resultado observado |
|---|---|
| Directorio `/var/lib/salesacademy-ops` | 0700 |
| Store `/var/lib/salesacademy-ops/ops.json` | 0600 |
| `salesacademy-registration-cleanup.timer` | active |
| Respaldo `tour-v1-20261110T214039Z` | Directorio 0700; lista de archivos abajo |
| Búsqueda de referencias al servicio/store o herramientas restic/borg/rsnapshot | Solo coincide con las unidades `salesacademy-ops.service` y `salesacademy-registration-cleanup.service` |

Rutas de configuración inspeccionadas: `/etc/crontab`, `/etc/anacrontab`, `/var/spool/cron/crontabs`, `/etc/cron.d`, `/etc/cron.daily`, `/etc/cron.weekly`, `/etc/cron.monthly`, `/etc/systemd/system`, `/usr/local/bin` y `/usr/local/sbin`. Los archivos se inspeccionaron dentro del proceso remoto y solo se devolvieron nombres de coincidencias. No se afirma exhaustividad fuera de esas rutas ni para scripts arbitrarios sin una referencia identificable.

Contenido observado en `/var/backups/salesacademy-ops/releases/tour-v1-20261110T214039Z`:

- `release-result.json`
- `var/www/salesacademy.softvibes.art/index.html`
- `var/www/salesacademy.softvibes.art/agenda.js`
- `var/www/salesacademy.softvibes.art/ops-api.js`
- `opt/salesacademy-ops/ops_api.py`

## Acceso a evidencia del proveedor

Se consultaron `hostinger_hosting.search` y `hostinger_agency_hosting.search` con consultas VPS/backups/snapshots. Los resultados disponibles corresponden a hosting web o Agency, no a máquinas VPS. No se ejecutó ninguna operación mutadora. `command -v hostinger` terminó con salida 1. La fuente oficial se abrió directamente y mostraba actualización cinco días antes de la consulta; se prefirió esa página a versiones antiguas indexadas con caducidades distintas.

Si el coordinador requiere inventario directo adicional, la ubicación documentada es hPanel → VPS correspondiente → Backups & Monitoring → Snapshots & Backups. Basta leer frecuencia y fechas; no es necesario cambiar la política. Esta revisión no tomó control del navegador para evitar interferir con su UAT.

## Límite de la afirmación de retención

Treinta días de vida de un registro en la aplicación y treinta días de vida de una copia de seguridad son contadores distintos. Un backup puede capturar un registro poco antes de su purga; por tanto, no debe afirmarse que todo rastro en respaldos desaparece antes del día 31 contado desde la captura original. El máximo de 31 días comprobado por el timer corresponde al almacén activo. No se comprobó purga selectiva dentro de snapshots del proveedor.

Recomendación: conservar la política del proveedor y la limpieza instalada; registrar la política estándar y esta distinción en el cierre. Si CP2 se interpreta como eliminación absoluta de toda copia a los 31 días desde el registro, ese requisito no está acreditado y no debe declararse cumplido sin resolver expresamente su alcance. No hay una justificación observada para modificar backups de otros servicios del VPS.
