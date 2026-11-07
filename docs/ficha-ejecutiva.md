# Ficha ejecutiva

**Corte:** 7 de noviembre de 2026.  
**Estado del demo:** Yellow. El recorrido de tours cierra de punta a punta. No está listo para operación real.  
**Lectura:** menos de tres minutos.

## Situación

Sales Academy necesita una sola webapp de sala: el día del representante, el Copiloto y un tablero para que el jefe asigne tours. El sitio es [salesacademy.softvibes.art](https://salesacademy.softvibes.art/): app, `/ops/` y `/copiloto/`. Código de este corte: [softvibeslab/salesacademyvibes](https://github.com/softvibeslab/salesacademyvibes), rama `feat/sala-tours-sync`.

## Hallazgos

La app del rep ya no es un mock suelto. Home junta indicadores de ejemplo, tours del día, ahora, prioridades y atajos. El roadmap tiene 11 pasos; cada uno abre un plan con video demo. Recursos abre plantilla y vista previa (19 skills, 5 fichas, 4 prácticas). El Copiloto sigue embebido y en su URL.

El hueco comercial era el tablero: asignar un tour no bajaba al teléfono del rep. Eso ya no vive en `localStorage`. Hay un JSON en el VPS. El tablero escribe. La app lee. Jorge ve Norte. Rosa ve Sur. Ana, Luis, Mira y Teo consultan lo suyo.

Se comprobó dos veces: `tests/e2e-ops.mjs` en local y en el sitio, y un recorrido en dos vistas (Rosa asigna a Teo; Teo lo ve; Ana no). **Brecha de dato (no estimado):** no hay usuarios, conversión ni ingreso. Presentaciones 3/4, cierres 1/2 y volumen $8,000 de $12,000 son ejemplo, no ventas.

El demo no tiene contraseña. El rol se elige en pantalla. Los leads van como `Lead #`. Deliberado mientras no haya tours reales.

## Impacto de negocio

Hoy se puede mostrar a un jefe: «tú asignas, el rep lo ve». Eso no existía cuando el tablero vivía en el navegador. No se puede afirmar adopción, ahorro ni cierre de piloto. **Brecha de dato.**

Riesgo principal: alguien toma el demo por un sistema de producción y carga nombres reales. La API acepta escrituras con un encabezado de rol. No es autenticación.

## Recomendaciones

1. Usar este sitio como artefacto de demo, no como operación. Owner: Roger. Plazo: inmediata. Resultado: un jefe recorre `/ops/` y la app en una llamada, sin pedir cuenta.
2. No cargar tours reales hasta cerrar identidad. Owner: Roger. Plazo: antes del primer dato de sala. Resultado: no hay `Lead #` de cliente ni apellido en el JSON del VPS.
3. Dejar `feat/sala-tours-sync` como rama de este corte y documentar el wiki como fuente. Owner: Roger. Plazo: este corte. Resultado: un visitante del repo llega al wiki y a las tres URLs live.

## Siguientes pasos

- Recorrido guiado con un jefe (Rosa) y un rep (Teo). Criterio: el tour aparece en Home sin compartir navegador.
- Decidir si el siguiente corte es autenticación o Copiloto versionado en este mismo repo. El Copiloto live existe; su fuente no se subió aquí porque tiene git propio.
- No estimar ingresos ni fechas de piloto hasta tener un criterio de sala real. **Brecha de dato.**
