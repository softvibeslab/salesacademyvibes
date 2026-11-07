# Constructor reproducible · validación

Contrato: AC-03, AC-05, AC-06 y AC-08 de `../cp2-spec.md`. Solo construcción y QA local; no despliegue.

## TDD ejecutado

| Tarea | Estado | Comando | Salida observada |
|---|---|---|---|
| T-build-release | RED | `python3 -m unittest discover -s growth/deploy/versions -p test_build_release.py -v` | 13 tests, 15 fallos por comportamiento ausente y 1 error por archivo de índice todavía inexistente; sin errores de compilación/importación. Ver `build-release-red.txt`. |
| T-build-release | GREEN | Mismo comando | 13 tests OK. Ver `build-release-green.txt`. |

Los tests cubren whitelist, integridad incluso de miembros excluidos, cobertura exacta de manifiesto/ZIP, ZIP alterado, traversal, rutas no portables, symlinks, duplicados, runtime incompleto, destino existente, índice opcional, reproducibilidad y wrapper con DATA_ROOT privado/configuración segura.

## Ejecución con los cinco paquetes reales

Se ejecutó dos veces la CLI en directorios temporales separados. Se verificaron 1,704 miembros de archivo y todos los hashes de salida. Ambos manifiestos fueron idénticos byte a byte. Se incluyó el índice presente al momento de la validación. Evidencia: `build-release-real.json`.

Archivos de runtime por versión: v1=27, v2=33, v3=60, v4=88, v5=99. Se añaden cinco wrappers WSGI y los archivos del índice. Los árboles son menores que el inventario original porque ahora se aplica la whitelist de despliegue, excluyendo documentación/evidencias/test del archivo original.

Se importó cada `wsgi.py` real en un proceso separado, usando el venv local existente y bases temporales fuera del release. En las cinco versiones: `/growth-api/health`, `/descubre/`, `/mediahub/` y `/cms/` devolvieron 200; `/cms/api/session` sin sesión devolvió 401; `X-Forwarded-Proto: https` produjo HSTS, con `COOKIE_SECURE=True` y `PUBLIC_CONTACT_ENABLED=False`. Evidencia: `build-release-wsgi.json`.

## Interfaz de entrega

```sh
python3 growth/deploy/versions/build_release.py --output /ruta/nueva/release
python3 growth/deploy/versions/build_release.py --source-root /ruta/producto --output /ruta/nueva/release
```

Salida: `v1/` a `v5/`, cada una con `growth/` y `wsgi.py`; `index/` cuando existe su fuente; y `release-manifest.json` con procedencia y hashes. El destino debe ser nuevo: no se sobrescribe ningún release. La CLI fija los cinco SHA-256 revisados y no permite seleccionar archivos alternativos.

Gunicorn se inicia desde cada `vN/` con entry point `wsgi:app`. `SA_GROWTH_DATA_ROOT` debe ser una ruta absoluta fuera del release. El wrapper confía en exactamente un proxy para `X-Forwarded-For` y `X-Forwarded-Proto`; la configuración del proxy debe reemplazar esos encabezados y enlazar Gunicorn a loopback.

## TRUST 5 proporcional

- Trazable: AC citados y pruebas RED/GREEN con salida preservada.
- Reproducible: dos builds reales, contenido/manifest idénticos; sin timestamp o rutas absolutas dentro del manifiesto, permisos y mtimes estables.
- Utilizable: CLI y wrappers comprobados con los cinco paquetes reales.
- Seguro: extracción manual restringida, SHA fijados, validación de todos los miembros, rechazo de rutas/symlinks/archivos especiales y ausencia de datos persistentes en la salida.
- Testeado: 13 pruebas y smoke local de cinco procesos. TLS/DNS/Nginx/systemd y QA HTTPS remoto corresponden a la fase de despliegue del agente principal.
