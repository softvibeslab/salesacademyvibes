# Contexto de hosting para SalesAcademy Cloud

Fecha: 2026-11-07. Investigación local de solo lectura de infraestructura; este documento es la única escritura de esta tarea. No se consultó el VPS, no se modificaron DNS ni servicios y no se leyeron llaves, secretos o archivos privados de credenciales.

## Alcance autorizado

Publicar las versiones existentes de SalesAcademy en `salesacademy.softvibes.cloud`, con un índice y rutas por versión. La nueva publicación debe aislarse de las aplicaciones actuales en `.art` y `.pro`. La instrucción actual del usuario autoriza publicar; las restricciones históricas de otros proyectos no autorizan intervenirlos.

## Infraestructura encontrada

| Elemento | Evidencia local | Observación |
| --- | --- | --- |
| VPS | `salesmastersminds`, IPv4 `76.13.231.12` | Documentado por la recuperación de hosting de noviembre; confirmar estado actual al conectar. |
| SSH del VPS actual | `root@76.13.231.12`, llave `~/.ssh/rovi_vps_deploy` | Referencia pública en `turquesa-importaciones/deploy/publicar-api.sh`; no se abrió la llave. |
| Opciones SSH existentes | `BatchMode=yes`, `IdentitiesOnly=yes`, `StrictHostKeyChecking=yes` | Mantener validación del host; no desactivar comprobaciones por conveniencia. |
| Recuperación existente | `/srv/softvibes-recovery-20261105` | Infraestructura compartida recuperada; crear publicación nueva y acotada, sin reemplazar esta raíz ni sus manifiestos completos. |
| Proxy | Nginx, servicios internos sobre loopback | Comprobar listeners y configuración actual antes de elegir puerto. |
| ACME HTTP webroot | `/var/www/softvibes-recovery-acme` | Disponible en los vhosts generados por el recuperador. |
| Renovación TLS | `certbot.timer` | Hook documentado: `/etc/letsencrypt/renewal-hooks/deploy/softvibes-recovery-reload.sh`. |
| Certificados existentes | Nombres `recovery-*` | `recovery-softvibes-cloud` aparece para otros dominios; su nombre no prueba cobertura de `salesacademy.softvibes.cloud`. |

Los scripts antiguos de varios sitios apuntan a `31.220.63.211`; ese destino no corresponde al VPS actual documentado para SalesAcademy y no debe inferirse a partir de ellos. `~/.ssh/config` sólo incluye la configuración de Colima y no aporta un alias del VPS.

El manifiesto público de recuperación no contiene `salesacademy.softvibes.cloud`. Esto describe los archivos locales revisados, no demuestra que el dominio o un vhost no existan actualmente.

## Límites para preservar la aplicación actual

`docs/stack-y-api.md` del producto documenta:

- `.art`: webroot `/var/www/salesacademy.softvibes.art/`, proxy `/api/` al puerto `8026`.
- API operativa: `/opt/salesacademy-ops/ops_api.py`, `/opt/salesacademy-ops/ops_import.py`, servicio `salesacademy-ops`.
- Puerto `8010`: corresponde a `.pro`; no modificarlo.
- Acceso SSH: «host y llave en el runbook privado del equipo, fuera de este repo». No proporciona una ruta concreta al runbook.

El recuperador reserva históricamente puertos `18101`–`18104` para aplicaciones Node, `18201`–`18204` para PHP y `18328` para una variante de Berova. Existen otros puertos de sitios estáticos. Estas referencias no sustituyen una inspección actual de listeners.

## Procedimiento recomendado para el despliegue autorizado

1. Inspeccionar en vivo, sin mutar, DNS de `salesacademy.softvibes.cloud`, vhost existente si lo hay, certificados, capacidad, listeners y servicios. Resolver cualquier publicación previa conservando su contenido y configuración.
2. Preparar una raíz y servicio propios para Cloud. Determinar con el inventario de versiones qué rutas son estáticas y cuáles requieren el CMS. Mantener datos mutables fuera del directorio de releases y fuera de los artefactos públicos.
3. Respaldar únicamente los archivos existentes que vaya a cambiar esta publicación y registrar su estado. No reutilizar las copias originales de la recuperación ni modificar aplicaciones de terceros.
4. Agregar un vhost exclusivo para `salesacademy.softvibes.cloud`; si necesita backend, enlazarlo a loopback con puerto comprobado como libre. Mantener los encabezados de proxy que requiere la aplicación.
5. Crear o ajustar sólo el registro DNS específico requerido para este subdominio. Preservar MX, TXT y registros de los demás nombres.
6. Verificar si un certificado existente cubre explícitamente el nuevo dominio. Si no, emitir uno independiente con el cliente ACME y la cuenta existentes, mediante HTTP webroot una vez que el dominio resuelva al VPS. Evitar `certbot --nginx` sobre el conjunto de configuración y no reemplazar certificados compartidos.
7. Ejecutar `nginx -t` antes de recargar. Validar HTTPS, índice, cada versión, rutas profundas, recursos, videos, CTA a WhatsApp y persistencia/autorización del CMS si forma parte de la entrega.
8. Registrar rutas públicas verificadas y rollback. Si hay regresión, restaurar sólo la configuración/release de Cloud; preservar cualquier dato nuevo escrito en el CMS.

La configuración de referencia del recuperador permite `/.well-known/acme-challenge/` con raíz `/var/www/softvibes-recovery-acme`, redirige el resto del HTTP a HTTPS y bloquea archivos ocultos salvo `.well-known`. El flujo de emisión usa `certbot certonly --non-interactive --webroot --webroot-path ... --cert-name ... --keep-until-expiring -d ...`; requiere adaptar el nombre y dominio a esta publicación, sin reutilizar la autorización histórica del plan de migración.

## Fuentes locales

Rutas relativas al workspace `/Users/rogergv/Documents/SoftvibesLab/SoftvibesSites`:

- `AGENTS.md`
- `recuperacion-hosting-20261104/deploy/RESPALDOS-Y-OPERACION.md`
- `recuperacion-hosting-20261104/RESULTADO-MIGRACION.md`
- `recuperacion-hosting-20261104/deploy/ROLLBACK.md`
- `recuperacion-hosting-20261104/deploy/nginx-config.py`
- `recuperacion-hosting-20261104/deploy/emitir-certificados.py`
- `recuperacion-hosting-20261104/deploy/proxy-manifest.json`
- `recuperacion-hosting-20261104/notas-dns.md`
- `turquesa-importaciones/deploy/publicar-api.sh`

Fuente del producto: `/Users/rogergv/Documents/SoftvibesLab/SalesAcademyVibes/docs/stack-y-api.md`.

## Pendientes de verificación en vivo

No se verificaron acceso SSH, huella del host, DNS actual, disponibilidad de puertos, capacidad, contenido servido, cobertura TLS ni funcionamiento del CMS. Los informes de migración contienen métricas históricas de capacidad; no se presentan como estado actual. Esta tarea no concede acceso ni autorización adicional sobre otros sitios.
