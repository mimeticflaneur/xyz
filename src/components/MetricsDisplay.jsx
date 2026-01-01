import { CheckCircle, AlertCircle } from 'lucide-react';
import Tooltip from './Tooltip';
import { tooltips } from '../utils/tooltips';
import { formatCurrency, formatPercent } from '../utils/calculations';

export default function MetricsDisplay({ metricas, inputs, scenario }) {
  return (
    <div className="space-y-6">
      {/* Decisión de compra */}
      <div className={`rounded-xl border-2 p-6 ${
        metricas.recomendacion
          ? 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-700'
          : 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-700'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          {metricas.recomendacion ? (
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          ) : (
            <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
          )}
          <div>
            <h2 className={`text-2xl font-bold ${
              metricas.recomendacion
                ? 'text-green-900 dark:text-green-100'
                : 'text-red-900 dark:text-red-100'
            }`}>
              {metricas.recomendacion ? 'COMPRA RECOMENDADA' : 'NO RECOMENDADO'}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">Análisis escenario {scenario}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            label="TIR"
            value={formatPercent(metricas.tir)}
            min={formatPercent(inputs.tir_minima)}
            passed={metricas.cumpleTIR}
            tooltipKey="tir"
          />
          <MetricCard
            label="Cash-on-Cash"
            value={formatPercent(metricas.cashOnCashNetoImpuestos)}
            min={formatPercent(inputs.coc_minimo)}
            passed={metricas.cumpleCoC}
            tooltipKey="coc"
          />
          <MetricCard
            label="DSCR"
            value={`${metricas.dscr.toFixed(2)}x`}
            min="1.25x"
            passed={metricas.cumpleDSCR}
            tooltipKey="dscr"
          />
          <MetricCard
            label="Cashflow"
            value={metricas.todosCashflowsPositivos ? 'Positivo' : 'Negativo'}
            passed={metricas.todosCashflowsPositivos}
            tooltipKey="cashflowNeto"
          />
        </div>
      </div>

      {/* Resumen financiero */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Resumen financiero
        </h3>
        <div className="space-y-3">
          <DataRow label="Valor vivienda" value={formatCurrency(metricas.valorVivienda)} />
          <DataRow
            label={`Entrada (${inputs.entrada}%)`}
            value={formatCurrency(metricas.importeEntrada)}
            tooltipKey="apalancamiento"
          />

          {/* Costes de adquisición */}
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              Costes de adquisición:
            </div>
            <div className="pl-4 space-y-1 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>• ITP ({inputs.impuestoITP}%)</span>
                <span>{formatCurrency(metricas.costesAdquisicion.itp)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>• Comisión agencia ({inputs.comisionAgencia}%)</span>
                <span>{formatCurrency(metricas.costesAdquisicion.comisionAgencia)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>• Gastos hipoteca ({inputs.gastosHipoteca}%)</span>
                <span>{formatCurrency(metricas.costesAdquisicion.gastosHipoteca)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>• Registro + Notaría ({inputs.gastosRegistroNotaria}%)</span>
                <span>{formatCurrency(metricas.costesAdquisicion.registroNotaria)}</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 dark:text-gray-100 border-t border-gray-300 dark:border-gray-600 pt-1 mt-1">
                <span>Total costes</span>
                <span>{formatCurrency(metricas.totalCostesAdquisicion)}</span>
              </div>
            </div>
          </div>

          <DataRow
            label="Equity inicial total"
            value={formatCurrency(metricas.equityInicial)}
            highlight
            tooltipKey="equity"
          />
          <DataRow
            label="Préstamo hipotecario"
            value={formatCurrency(metricas.importeHipoteca)}
          />
          <DataRow label="Cuota mensual" value={formatCurrency(metricas.cuotaMensual)} />
        </div>
      </div>

      {/* Indicadores de rentabilidad */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Indicadores de rentabilidad
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  TIR (Tasa Interna de Retorno)
                </span>
                <Tooltip content={tooltips.tir} />
              </div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {formatPercent(metricas.tir)}
              </div>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Post-impuestos</div>
          </div>

          <DataRow
            label="Rentabilidad bruta (año 1)"
            value={formatPercent(metricas.rentabilidadBruta)}
            tooltipKey="rentabilidadBruta"
          />
          <DataRow
            label="Cash-on-Cash bruto (año 1)"
            value={formatPercent(metricas.cashOnCash)}
          />
          <DataRow
            label="Cash-on-Cash neto (año 1)"
            value={formatPercent(metricas.cashOnCashNetoImpuestos)}
            highlight
            tooltipKey="coc"
          />
          <DataRow
            label="Equity múltiple"
            value={`${metricas.equityMultiple.toFixed(2)}x`}
            tooltipKey="equityMultiple"
          />
          <DataRow
            label="DSCR (año 1)"
            value={`${metricas.dscr.toFixed(2)}x`}
            tooltipKey="dscr"
          />
        </div>
      </div>

      {/* Resultado final */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Resultado final {inputs.ventaFutura ? `(${inputs.anosHastaVenta} años)` : ''}
        </h3>
        <div className="space-y-3">
          <DataRow
            label="Cashflows acumulados"
            value={formatCurrency(metricas.cashflows.reduce((sum, cf) => sum + cf.cashflowNeto, 0))}
          />
          <DataRow
            label="Equity inicial invertido"
            value={`-${formatCurrency(metricas.equityInicial)}`}
          />
          <div className={`p-3 rounded-lg border ${
            metricas.gananciaTotal > 0
              ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
              : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
          }`}>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                Ganancia neta total
              </span>
              <span className={`font-bold text-lg ${
                metricas.gananciaTotal > 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {formatCurrency(metricas.gananciaTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, min, passed, tooltipKey }) {
  return (
    <div className={`p-3 rounded-lg ${
      passed
        ? 'bg-green-100 dark:bg-green-900/30'
        : 'bg-red-100 dark:bg-red-900/30'
    }`}>
      <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
        {label}
        {tooltipKey && <Tooltip content={tooltips[tooltipKey]} />}
      </div>
      <div className="text-gray-900 dark:text-gray-100 font-semibold">
        {passed ? '✓' : '✗'} {value}
      </div>
      {min && <div className="text-xs text-gray-600 dark:text-gray-400">Mínimo: {min}</div>}
    </div>
  );
}

function DataRow({ label, value, highlight, tooltipKey }) {
  return (
    <div className={`flex justify-between items-center p-3 rounded-lg ${
      highlight
        ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
        : 'bg-gray-50 dark:bg-gray-700/50'
    }`}>
      <span className={`flex items-center ${
        highlight
          ? 'font-semibold text-gray-900 dark:text-gray-100'
          : 'text-gray-700 dark:text-gray-300'
      }`}>
        {label}
        {tooltipKey && <Tooltip content={tooltips[tooltipKey]} />}
      </span>
      <span className={`${
        highlight
          ? 'font-bold text-lg text-gray-900 dark:text-gray-100'
          : 'font-semibold text-gray-900 dark:text-gray-100'
      }`}>
        {value}
      </span>
    </div>
  );
}
