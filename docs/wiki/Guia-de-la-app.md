# Guía de la app del rep

URL: https://salesacademy.softvibes.art/

La app cabe en un teléfono. El dock tiene cinco destinos: Home, Roadmap, Copiloto, Recursos, Perfil.

## Identidad

En Home y Calendario hay chips: Ana, Luis, Mira, Teo. Eso simula quién abre el teléfono. La elección se guarda en esa pestaña (`sa.app.rep`). No es un login.

| Persona | Sala |
|---|---|
| Ana | Norte |
| Luis | Norte |
| Mira | Sur |
| Teo | Sur |

## Home

Fecha de ejemplo: viernes 6 de noviembre de 2026. No usa el día real del reloj.

- Indicadores (ejemplo): presentaciones 3/4, cierres 1/2, volumen $8,000 de $12,000. Tocan Perfil.
- Tours de hoy: los que el servidor tiene para esa persona en `2026-11-06`, sin cancelados.
- Ahora: recordatorio o bloque de coaching de ejemplo.
- Prioridades y atajos: se pueden reordenar. Máximo 6 atajos, en `localStorage` (`sa.home.shortcuts`).

**Actualizar** vuelve a pedir los tours. Si dejas Home abierto, también se piden al volver a la pestaña y cada 15 s.

## Calendario

Semana de ejemplo que empieza el lunes 2 de noviembre de 2026. Punto dorado si ese día tiene tour. El sábado 7 muestra el tour de Ana (Lead #441) solo si la identidad es Ana.

**Abrir tablero de sala** va a `/ops/`.

## Roadmap

11 pasos de la venta consultiva. El progreso de «listo» es ejemplo en memoria: se pierde al recargar.

| n | Título |
|---|---|
| 1 | Meet & Greet |
| 2 | Control de agenda |
| 3 | Rapport (FORM) |
| 4 | Descubrimiento |
| 5 | Renovar el pacto |
| 6 | Presentación a tres |
| 7 | Recorrido |
| 8 | Casos de éxito |
| 9 | Punto de confirmación |
| 10 | Precio y negociación |
| 11 | Cierre y bienvenida |

Cada paso abre un plan. El video demo es el mismo en todos: YouTube `PkB9UAx2fuI` (youtube-nocookie). Practicar abre Copiloto.

## Recursos

19 skills, 5 fichas de biblioteca, 4 prácticas. Cada ítem abre plantilla y vista previa. **Usar esta plantilla** pone la frase en el Copiloto embebido y no la envía sola. SK-18 manda el rol manager.

## Perfil

Rendimiento de ejemplo en Hoy / semana / mes. No lee el API de tours.

## Copiloto

Pestaña del dock: iframe persistente a `/copiloto/?embed=1`. La ruta `/copiloto/` sigue existiendo fuera de la app.
