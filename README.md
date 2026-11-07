# Sales Academy Vibes

App publicada en [salesacademy.softvibes.art](https://salesacademy.softvibes.art/).

El tablero de sala está en `/ops/`. El Copiloto sigue en `/copiloto/`.

Documentación comercial, ejecutiva y técnica: [`docs/`](docs/) y el sitio [softvibeslab.github.io/salesacademyvibes](https://softvibeslab.github.io/salesacademyvibes/).

Wiki de GitHub (misma fuente en `docs/wiki/`): [github.com/softvibeslab/salesacademyvibes/wiki](https://github.com/softvibeslab/salesacademyvibes/wiki). Si el wiki git aún no existe, guarda una vez la página Home en esa URL y corre `scripts/publish-wiki.sh`.

## App del rep

`prototypes/smart-agenda-mockup/`

Home, calendario, roadmap, recursos, perfil y sincronización de tours con el tablero.

## Tablero

`prototypes/smart-agenda-mockup/ops/`

Jefe de sala y administrador asignan tours. Se guardan en el servidor (`/api/`).

## Prueba e2e del API

```bash
cd prototypes/smart-agenda-mockup
node tests/e2e-ops.mjs
```

Contra el sitio:

```bash
OPS_BASE=https://salesacademy.softvibes.art node tests/e2e-ops.mjs
```
