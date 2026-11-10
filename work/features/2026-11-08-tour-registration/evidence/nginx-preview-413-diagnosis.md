# Diagnóstico de HTTP 413 en preview del survey

**Fecha:** 2026-11-10. **Alcance:** solo lectura y solicitud sintética sin cookie. No hubo cambios de nginx, reinicios, lectura de claves ni escrituras de tours.

## Causa confirmada

Configuración activa por symlink:

- `/etc/nginx/sites-enabled/salesacademy.softvibes.art.conf`
- Archivo real: `/etc/nginx/sites-available/salesacademy.softvibes.art.conf`

El servidor declara `client_max_body_size 1m` en la línea 6, pero la ubicación `/api/` lo sobrescribe a `32k` en la línea 24:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:8026;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $remote_addr;
    client_max_body_size 32k;
}
```

En Python, `ops_api.py:546` admite 2,000,000 bytes para `/tour-registrations/preview`; `survey_preview.py` admite 1,500,000 bytes de imagen decodificada. La respuesta HTTPS se genera antes de alcanzar ese código.

## Reproducción observada

POST al mismo endpoint con JSON sintético de 80,034 bytes, Origin del sitio y sin cookie:

| Destino | HTTP | Content-Type | Código JSON |
|---|---|---|---|
| `http://127.0.0.1:8026/api/tour-registrations/preview` | 401 | application/json | authentication_required |
| `https://salesacademy.softvibes.art/api/tour-registrations/preview` | 413 | text/html | No es respuesta JSON del backend |

El 401 directo prueba que el cuerpo de ese tamaño llega a la guarda de autenticación. El 413 HTTPS confirma el rechazo del proxy. No se envió una foto real ni se autenticó esta reproducción.

## Parche mínimo propuesto, no aplicado por esta revisión

Agregar esta ubicación exacta al mismo bloque `server`, antes de la ubicación general `/api/`. Mantener intacta esta última y su límite de 32k para los demás endpoints.

```nginx
location = /api/tour-registrations/preview {
    proxy_pass http://127.0.0.1:8026;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $remote_addr;
    client_max_body_size 2000000;
}
```

No es necesario ampliar el límite de creación manual, cuyo backend admite 8,192 bytes, ni cambiar el límite global, otros vhosts o el endpoint de Hermes. Tampoco hace falta aumentar el timeout: el OCR ya tiene un plazo de veinte segundos, inferior al timeout habitual del proxy sin sobrescritura.

Validación recomendada al coordinador: respaldo acotado de ese archivo, `nginx -t`, reload, repetir el probe sintético HTTPS (ahora 401 JSON) y el preview autenticado con el fixture aprobado. Verificar que el exceso de 2,000,000 bytes continúe rechazado y que las demás rutas mantengan 32k. No ejecutar reset.

## Verificación independiente después del parche del coordinador

El coordinador informó la aplicación de la ubicación exacta con límite 2,000,000 y timeout 30s, preservando headers y el límite general de 32k. Esta revisión no hizo mutaciones.

Se repitieron por HTTPS tres comprobaciones sin cookie, todas con el resultado esperado (exit 0):

| Comprobación | Resultado |
|---|---|
| Preview con JSON sintético de 80,034 bytes | 401 JSON, `authentication_required`: alcanza backend |
| Preview con `Content-Length: 2000001` y sin transmitir cuerpo | 413 HTML: nginx rechaza el tamaño declarado antes de recibir la imagen |
| `/api/login` con el mismo JSON sintético de 80,034 bytes | 413 HTML: el límite de la API general no fue ampliado |

Evidencia estructurada: `nginx-preview-413-green.json`. La comprobación de exceso valida el rechazo por longitud declarada; no se afirma haber subido una imagen de más de 2 MB. La prueba OCR autenticada corresponde al coordinador.
