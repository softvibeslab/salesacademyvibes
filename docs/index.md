---
title: Sales Academy
---

# Sales Academy

Webapp de sala para el representante, el jefe de sala y el Copiloto. Está publicada. No es un diseño suelto ni tres productos distintos.

## Cómo empezarla

1. Abre la [app del rep](https://salesacademy.softvibes.art/).
2. Abre el [tablero de sala](https://salesacademy.softvibes.art/ops/).
3. El [Copiloto](https://salesacademy.softvibes.art/copiloto/) sigue en su ruta.

Rosa asigna un tour a Teo en el tablero. En la app, Teo lo ve. Ana no.

## Documentación

| Página | Para quién |
|---|---|
| [Status](status.html) | Dirección |
| [Inicio rápido](inicio-rapido.html) | Quien va a abrir el demo |
| [Ficha ejecutiva](ficha-ejecutiva.html) | Dirección y comercial |
| [Guía de la app](guia-app.html) | Rep |
| [Guía del tablero](guia-tablero.html) | Jefe de sala y admin |
| [Stack y API](stack-y-api.html) | Ingeniería |
| [Cambios](cambios.html) | Ingeniería y producto |
| [Avance y proyección](avance-y-proyeccion.html) | Dirección y producto |
| [Privacidad y límites](privacidad.html) | Todos |

## Qué hay hoy

- **App del rep:** Home del día, calendario, roadmap de 11 pasos, recursos con plantilla, perfil de ejemplo y Copiloto embebido.
- **Tablero:** administrador y jefe de sala crean, editan y quitan tours. Cada jefe ve su sala.
- **Servidor:** un JSON en el VPS. El tablero escribe. La app lee.

## Qué no es

No hay contraseña. Los indicadores de volumen y cierres son un ejemplo de jornada, no ventas reales. Los leads van como `Lead #4920`. Los nombres son de pila: Ana, Luis, Mira, Teo, Jorge, Rosa.

## Repo

Código: [softvibeslab/salesacademyvibes](https://github.com/softvibeslab/salesacademyvibes)

Rama de este corte: `feat/sala-tours-sync`
