# Guía del tablero de sala

URL: https://salesacademy.softvibes.art/ops/

Página de escritorio. No va dentro del teléfono.

## Roles

El tablero entra como **Jefe de sala**. El rol se guarda en esa pestaña. No hay contraseña.

| Rol | Ve | Puede |
|---|---|---|
| Jefe Jorge | Sala Norte (Ana, Luis) | Crear, editar, quitar tours de Norte |
| Jefe Rosa | Sala Sur (Mira, Teo) | Lo mismo en Sur |
| Administrador | Las dos salas | Tours, mover un rep de sala, restaurar el ejemplo |
| Rep | No entra al tablero | Solo consulta en la app |

Jorge no asigna a Teo. El servidor lo rechaza.

## Asignar un tour

1. Elige el día (el ejemplo arranca en viernes 6 de noviembre de 2026).
2. En la columna del rep, **Asignar tour**.
3. Lead con forma `Lead #` y 3 o 4 dígitos. Horario de fin posterior al inicio. El celular puede mandar `9:00` o `09:00:00`; el servidor lo guarda como `09:00`.
4. **Guardar**. El formulario está arriba. La tarjeta nueva se marca.

Empalme: aviso y no guarda. Cancelado no cuenta para el empalme.

## Qué baja a la app

El tour queda en el servidor. El rep lo ve al abrir Home o Calendario, al tocar Actualizar, al volver a la pestaña o en el refresco de 15 s. Cancelado no se lista en la app.

Si dos personas editan el mismo tour, queda el último guardado. El otro lo ve al actualizar. No hay websockets.

## Mover de sala

Solo administrador. Los tours se quedan con la persona. Si Luis pasa a Sur, Jorge ya no lo asigna; Rosa sí.

## Restaurar ejemplo

Solo administrador, dos toques. Vuelve al set de demostración (v1–v6).
