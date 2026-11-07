"""Contexto del usuario para Hermes (feature hermes-contexto, Excepción Ready del PO 2026-11-07).

Solo lectura. Resume agenda, resultados y seguimientos del usuario con sesión, con el mismo
alcance por rol que /tours. Sin notas de resultado ni historial: pueden traer datos del cliente.
"""

from datetime import date, timedelta

OBJECTION_LABELS = {
    "confianza": "Confianza",
    "dinero_cuota": "Dinero o cuota",
    "pareja_decision": "Pareja o decisión",
    "uso_tiempo": "Uso o tiempo",
    "valor_producto": "Valor del producto",
    "ya_tiene_tc": "Ya tiene tiempo compartido",
    "otra": "Otra",
}
ACTION_LABELS = {"llamada": "Llamada", "segunda_visita": "Segunda visita", "enviar_propuesta": "Enviar propuesta", "otra": "Otra"}
STEP_TITLES = {
    1: "Meet & Greet", 2: "Control de agenda", 3: "Rapport (FORM)", 4: "Descubrimiento",
    5: "Renovar el pacto", 6: "Presentación a tres", 7: "Recorrido", 8: "Casos de éxito",
    9: "Punto de confirmación", 10: "Precio y negociación", 11: "Cierre y bienvenida",
}
STATUS_LABELS = {"confirmado": "confirmado", "en_curso": "en curso", "pendiente": "pendiente", "cancelado": "cancelado"}


def _person(data, ident):
    return next((p for p in data.get("people", []) if p["id"] == ident), None)


def _room_name(data, room_id):
    room = next((r for r in data.get("rooms", []) if r["id"] == room_id), None)
    return room["name"] if room else ""


def _in_scope(data, actor, visit):
    if actor["role"] == "admin":
        return True
    if actor["role"] == "rep":
        return visit.get("repId") == actor["id"]
    me = _person(data, actor["id"])
    rep = _person(data, visit.get("repId"))
    return bool(me and rep and rep.get("roomId") == me.get("roomId"))


def _money(amount):
    value = float(amount)
    return f"{value:,.0f}" if value == int(value) else f"{value:,.2f}"


def result_label(result):
    if not result:
        return None
    outcome = result.get("outcome")
    if outcome == "venta":
        return f"Venta {result.get('currency', 'USD')} {_money(result.get('amount', 0))}"
    if outcome == "no_venta":
        label = OBJECTION_LABELS.get(result.get("objection"), "Otra")
        return f"No venta · {label}" + (" · recuperable" if result.get("recoverable") else "")
    if outcome == "abandono":
        return f"Abandono · paso {result.get('failStep')}"
    return None


def _top(counter, limit=3):
    return sorted(counter.items(), key=lambda kv: (-kv[1], str(kv[0])))[:limit]


