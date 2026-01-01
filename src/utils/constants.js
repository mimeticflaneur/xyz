export const DEFAULT_INPUTS = {
  // 1. Hipótesis generales
  impuestoRentasCapital: 20,
  impuestoGananciasPatrimoniales: 21,
  bonificacionAlquiler: 60,
  bonificacionVenta1Vivienda: 95,

  // 2. Hipótesis adquisición
  valorVivienda: 130000,
  entrada: 10,
  gastosHipoteca: 1.4,
  impuestoITP: 6,
  comisionAgencia: 1,
  gastosRegistroNotaria: 1,
  anosHipoteca: 30,
  tipoInteres: 1.4,

  // Gastos operativos
  gastosComunidad: 0.55,
  ibi: 0.4,
  mantenimiento: 0.8,
  derramas: 0.8,

  // 3. Hipótesis alquiler
  ocupacion: 83.33,
  alquilerMensual: 1100,
  subidaPrecioVivienda: 2,
  subidaAlquiler: 3,

  // Opciones de salida
  ventaFutura: true,
  anosHastaVenta: 10,

  // Criterios de decisión
  tir_minima: 8,
  coc_minimo: 5
};

export const SCENARIOS = {
  optimista: {
    alquiler: 1.1,
    ocupacion: 1.05,
    revalorizacion: 1.3,
    gastos: 0.9
  },
  base: {
    alquiler: 1,
    ocupacion: 1,
    revalorizacion: 1,
    gastos: 1
  },
  pesimista: {
    alquiler: 0.9,
    ocupacion: 0.85,
    revalorizacion: 0.7,
    gastos: 1.15
  }
};
