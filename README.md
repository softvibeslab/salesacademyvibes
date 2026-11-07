# Sales Academy Vibes

App publicada en [salesacademy.softvibes.art](https://salesacademy.softvibes.art/).

El tablero de sala está en `/ops/`. El Copiloto sigue en `/copiloto/`.

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
