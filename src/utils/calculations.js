import { SCENARIOS } from './constants';

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatPercent = (value) => {
  return `${value.toFixed(2)}%`;
};

export const calcularMetricas = (inputs, scenario) => {
  const i = inputs;
  const esc = SCENARIOS[scenario];

  // 1. COSTES DE ADQUISICIÓN
  const valorVivienda = i.valorVivienda;
  const importeEntrada = valorVivienda * (i.entrada / 100);
  const importeHipoteca = valorVivienda - importeEntrada;

  const costesAdquisicion = {
    itp: valorVivienda * (i.impuestoITP / 100),
    comisionAgencia: valorVivienda * (i.comisionAgencia / 100),
    gastosHipoteca: importeHipoteca * (i.gastosHipoteca / 100),
    registroNotaria: valorVivienda * (i.gastosRegistroNotaria / 100)
  };

  const totalCostesAdquisicion = Object.values(costesAdquisicion).reduce((a, b) => a + b, 0);
  const equityInicial = importeEntrada + totalCostesAdquisicion;

  // 2. HIPOTECA
  const tasaMensual = (i.tipoInteres / 100) / 12;
  const numPagos = i.anosHipoteca * 12;
  const cuotaMensual = importeHipoteca > 0
    ? importeHipoteca * (tasaMensual * Math.pow(1 + tasaMensual, numPagos)) / (Math.pow(1 + tasaMensual, numPagos) - 1)
    : 0;
  const cuotaAnual = cuotaMensual * 12;

  // 3. GASTOS OPERATIVOS
  const gastosOperativosBase = {
    comunidad: valorVivienda * (i.gastosComunidad / 100),
    ibi: valorVivienda * (i.ibi / 100),
    mantenimiento: valorVivienda * (i.mantenimiento / 100),
    derramas: valorVivienda * (i.derramas / 100)
  };

  // 4. PROYECCIÓN DE CASHFLOWS
  const cashflows = [];
  let saldoHipoteca = importeHipoteca;
  const horizonteAnos = i.ventaFutura ? i.anosHastaVenta : 10;

  for (let ano = 1; ano <= horizonteAnos; ano++) {
    const esAnoVenta = i.ventaFutura && ano === i.anosHastaVenta;

    const alquilerMensualAno = i.alquilerMensual * esc.alquiler * Math.pow(1 + (i.subidaAlquiler / 100), ano - 1);
    const ingresosBrutosAlquiler = alquilerMensualAno * 12 * (i.ocupacion / 100) * esc.ocupacion;
    const valorViviendaAno = valorVivienda * Math.pow(1 + ((i.subidaPrecioVivienda / 100) * esc.revalorizacion), ano);
    const ingresosVenta = esAnoVenta ? valorViviendaAno : 0;
    const totalIngresos = ingresosBrutosAlquiler + ingresosVenta;
    const gastosOperativos = Object.values(gastosOperativosBase).reduce((a, b) => a + b, 0) * esc.gastos;

    let interesesAnuales = 0;
    let amortizacionAnual = 0;

    for (let mes = 0; mes < 12; mes++) {
      if (saldoHipoteca > 0) {
        const interesMes = saldoHipoteca * tasaMensual;
        const amortizacionMes = cuotaMensual - interesMes;
        interesesAnuales += interesMes;
        amortizacionAnual += amortizacionMes;
        saldoHipoteca = Math.max(0, saldoHipoteca - amortizacionMes);
      }
    }

    const saldoHipotecaFinAno = saldoHipoteca;
    const repagoHipoteca = esAnoVenta ? saldoHipoteca : 0;
    if (esAnoVenta) {
      saldoHipoteca = 0;
    }

    const cashflowOperacion = ingresosBrutosAlquiler - gastosOperativos;
    const totalSalidaFinanciacion = cuotaAnual + repagoHipoteca;
    const cashflowDisponible = totalIngresos - gastosOperativos - totalSalidaFinanciacion;

    const baseImponibleAlquiler = ingresosBrutosAlquiler - gastosOperativos - interesesAnuales;
    const baseImponibleBonificada = baseImponibleAlquiler * (1 - i.bonificacionAlquiler / 100);
    const impuestosAlquiler = baseImponibleBonificada > 0
      ? baseImponibleBonificada * (i.impuestoRentasCapital / 100)
      : 0;

    let impuestosVenta = 0;
    if (esAnoVenta && ingresosVenta > 0) {
      const gananciaPatrimonial = valorViviendaAno - valorVivienda - totalCostesAdquisicion;
      const gananciaBonificada = gananciaPatrimonial * (1 - i.bonificacionVenta1Vivienda / 100);
      impuestosVenta = gananciaBonificada > 0
        ? gananciaBonificada * (i.impuestoGananciasPatrimoniales / 100)
        : 0;
    }

    const totalImpuestos = impuestosAlquiler + impuestosVenta;
    const cashflowNetoPostImpuestos = cashflowDisponible - totalImpuestos;

    cashflows.push({
      ano,
      ingresosBrutosAlquiler,
      ingresosVenta,
      totalIngresos,
      gastosOperativos,
      intereses: interesesAnuales,
      amortizacion: amortizacionAnual,
      cuotaHipoteca: cuotaAnual,
      repagoHipoteca,
      cashflowOperacion,
      cashflowDisponible,
      impuestosAlquiler,
      impuestosVenta,
      totalImpuestos,
      cashflowNeto: cashflowNetoPostImpuestos,
      saldoHipoteca: saldoHipotecaFinAno,
      valorVivienda: valorViviendaAno,
      esAnoVenta
    });
  }

  // 5. MÉTRICAS
  const ano1 = cashflows[0];
  const rentabilidadBruta = (ano1.ingresosBrutosAlquiler / valorVivienda) * 100;
  const cashOnCash = (ano1.cashflowDisponible / equityInicial) * 100;
  const cashOnCashNetoImpuestos = (ano1.cashflowNeto / equityInicial) * 100;
  const dscr = ano1.cashflowOperacion / ano1.cuotaHipoteca;

  // TIR
  const calcularTIR = () => {
    const flujos = [-equityInicial, ...cashflows.map(cf => cf.cashflowNeto)];
    let tasaBaja = -0.99;
    let tasaAlta = 5;
    let tir = 0;

    for (let iter = 0; iter < 200; iter++) {
      tir = (tasaBaja + tasaAlta) / 2;
      let vpn = 0;

      for (let i = 0; i < flujos.length; i++) {
        vpn += flujos[i] / Math.pow(1 + tir, i);
      }

      if (Math.abs(vpn) < 0.01) break;

      if (vpn > 0) {
        tasaBaja = tir;
      } else {
        tasaAlta = tir;
      }
    }

    return tir * 100;
  };

  const tir = calcularTIR();
  const cashflowsAcumulados = cashflows.reduce((sum, cf) => sum + cf.cashflowNeto, 0);
  const equityMultiple = cashflowsAcumulados / equityInicial;
  const gananciaTotal = cashflowsAcumulados - equityInicial;

  // 6. DECISIÓN
  const cumpleTIR = tir >= i.tir_minima;
  const cumpleCoC = cashOnCashNetoImpuestos >= i.coc_minimo;
  const cumpleDSCR = dscr >= 1.25;
  const todosCashflowsPositivos = cashflows.every(cf => cf.cashflowNeto >= -100);
  const recomendacion = cumpleTIR && cumpleCoC && cumpleDSCR && todosCashflowsPositivos;

  return {
    valorVivienda,
    equityInicial,
    importeEntrada,
    importeHipoteca,
    costesAdquisicion,
    totalCostesAdquisicion,
    cuotaMensual,
    cuotaAnual,
    rentabilidadBruta,
    cashOnCash,
    cashOnCashNetoImpuestos,
    dscr,
    tir,
    equityMultiple,
    gananciaTotal,
    cashflows,
    recomendacion,
    cumpleTIR,
    cumpleCoC,
    cumpleDSCR,
    todosCashflowsPositivos
  };
};

