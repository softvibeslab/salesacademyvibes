# Stack y API

Hechos del código inspeccionado. Si no está en estos archivos, no se documenta.

**Files inspected:** `prototypes/smart-agenda-mockup/index.html`, `agenda.js`, `ops-store.js`, `ops-api.js`, `ops/ops.js`, `ops/ops.css`, `ops/index.html`, `server/ops_api.py`, `server/salesacademy-ops.service`, `tests/e2e-ops.mjs`.

## Stack

- Front: HTML, CSS y JS, sin bundler. `agenda.js` y `ops/ops.js` son módulos.
- API: Python 3 stdlib (`ThreadingHTTPServer`) en `127.0.0.1:8026`.
- Datos: `/var/lib/salesacademy-ops/ops.json` en el VPS. Un archivo, lock con `fcntl`.
- Proxy: nginx del vhost `salesacademy.softvibes.art` pasa `/api/` a `8026`. El puerto `8010` es de `salesacademy.softvibes.pro`. No se usa.
- Servicio: `salesacademy-ops.service`, usuario `www-data`.
- Copiloto live: `/copiloto/`. Su fuente no está en este repo.

## App del rep

`prototypes/smart-agenda-mockup/`

| Archivo | Rol |
|---|---|
| `index.html` | Shell. Carga `agenda.css` y `agenda.js` con query de caché. |
| `agenda.js` | Vistas, dock, tours, identidad. |
| `styles.css` | Tokens. Se copia a `agenda.css` al publicar. |
| `ops-store.js` | Semilla, fechas locales, `normalizeClock`. |
| `ops-api.js` | `fetch` con encabezado `X-Ops-Actor`. |

Identidad: `sessionStorage sa.app.rep`. Atajos: `localStorage sa.home.shortcuts`. Los tours ya no viven en el navegador.

## Tablero

`prototypes/smart-agenda-mockup/ops/`

Sesión: `sa.ops.role`, `sa.ops.jefe`, `sa.ops.room` en `sessionStorage`.

## Contrato del API

Base live: `https://salesacademy.softvibes.art/api/`

Encabezado: `X-Ops-Actor`. Valores: `admin`, `jefe:jorge`, `jefe:rosa`, `rep:ana`, `rep:luis`, `rep:mira`, `rep:teo`. Eso declara el rol. No autentica.

Lead: `^Lead #\d{3,4}$`.  
Hora guardada: `HH:MM`. Acepta `9:00`, `09:00`, `09:00:00`.

| Método | Ruta | Actor | Qué hace |
|---|---|---|---|
| GET | `/health` | no hace falta | `{ ok: true }` |
| GET | `/directory` | opcional | Salas y personas, sin visitas |
| GET | `/rooms` | admin, jefe, rep | Salas y personas visibles para ese actor |
| GET | `/tours?date=&rep=&room=&from=&to=` | admin, jefe, rep | Visitas filtradas y acotadas al alcance |
| POST | `/tours` | admin, jefe | Crea. 201. 409 si empalma |
| PATCH | `/tours/:id` | admin, jefe | Edita. El id es `v` + dígitos |
| DELETE | `/tours/:id` | admin, jefe | Quita |
| PATCH | `/people/:id` | admin | Cambia `roomId` de un rep |
| POST | `/reset` | admin | Vuelve a la semilla |

Cuerpo de alta o edición:

```json
{
  "repId": "teo",
  "date": "2026-11-06",
  "start": "16:00",
  "end": "17:00",
  "lead": "Lead #210",
  "status": "pendiente",
  "note": "Baja a la app"
}
```

Estados: `confirmado`, `en_curso`, `pendiente`, `cancelado`.

Errores vistos en código: 400 validación, 401 sin rol, 403 fuera de sala o rep que escribe, 404 no existe, 409 empalme.

El rep no crea, no edita y no borra. Si pide `?rep=` de otra persona, 403.

## Semilla

Salas `norte` y `sur`. Personas: Jorge y Rosa jefes; Ana y Luis reps Norte; Mira y Teo reps Sur. Visitas v1–v6 (Ana el 6 y el 7 de noviembre de 2026, Luis, Mira).

## Publicar

Desde `prototypes/smart-agenda-mockup/`:

1. `node --check` de los JS y `python3 -m py_compile server/ops_api.py`.
2. `cp styles.css agenda.css` si cambió CSS.
3. Subir query de caché en `index.html` y `ops/index.html` (último corte: `20261107z`).
4. `rsync` al root `/var/www/salesacademy.softvibes.art/` y, si cambió el API, a `/opt/salesacademy-ops/ops_api.py` y `systemctl restart salesacademy-ops`.
5. `node tests/e2e-ops.mjs` y `OPS_BASE=https://salesacademy.softvibes.art node tests/e2e-ops.mjs`.

SSH del VPS: clave `beglobal_vps_ed25519` a `76.13.231.12`. No reescribir otros vhosts. No tocar el puerto 8010.

## Prueba e2e

`prototypes/smart-agenda-mockup/tests/e2e-ops.mjs` arranca el API en local o pega al live. Cubre: reset, directory, Jorge crea a Ana, Luis no lee a Ana, Rosa no asigna a Ana, hora con segundos, Teo lee lo suyo, lead con nombre real 400, empalme 409, editar, borrar, mover a Luis a Sur.
