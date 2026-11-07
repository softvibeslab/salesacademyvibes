// Contadores de Home a partir de los resultados del día (BR-12 de la historia).
// Presentaciones = tours del día con resultado; cierres = ventas; volumen = suma USD.
// El abandono cuenta como presentación. Cancelados y tours sin resultado no cuentan.
export function homeCounters(visits, repId, date) {
  const done = (visits || []).filter((visit) => visit.repId === repId
    && visit.date === date
    && visit.status !== "cancelado"
    && visit.result);
  const closes = done.filter((visit) => visit.result.outcome === "venta");
  const volumeUSD = closes
    .filter((visit) => visit.result.currency === "USD")
    .reduce((sum, visit) => sum + (Number(visit.result.amount) || 0), 0);
  return { presentations: done.length, closes: closes.length, volumeUSD };
}