// Nueva función: calcular rentabilidad si se vende en cualquier año
export const calcularRentabilidadVentaEnAno = (metricas, inputs, anoVenta) => {
  if (anoVenta < 1 || anoVenta > metricas.cashflows.length) {
    return null;
  }

  const cf = metricas.cashflows[anoVenta - 1];
  const cashflowsAcumuladosHastaAno = metricas.cashflows
    .slice(0, anoVenta)
    .reduce((sum, cf) => sum + cf.cashflowNeto, 0);

  // Calcular ganancia patrimonial si se vende este año
  const valorVentaAno = cf.valorVivienda;
  const gananciaPatrimonial = valorVentaAno - metricas.valorVivienda - metricas.totalCostesAdquisicion;
  const gananciaBonificada = gananciaPatrimonial * (1 - inputs.bonificacionVenta1Vivienda / 100);
  const impuestosVenta = gananciaBonificada > 0
    ? gananciaBonificada * (inputs.impuestoGananciasPatrimoniales / 100)
    : 0;

  // Procedimiento de venta
  const ingresosPorVenta = valorVentaAno;
  const pagoDeuda = cf.saldoHipoteca;
  const netoVenta = ingresosPorVenta - pagoDeuda - impuestosVenta;

  // Retorno total = cashflows acumulados + neto de venta
  const retornoTotal = cashflowsAcumuladosHastaAno + netoVenta;
  const gananciaNetaTotal = retornoTotal - metricas.equityInicial;
  const multiploEquity = retornoTotal / metricas.equityInicial;

  // TIR si se vende este año
  const flujos = [-metricas.equityInicial];
  for (let i = 0; i < anoVenta; i++) {
    if (i < anoVenta - 1) {
      flujos.push(metricas.cashflows[i].cashflowNeto);
    } else {
      // Último año: cashflow normal + venta
      flujos.push(metricas.cashflows[i].cashflowNeto + netoVenta);
    }
  }

  let tasaBaja = -0.99;
  let tasaAlta = 5;
  let tirVenta = 0;

  for (let iter = 0; iter < 200; iter++) {
    tirVenta = (tasaBaja + tasaAlta) / 2;
    let vpn = 0;

    for (let i = 0; i < flujos.length; i++) {
      vpn += flujos[i] / Math.pow(1 + tirVenta, i);
    }

    if (Math.abs(vpn) < 0.01) break;

    if (vpn > 0) {
      tasaBaja = tirVenta;
    } else {
      tasaAlta = tirVenta;
    }
  }

  tirVenta = tirVenta * 100;

  return {
    anoVenta,
    valorVenta: valorVentaAno,
    saldoDeuda: pagoDeuda,
    gananciaPatrimonial,
    impuestosVenta,
    netoVenta,
    cashflowsAcumulados: cashflowsAcumuladosHastaAno,
    retornoTotal,
    gananciaNetaTotal,
    multiploEquity,
    tirVenta,
    rentabilidadPorcentual: ((retornoTotal / metricas.equityInicial - 1) * 100)
  };
};
