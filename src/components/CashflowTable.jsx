import { useState } from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';
import { formatCurrency, formatPercent, calcularRentabilidadVentaEnAno } from '../utils/calculations';
import Tooltip from './Tooltip';
import { tooltips } from '../utils/tooltips';

export default function CashflowTable({ metricas, inputs }) {
  const [selectedYear, setSelectedYear] = useState(null);

  const ventaData = selectedYear
    ? calcularRentabilidadVentaEnAno(metricas, inputs, selectedYear)
    : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Proyección de cashflows detallada
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
          💡 Haz clic en un año para ver la rentabilidad si vendes en ese momento
          <Tooltip content={tooltips.ventaApalancada} />
        </p>
      </div>

      {/* Panel de rentabilidad de venta */}
      {ventaData && (
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-300 dark:border-purple-700 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Simulación de venta en año {ventaData.anoVenta}
            </h4>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400">Valor de venta</div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                {formatCurrency(ventaData.valorVenta)}
              </div>
            </div>
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400">Deuda pendiente</div>
              <div className="font-semibold text-red-600 dark:text-red-400">
                -{formatCurrency(ventaData.saldoDeuda)}
              </div>
            </div>
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400">Impuestos venta</div>
              <div className="font-semibold text-orange-600 dark:text-orange-400">
                -{formatCurrency(ventaData.impuestosVenta)}
              </div>
            </div>
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400">Cashflows acumulados</div>
              <div className="font-semibold text-green-600 dark:text-green-400">
                {formatCurrency(ventaData.cashflowsAcumulados)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border-2 border-green-300 dark:border-green-700">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Retorno total</div>
              <div className="text-xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(ventaData.retornoTotal)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                vs {formatCurrency(metricas.equityInicial)} invertidos
              </div>
            </div>
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border-2 border-blue-300 dark:border-blue-700">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Equity múltiple</div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {ventaData.multiploEquity.toFixed(2)}x
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                {formatPercent(ventaData.rentabilidadPorcentual)} de ganancia
              </div>
            </div>
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border-2 border-purple-300 dark:border-purple-700">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">TIR hasta venta</div>
              <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {formatPercent(ventaData.tirVenta)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500">Anualizada</div>
            </div>
          </div>

          <button
            onClick={() => setSelectedYear(null)}
            className="mt-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline"
          >
            Cerrar simulación
          </button>
        </div>
      )}

      {/* Tabla de cashflows */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="text-left p-3 text-gray-700 dark:text-gray-300 font-semibold">Año</th>
              <th className="text-right p-3 text-gray-700 dark:text-gray-300 font-semibold">Ing. Alquiler</th>
              <th className="text-right p-3 text-gray-700 dark:text-gray-300 font-semibold">Gastos Op.</th>
              <th className="text-right p-3 text-gray-700 dark:text-gray-300 font-semibold">
                CF Operación
                <Tooltip content={tooltips.noi} />
              </th>
              <th className="text-right p-3 text-gray-700 dark:text-gray-300 font-semibold">Intereses</th>
              <th className="text-right p-3 text-gray-700 dark:text-gray-300 font-semibold">Cuota</th>
              <th className="text-right p-3 text-gray-700 dark:text-gray-300 font-semibold">Impuestos</th>
              <th className="text-right p-3 text-gray-700 dark:text-gray-300 font-semibold">
                CF Neto
                <Tooltip content={tooltips.cashflowNeto} />
              </th>
              <th className="text-right p-3 text-gray-700 dark:text-gray-300 font-semibold">Valor Prop.</th>
            </tr>
          </thead>
          <tbody>
            {metricas.cashflows.map((cf, idx) => (
              <tr
                key={idx}
                onClick={() => setSelectedYear(cf.ano)}
                className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${
                  cf.esAnoVenta ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''
                } ${
                  selectedYear === cf.ano ? 'bg-purple-50 dark:bg-purple-900/30 ring-2 ring-purple-400 dark:ring-purple-600' : ''
                }`}
              >
                <td className="p-3 text-gray-900 dark:text-gray-100">
                  <div className="flex items-center gap-2">
                    {cf.ano}
                    {cf.esAnoVenta && (
                      <span className="text-xs px-2 py-1 bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded">
                        VENTA
                      </span>
                    )}
                    {selectedYear === cf.ano && (
                      <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>
                </td>
                <td className="p-3 text-right text-gray-900 dark:text-gray-100">
                  {formatCurrency(cf.ingresosBrutosAlquiler)}
                </td>
                <td className="p-3 text-right text-gray-900 dark:text-gray-100">
                  {formatCurrency(cf.gastosOperativos)}
                </td>
                <td className="p-3 text-right font-semibold text-gray-900 dark:text-gray-100">
                  {formatCurrency(cf.cashflowOperacion)}
                </td>
                <td className="p-3 text-right text-gray-600 dark:text-gray-400">
                  {formatCurrency(cf.intereses)}
                </td>
                <td className="p-3 text-right text-gray-900 dark:text-gray-100">
                  {formatCurrency(cf.cuotaHipoteca + cf.repagoHipoteca)}
                </td>
                <td className="p-3 text-right text-red-600 dark:text-red-400">
                  {formatCurrency(cf.totalImpuestos)}
                </td>
                <td className={`p-3 text-right font-bold ${
                  cf.cashflowNeto >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {formatCurrency(cf.cashflowNeto)}
                </td>
                <td className="p-3 text-right text-gray-900 dark:text-gray-100">
                  {formatCurrency(cf.valorVivienda)}
                </td>
              </tr>
            ))}
            <tr className="border-t-2 border-gray-300 dark:border-gray-600 font-bold bg-gray-100 dark:bg-gray-700">
              <td className="p-3 text-gray-900 dark:text-gray-100">TOTAL</td>
              <td className="p-3 text-right text-gray-900 dark:text-gray-100">
                {formatCurrency(metricas.cashflows.reduce((sum, cf) => sum + cf.ingresosBrutosAlquiler, 0))}
              </td>
              <td className="p-3 text-right text-gray-900 dark:text-gray-100">
                {formatCurrency(metricas.cashflows.reduce((sum, cf) => sum + cf.gastosOperativos, 0))}
              </td>
              <td className="p-3 text-right text-gray-900 dark:text-gray-100">
                {formatCurrency(metricas.cashflows.reduce((sum, cf) => sum + cf.cashflowOperacion, 0))}
              </td>
              <td className="p-3 text-right text-gray-900 dark:text-gray-100">
                {formatCurrency(metricas.cashflows.reduce((sum, cf) => sum + cf.intereses, 0))}
              </td>
              <td className="p-3 text-right text-gray-900 dark:text-gray-100">
                {formatCurrency(metricas.cashflows.reduce((sum, cf) => sum + cf.cuotaHipoteca + cf.repagoHipoteca, 0))}
              </td>
              <td className="p-3 text-right text-gray-900 dark:text-gray-100">
                {formatCurrency(metricas.cashflows.reduce((sum, cf) => sum + cf.totalImpuestos, 0))}
              </td>
              <td className={`p-3 text-right text-xl ${
                metricas.cashflows.reduce((sum, cf) => sum + cf.cashflowNeto, 0) >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {formatCurrency(metricas.cashflows.reduce((sum, cf) => sum + cf.cashflowNeto, 0))}
              </td>
              <td className="p-3"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-semibold">
          💡 Notas del modelo:
        </div>
        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
          <li>
            CF Neto incluye impuestos sobre rentas de alquiler ({inputs.impuestoRentasCapital}%) con
            bonificación del {inputs.bonificacionAlquiler}%
          </li>
          <li>
            Impuestos sobre ganancia patrimonial ({inputs.impuestoGananciasPatrimoniales}%) solo en año
            de venta con bonificación del {inputs.bonificacionVenta1Vivienda}%
          </li>
          <li>
            Gastos operativos calculados como % del valor de la vivienda (Comunidad:{' '}
            {inputs.gastosComunidad}%, IBI: {inputs.ibi}%, Mtto: {inputs.mantenimiento}%, Derramas:{' '}
            {inputs.derramas}%)
          </li>
          <li>DSCR = Cashflow Operación / Cuota Hipoteca (óptimo &gt; 1.25)</li>
          <li className="font-semibold text-purple-700 dark:text-purple-400">
            Haz clic en cualquier fila para simular una venta en ese año y ver tu rentabilidad apalancada
          </li>
        </ul>
      </div>
    </div>
  );
}
