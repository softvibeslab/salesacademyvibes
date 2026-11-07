# Intake (CP0)

**Status:** approved
**Feature:** `login-demo`
**Product:** `Sales Academy (salesacademy.softvibes.art)`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`
**Historia:** N/A — Excepcion Ready (ver abajo)

Excepcion Ready: el PO pidió el login y los usuarios demo para empezar pruebas con testers y eligió el carril «Excepción Ready (urgencia): construyo primero y documento después» en el diálogo de decisiones de Claude Code del 2026-11-07. Las decisiones de contenido quedaron registradas en el mismo diálogo (ver `decision-log.md`). TDD y TRUST 5 se mantienen.

## 1. Entrada

Origen: conversación con el PO, 2026-11-07 («agrégale un login y crea usuarios demo»), tras el diagnóstico de lo que falta para pruebas en producción.

Resumen en una frase: reemplazar la identidad declarada (chips y encabezado `X-Ops-Actor`) por login con sesión, con usuarios demo, y poner a Hermes detrás de la sesión.

## 2. Contexto

- Hasta hoy cualquiera elegía su identidad en pantalla y la API aceptaba escrituras con solo declarar un rol (RSK-002 del corte anterior).
- `/copiloto/api/hermes` era público: cualquiera con la URL podía consumir el modelo.

## 3. Fuentes

| Fuente | Tipo | Acceso | Sensible |
|---|---|---|---|
| Diálogo de decisiones del PO | conversación | sesión Claude Code 2026-11-07 | no |
| Pantalla «12 · Acceso» | Stitch | proyecto Smart Agenda Material 3 | no |
| Código del corte | repo | `feat/sala-tours-sync` | no |

## 4. Preguntas Abiertas

- [x] Ninguna bloqueante (contraseñas, Hermes, flujo y carril decididos por el PO).

## 5. No-Goals

- SSO, recuperación de contraseña, alta de usuarios desde la UI, multi-tenant.
- Login del Copiloto standalone (sigue con sus selectores de demo; solo Hermes exige sesión).

## 6. Capas Afectadas

- [x] backend (`server/ops_api.py`, puente `copiloto-rep/server.mjs`)
- [x] frontend (app `agenda.js`, `ops-api.js`; tablero `ops/ops.js`)

## 7. Responsables

- Accountable: Roger (PO)
- Responsible: agente de desarrollo