def build_context(data, actor, visits, today):
    """Resumen para el prompt. `visits` puede venir sin filtrar: se aplica el alcance otra vez."""
    me = _person(data, actor["id"]) or {}
    mine = [v for v in visits if _in_scope(data, actor, v)]
    month_start = today[:8] + "01"
    live = [v for v in mine if v.get("status") != "cancelado"]
    many_reps = actor["role"] != "rep"

    def who(v):
        rep = _person(data, v.get("repId"))
        return {"rep": rep["name"]} if many_reps and rep else {}

    agenda = [
        {"start": v["start"], "end": v["end"], "lead": v["lead"], "status": STATUS_LABELS.get(v.get("status"), v.get("status")),
         "note": v.get("note", ""), "result": result_label(v.get("result")), **who(v)}
        for v in sorted(mine, key=lambda v: (v["start"], v.get("repId", ""))) if v["date"] == today
    ]

    month = [v for v in live if month_start <= v["date"] <= today]
    results = [v["result"] for v in month if v.get("result")]
    sales = [r for r in results if r.get("outcome") == "venta"]
    objections, fails = {}, {}
    for r in results:
        if r.get("outcome") == "no_venta":
            objections[r.get("objection")] = objections.get(r.get("objection"), 0) + 1
        if r.get("outcome") == "abandono":
            fails[r.get("failStep")] = fails.get(r.get("failStep"), 0) + 1

    pending = [
        {"date": v["date"], "start": v["start"], "lead": v["lead"], **who(v)}
        for v in sorted(month, key=lambda v: (v["date"], v["start"])) if v["date"] < today and not v.get("result")
    ][:5]

    since = (date.fromisoformat(today) - timedelta(days=7)).isoformat()
    follow = []
    for v in live:
        step = (v.get("result") or {}).get("nextStep")
        if step and step.get("date", "") >= since:
            owner = _person(data, step.get("ownerId"))
            follow.append({"lead": v["lead"], "action": ACTION_LABELS.get(step.get("action"), "Otra"),
                           "date": step["date"], "owner": owner["name"] if owner else ""})
    follow.sort(key=lambda f: (f["date"], f["lead"]))

    upcoming = [
        {"date": v["date"], "start": v["start"], "lead": v["lead"], **who(v)}
        for v in sorted(live, key=lambda v: (v["date"], v["start"])) if v["date"] > today
    ][:3]

    return {
        "user": {"name": me.get("name", actor.get("name", "")), "role": actor["role"], "room": _room_name(data, me.get("roomId", ""))},
        "today": today,
        "agenda": agenda,
        "month": {
            "tours": len(month),
            "withResult": len(results),
            "sales": len(sales),
            "noSales": sum(1 for r in results if r.get("outcome") == "no_venta"),
            "abandons": sum(1 for r in results if r.get("outcome") == "abandono"),
            "volumeUSD": round(sum(float(r.get("amount", 0)) for r in sales if r.get("currency") == "USD"), 2),
            "volumeMXN": round(sum(float(r.get("amount", 0)) for r in sales if r.get("currency") == "MXN"), 2),
            "closePct": round(100 * len(sales) / len(results)) if results else 0,
        },
        "topObjections": [{"id": k, "label": OBJECTION_LABELS.get(k, "Otra"), "count": n} for k, n in _top(objections)],
        "failSteps": [{"n": k, "title": STEP_TITLES.get(k, ""), "count": n} for k, n in _top(fails)],
        "pendingResults": pending,
        "followUps": follow[:5],
        "upcoming": upcoming,
    }


def context_text(ctx):
    """Texto compacto para el prompt de sistema (≤ 4 KB)."""
    u, m = ctx["user"], ctx["month"]
    lines = [f"Usuario: {u['name']} ({u['role']}, {u['room']}). Hoy: {ctx['today']}."]
    if ctx["agenda"]:
        lines.append("Agenda de hoy:")
        for a in ctx["agenda"]:
            extra = f" · {a['note']}" if a.get("note") else ""
            rep = f" [{a['rep']}]" if a.get("rep") else ""
            lines.append(f"- {a['start']}–{a['end']} {a['lead']}{rep} ({a['status']}){extra} → {a['result'] or 'sin resultado'}")
    else:
        lines.append("Agenda de hoy: sin tours asignados.")
    lines.append(
        f"Mes hasta hoy: {m['tours']} tours, {m['withResult']} con resultado, {m['sales']} ventas, {m['noSales']} no ventas, "
        f"{m['abandons']} abandonos, cierre {m['closePct']}%, volumen USD {_money(m['volumeUSD'])}"
        + (f" y MXN {_money(m['volumeMXN'])}" if m["volumeMXN"] else "") + "."
    )
    if ctx["topObjections"]:
        lines.append("Objeciones más frecuentes: " + ", ".join(f"{o['label']} ({o['count']})" for o in ctx["topObjections"]) + ".")
    if ctx["failSteps"]:
        lines.append("Pasos donde se cortaron tours: " + ", ".join(f"{f['n']}. {f['title']} ({f['count']})" for f in ctx["failSteps"]) + ".")
    if ctx["pendingResults"]:
        lines.append("Tours anteriores sin resultado: " + ", ".join(f"{p['date']} {p['start']} {p['lead']}" for p in ctx["pendingResults"]) + ".")
    if ctx["followUps"]:
        lines.append("Seguimientos: " + ", ".join(f"{f['action']} a {f['lead']} el {f['date']} ({f['owner']})" for f in ctx["followUps"]) + ".")
    if ctx["upcoming"]:
        lines.append("Próximos tours: " + ", ".join(f"{p['date']} {p['start']} {p['lead']}" for p in ctx["upcoming"]) + ".")
    text = "\n".join(lines)
    raw = text.encode("utf-8")
    return text if len(raw) <= 4096 else raw[:4090].decode("utf-8", "ignore") + " …"
