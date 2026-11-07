# SRS (CP1)

**Status:** approved
**Feature:** `login-demo`
**Owner:** `Roger (PO)`
**Date:** `2026-11-07`
**Intake:** `cp0-intake.md`

## 1. Problem

Cualquiera puede actuar como cualquier usuario del demo y consumir Hermes sin restricción; no se puede probar con personas reales.

## 2. Users And Needs

| User / Area | Need | Priority |
|---|---|---|
| Tester rep | Entrar con su usuario y ver solo lo suyo | must |
| Tester jefe | Entrar y gestionar solo su sala | must |
| Admin (PO) | Entrar con credencial que nadie más conoce | must |
| PO | Que el modelo de Hermes no se consuma sin sesión | must |

## 3. Vision

Una sola pantalla de Acceso; la identidad sale de la sesión en todas las superficies.

## 4. Needs (Functional)

- NEED-001: autenticación por usuario y contraseña con sesión.
- NEED-002: usuarios demo (Ana, Luis, Mira, Teo, Jorge, Rosa) y admin privado.
- NEED-003: cerrar sesión.
- NEED-004: Hermes solo con sesión.

## 5. Needs (Non-Functional)

| Type | Need | Target |
|---|---|---|
| Security | Cookie de sesión | HttpOnly, Secure, SameSite=Lax, 12 h |
| Security | Fuerza bruta | 5 fallos por usuario en 10 min → 429 |
| Security | Enumeración | Mismo mensaje para usuario inexistente o contraseña errónea |

## 6. Risks

Ver `risk-register.md`.

## 7. Traceability Matrix

| NEED | Source | REQ | Verification |
|---|---|---|---|
| NEED-001 | PO 2026-11-07 | REQ-001, REQ-002 | e2e A1–A5 |
| NEED-002 | PO 2026-11-07 | REQ-003 | e2e A1, A6 |
| NEED-003 | PO 2026-11-07 | REQ-004 | e2e A7 |
| NEED-004 | PO 2026-11-07 | REQ-005 | copiloto T05, live-smoke |

## 8. Human Approval

- [x] Aprobado por Roger (PO) — 2026-11-07 (Excepción Ready + decisiones del diálogo).

## Gate CP1 -> CP2

- [x] Problema sin solución. [x] Necesidades listadas. [x] Riesgos visibles. [x] Matriz iniciada. [x] Aprobación registrada.
