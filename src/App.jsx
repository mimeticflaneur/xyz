import { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { ThemeProvider } from './hooks/useTheme';
import ThemeToggle from './components/ThemeToggle';
import InputSection from './components/InputSection';
import MetricsDisplay from './components/MetricsDisplay';
import CashflowTable from './components/CashflowTable';
import { DEFAULT_INPUTS } from './utils/constants';
import { calcularMetricas } from './utils/calculations';

function AppContent() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [scenario, setScenario] = useState('base');

  const metricas = calcularMetricas(inputs, scenario);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <ThemeToggle />

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 md:w-10 md:h-10" />
            Analizador de Inversión Inmobiliaria
          </h1>
          <p className="text-blue-100">
            Modelo financiero completo con análisis de escenarios y rentabilidad apalancada
          </p>
        </div>

        {/* Selector de escenario */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Escenario de análisis
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {['optimista', 'base', 'pesimista'].map((esc) => (
              <button
                key={esc}
                onClick={() => setScenario(esc)}
                className={`p-4 rounded-lg font-semibold transition-all ${
                  scenario === esc
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {esc.charAt(0).toUpperCase() + esc.slice(1)}
              </button>
            ))}
          </div>
          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold">Optimista:</span> +10% alquiler, +5% ocupación, +30%
            revalorización, -10% gastos |{' '}
            <span className="font-semibold">Pesimista:</span> -10% alquiler, -15% ocupación, -30%
            revalorización, +15% gastos
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <InputSection inputs={inputs} setInputs={setInputs} />
          <MetricsDisplay metricas={metricas} inputs={inputs} scenario={scenario} />
        </div>

        {/* Tabla de cashflows */}
        <CashflowTable metricas={metricas} inputs={inputs} />

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Analizador de Inversión Inmobiliaria v1.0 |{' '}
            <a
              href="https://github.com/mimeticflaneur/real-estate-analyzer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              GitHub
            </a>
          </p>
          <p className="mt-1">
            Creado por Adrián Zapatera | Esta herramienta es solo para fines educativos
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
