# Cambios de este corte

Rama: `feat/sala-tours-sync`. Sitio live con caché `20261107z`. Fecha de corte: 7 de noviembre de 2026.

## Impacto

Un jefe asigna un tour y el representante lo ve en otro navegador. Eso no pasaba cuando el tablero y la app compartían solo `localStorage`.

## Qué se movió

### Producto unificado (cortes anteriores en el mismo sitio)

- Una sola app: Home, Roadmap, Copiloto, Recursos, Perfil.
- Roadmap de 11 pasos. Al elegir un módulo se abre el plan (Agenda Control). Video demo YouTube `PkB9UAx2fuI` en cada paso.
- Recursos con plantilla y vista previa. SK-01 cotiza en pantalla con `pmt` (precio 20,000, 30%, 120 meses, 14.9% → mensual $225.01, enganche $6,000, saldo $14,000).
- Home del día: indicadores, tours, ahora, prioridades, atajos (máximo 6).
- Calendario de la semana de ejemplo.

### Tablero de sala

- Página independiente `/ops/`.
- Admin ve las dos salas. Jefe ve la suya.
- CRUD de tours del día. Mover rep de sala. Restaurar ejemplo.

### Sincronización (este corte)

- API Python en `127.0.0.1:8026`, JSON en disco, nginx `/api/`.
- Identidad en la app (Ana / Luis / Mira / Teo).
- Refresco al abrir, al volver a la pestaña y cada 15 s en Home y Calendario.
- Horas `9:00` y `09:00:00` válidas. Empalme no guarda (409).
- Tablero: entra como jefe, formulario arriba, aviso al guardar, no se borra la pantalla al recargar datos.
- Prueba `tests/e2e-ops.mjs` en local y contra el sitio.

## Qué no cambió

- Copiloto en `/copiloto/`. No se tocó su código en este corte.
- Perfil y volumen de Home siguen siendo ejemplo.
- Progreso del roadmap no se persiste.
- Sin contraseña. Sin websockets. Sin nombres reales.

## Repo

El 7 de noviembre de 2026 se inicializó git en esta carpeta y se empujó a [softvibeslab/salesacademyvibes](https://github.com/softvibeslab/salesacademyvibes) (`main` y `feat/sala-tours-sync`). No se subieron `salesacademyapp`, `vcsAcademyMobile` ni el Copiloto local (git propio o repo aparte).
