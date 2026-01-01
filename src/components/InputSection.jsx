import Tooltip from './Tooltip';
import { tooltips } from '../utils/tooltips';

export default function InputSection({ inputs, setInputs }) {
  const handleChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const InputField = ({ label, field, step = "1", tooltipKey = null }) => (
    <div>
      <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1 flex items-center">
        {label}
        {tooltipKey && <Tooltip content={tooltips[tooltipKey]} />}
      </label>
      <input
        type="number"
        step={step}
        value={inputs[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
        Parámetros de entrada
      </h2>

      <div className="space-y-6">
        {/* Hipótesis generales */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center">
            1. Hipótesis generales
            <Tooltip content={tooltips.escenarios} />
          </h3>
          <div className="space-y-3">
            <InputField
              label="Impuesto rentas capital (%)"
              field="impuestoRentasCapital"
              step="0.1"
              tooltipKey="interesesDeducibles"
            />
            <InputField
              label="Impuesto ganancias patrimoniales (%)"
              field="impuestoGananciasPatrimoniales"
              step="0.1"
              tooltipKey="gananciaPatrimonial"
            />
            <InputField
              label="Bonificación alquiler vivienda (%)"
              field="bonificacionAlquiler"
              step="0.1"
              tooltipKey="bonificacionAlquiler"
            />
            <InputField
              label="Bonificación venta 1ª vivienda (%)"
              field="bonificacionVenta1Vivienda"
              step="0.1"
            />
          </div>
        </div>

        {/* Adquisición */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center">
            2. Adquisición de la vivienda
            <Tooltip content={tooltips.equity} />
          </h3>
          <div className="space-y-3">
            <InputField label="Valor vivienda (€)" field="valorVivienda" />
            <InputField
              label="Entrada (%)"
              field="entrada"
              step="0.1"
              tooltipKey="apalancamiento"
            />
            <InputField label="Gastos hipoteca (%)" field="gastosHipoteca" step="0.1" />
            <InputField
              label="Impuesto ITP (%)"
              field="impuestoITP"
              step="0.1"
              tooltipKey="itp"
            />
            <InputField label="Comisión agencia (%)" field="comisionAgencia" step="0.1" />
            <InputField label="Gastos Registro + Notaría (%)" field="gastosRegistroNotaria" step="0.1" />
            <InputField label="Años hipoteca" field="anosHipoteca" />
            <InputField label="Tipo de interés (%)" field="tipoInteres" step="0.1" />
          </div>
        </div>

        {/* Gastos operativos */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center">
            Gastos operativos (% valor vivienda anual)
            <Tooltip content={tooltips.gastosOperativos} />
          </h3>
          <div className="space-y-3">
            <InputField label="Gastos comunidad (%)" field="gastosComunidad" step="0.01" />
            <InputField label="IBI (%)" field="ibi" step="0.01" />
            <InputField label="Mantenimiento (%)" field="mantenimiento" step="0.01" />
            <InputField label="Derramas (%)" field="derramas" step="0.01" />
          </div>
        </div>

        {/* Alquiler */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
            3. Hipótesis de alquiler
          </h3>
          <div className="space-y-3">
            <InputField label="Alquiler mensual (€)" field="alquilerMensual" />
            <InputField
              label="Ocupación (%)"
              field="ocupacion"
              step="0.1"
              tooltipKey="ocupacion"
            />
            <InputField label="Subida alquiler anual (%)" field="subidaAlquiler" step="0.1" />
            <InputField label="Subida precio vivienda anual (%)" field="subidaPrecioVivienda" step="0.1" />
          </div>
        </div>

        {/* Opciones de salida */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
            Opciones de salida
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={inputs.ventaFutura}
                onChange={(e) => handleChange('ventaFutura', e.target.checked ? 1 : 0)}
                className="w-5 h-5 rounded border-gray-300 dark:border-gray-600"
              />
              <label className="text-gray-700 dark:text-gray-300">Venta futura</label>
            </div>
            {inputs.ventaFutura && (
              <InputField label="Años hasta venta" field="anosHastaVenta" />
            )}
          </div>
        </div>

        {/* Criterios */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
            Criterios de decisión
          </h3>
          <div className="space-y-3">
            <InputField
              label="TIR mínima (%)"
              field="tir_minima"
              step="0.1"
              tooltipKey="tir"
            />
            <InputField
              label="Cash-on-Cash mínimo (%)"
              field="coc_minimo"
              step="0.1"
              tooltipKey="coc"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
