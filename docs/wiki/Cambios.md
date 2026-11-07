# Cambios de este corte

Rama: `feat/sala-tours-sync`. Sitio live con caché `20261107r`. Fecha de corte: 7 de noviembre de 2026.

## Impacto

Un jefe asigna un tour y el representante lo ve en otro navegador. Eso no pasaba cuando el tablero y la app compartían solo `localStorage`.

## Qué se movió

### Login (corte `20261107x`)

- Pantalla de Acceso única: reps a su cuaderno, jefes y admin al tablero; identidad por sesión (sin chips ni selector de rol).
- Usuarios demo con contraseña pública para testers; admin con contraseña privada en el servidor.
- Hermes solo responde con sesión.

### Resultado del tour (corte `20261107r`)

- Cada tour puede cerrarse con venta, no venta o abandono; con objeción, recuperable, siguiente paso o paso del roadmap, y nota filtrada (sin correos ni teléfonos).
- El rep lo registra desde la app (tour elegible, vista previa, confirmación, estados de error y conflicto); el jefe lo registra, corrige o quita en `/ops/`, con historial de cambios.
- Versión optimista: dos ediciones simultáneas ya no se pisan (409 con aviso).
- Los indicadores de Home (presentaciones, cierres, volumen) se calculan desde los resultados del día; las metas siguen de ejemplo. Perfil no cambió.
- API: `GET /catalog`, `PUT`/`DELETE /tours/:id/result`; editar un tour conserva su resultado; cancelar exige quitarlo.
- Pruebas: 13 casos nuevos en `tests/e2e-ops.mjs` y `tests/home-counters.mjs`.
- Diseño: pantallas aprobadas en Stitch (móvil y tablero). Los textos «Sincronización instantánea» e «Historial verificado» del mockup no se implementaron a propósito: el refresco sigue siendo de 15 s.

### Producto unificado (cortes anteriores en el mismo sitio)

- Una sola app: Home, Roadmap, Copiloto, Recursos, Perfil.
- Roadmap de 11 pasos. Al elegir un módulo se abre el plan (Agenda Control). Video demo YouTube `PkB9UAx2fuI` en cada paso.
- Recursos con plantilla y vista previa. SK-01 cotiza en pantalla con `pmt` (precio 20,000, 30%, 120 meses, 14.9% → mensual $225.01, enganche $6,000, saldo $14,000).
- Home del día: indicadores, tours, ahora, prioridades, atajos (máximo 6).
- Calendario de la semana de ejemplo.

### WhatsApp y atajos (corte `20261107s`)

- Cotizaciones compartibles por WhatsApp desde las fichas de la app y la hoja «Tu membresía» del Copiloto: con número abre el chat, sin número eliges allá; el teléfono nunca se guarda y queda una tarea de seguimiento interna.
- Chat del Copiloto (corte `20261107v`/`q`): burbujas de inicio según la hora y los tours programados, botón Enviar sin truncarse y zona segura para que el botón flotante no tape el compositor. El puente a Hermes quedó desplegado (server.mjs); falta un paso del operador para encenderlo.
- Un solo botón flotante con menú por contexto (corte `20261107u`): dueño único (el Copiloto embebido ya no dibuja el suyo) y opciones dinámicas por vista; en la pestaña Copiloto maneja al agente vía mensajes internos.
- Botón flotante arrastrable en toda la app (corte `20261107t`): Registrar resultado, Nueva nota, Cotizar, Nuevo bloque y Tablero de sala; recuerda su posición y se oculta en la pestaña Copiloto.
- Copiloto sin barra inferior: Hoy, Catálogo y Mi mes viven en el menú de su botón flotante, junto con Programar tour (fuera del Catálogo), registrar venta/no venta, cotizar y ¿cómo voy?.

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
