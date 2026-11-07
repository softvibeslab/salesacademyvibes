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

- Indicadores: presentaciones, cierres y volumen del día salen de tus resultados guardados (el abandono cuenta como presentación; el volumen suma solo ventas en USD). Las metas 4, 2 y $12,000 siguen siendo de ejemplo. Tocan Perfil.
- Tours de hoy: los que el servidor tiene para esa persona en `2026-11-06`, sin cancelados. Cada tour muestra su estado y su resultado (`Venta · USD 8,000`, `No venta · recuperable`, `Abandono · paso 6` o `Sin resultado` si ya terminó). Tocar un tour abre Registrar resultado.
- Ahora: recordatorio o bloque de coaching de ejemplo.
- Prioridades y atajos: se pueden reordenar. Máximo 6 atajos, en `localStorage` (`sa.home.shortcuts`).

**Actualizar** vuelve a pedir los tours. Si dejas Home abierto, también se piden al volver a la pestaña y cada 15 s.

## Calendario

Semana de ejemplo que empieza el lunes 2 de noviembre de 2026. Punto dorado si ese día tiene tour. El sábado 7 muestra el tour de Ana (Lead #441) solo si la identidad es Ana.

**Abrir tablero de sala** va a `/ops/`.

## Registrar resultado

Desde un tour de Home o con el atajo Registrar presentación. Eliges el tour (solo los tuyos que ya terminaron), el resultado y sus datos: venta pide divisa y volumen; no venta pide la objeción del catálogo, si se puede recuperar y, si sí, el siguiente paso con fecha y responsable; abandono pide el paso del roadmap donde se cortó. La nota es opcional (120 máximo, sin nombres, correos ni teléfonos). Vista previa y Confirmar. Si alguien más guardó antes, la app avisa y puedes actualizar sin perder lo capturado. El jefe puede corregir o quitar el resultado desde el tablero.

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

## Enviar una cotización por WhatsApp

En las fichas de Cotizar hay un bloque «Enviar al cliente por WhatsApp»: WhatsApp y Lead # opcionales. Con número abre el chat directo; sin número, WhatsApp te deja elegirlo. El número no se guarda en ningún lado; al enviar se agrega «Seguimiento WhatsApp» a Tus prioridades. El Copiloto tiene lo mismo en la hoja «Tu membresía».

## Botón flotante de atajos

En toda la app hay un botón dorado flotante: tócalo para Registrar resultado, Nueva nota, Cotizar membresía, Nuevo bloque o abrir el Tablero de sala. Arrástralo a donde te acomode; recuerda su posición. En la pestaña Copiloto se oculta: el Copiloto trae el suyo, que además lleva su navegación (Hoy, Catálogo, Mi mes) porque ya no tiene barra inferior.

## Perfil

Rendimiento de ejemplo en Hoy / semana / mes. No lee el API de tours.

## Copiloto

Pestaña del dock: iframe persistente a `/copiloto/?embed=1`. La ruta `/copiloto/` sigue existiendo fuera de la app.
