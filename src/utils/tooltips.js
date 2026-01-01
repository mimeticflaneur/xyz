export const tooltips = {
  tir: {
    title: "TIR - Tasa Interna de Retorno",
    description: "Mide la rentabilidad anual de la inversión considerando todos los flujos de caja. Es el porcentaje que hace que el VAN sea cero. Una TIR del 8% significa que tu dinero crece un 8% anual."
  },
  coc: {
    title: "Cash-on-Cash",
    description: "Rentabilidad del dinero que TÚ pones (entrada + gastos). Si inviertes 20.000€ y recibes 1.000€/año, tu CoC es 5%. Mide el retorno sin contar apalancamiento."
  },
  dscr: {
    title: "DSCR - Debt Service Coverage Ratio",
    description: "Mide cuántas veces puedes pagar la hipoteca con los ingresos netos. DSCR > 1.25 es bueno (ganas 25% más de lo que pagas). Menor a 1 = números rojos."
  },
  equityMultiple: {
    title: "Equity Multiple",
    description: "Cuántas veces recuperas tu inversión inicial. 2.0x significa que duplicaste tu dinero. 1.5x = ganaste un 50% sobre lo invertido."
  },
  rentabilidadBruta: {
    title: "Rentabilidad Bruta",
    description: "Alquiler anual dividido por precio de compra. Es la rentabilidad SIN gastos. Útil para comparar rápido, pero no toma en cuenta costes reales."
  },
  apalancamiento: {
    title: "Apalancamiento",
    description: "Usar dinero prestado (hipoteca) para invertir. Si el activo sube más que el interés del préstamo, multiplicas ganancias. Si baja, multiplicas pérdidas."
  },
  equity: {
    title: "Equity Inicial",
    description: "TODO el dinero que sale de tu bolsillo al comprar: entrada + ITP + notaría + agencia + gastos hipoteca. Es la inversión REAL que haces."
  },
  itp: {
    title: "ITP - Impuesto de Transmisiones Patrimoniales",
    description: "Impuesto al comprar vivienda de segunda mano. Varía por comunidad autónoma (6-10%). Se paga sobre el precio de compra."
  },
  bonificacionAlquiler: {
    title: "Bonificación Alquiler",
    description: "Reducción fiscal por alquilar vivienda habitual. En España: 60% de reducción en la base imponible. Reduce significativamente los impuestos a pagar."
  },
  gastosOperativos: {
    title: "Gastos Operativos",
    description: "Costes anuales de mantener la propiedad: comunidad, IBI, seguros, reparaciones, derramas. Normalmente 2-3% del valor de la vivienda."
  },
  noi: {
    title: "NOI - Net Operating Income",
    description: "Ingresos por alquiler MENOS gastos operativos (sin contar hipoteca). Es el dinero que genera la propiedad antes de pagar deuda."
  },
  cashflowNeto: {
    title: "Cashflow Neto",
    description: "Dinero que te queda en el bolsillo después de TODO: ingresos - gastos - hipoteca - impuestos. Es tu ganancia real mensual/anual."
  },
  ocupacion: {
    title: "Tasa de Ocupación",
    description: "% del año que la vivienda está alquilada. 83.33% = 10 meses alquilados, 2 vacíos. Afecta directamente a tus ingresos reales."
  },
  gananciaPatrimonial: {
    title: "Ganancia Patrimonial",
    description: "Beneficio al vender: precio venta - precio compra - gastos de compra. Se paga impuesto (19-26%) salvo bonificaciones por reinversión."
  },
  interesesDeducibles: {
    title: "Intereses Deducibles",
    description: "Los intereses de la hipoteca se pueden deducir de los ingresos por alquiler, reduciendo la base imponible y por tanto los impuestos."
  },
  escenarios: {
    title: "Análisis de Escenarios",
    description: "Optimista (+10% alquiler, +30% revalorización). Base (números actuales). Pesimista (-10% alquiler, -30% revalorización). Te ayuda a ver el rango de resultados."
  },
  ventaApalancada: {
    title: "Rentabilidad Apalancada en Venta",
    description: "Ganancia real si vendes HOY: valor actual - deuda pendiente - impuestos + cashflows acumulados. Divide por tu equity inicial para ver el múltiplo."
  }
};
