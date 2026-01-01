# 🚀 Quick Start Guide

## Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en modo desarrollo
npm run dev

# 3. Abrir en el navegador
# La URL aparecerá en la terminal (normalmente http://localhost:5173)
```

## Build para Producción

```bash
# Generar build optimizado
npm run build

# Previsualizar build
npm run preview
```

## Estructura de Archivos Creados

```
📦 real-estate-analyzer
├── 📁 src/
│   ├── 📁 components/        # Componentes React modulares
│   │   ├── CashflowTable.jsx      # Tabla con simulación de venta
│   │   ├── InputSection.jsx       # Formulario de parámetros
│   │   ├── MetricsDisplay.jsx     # Panel de métricas
│   │   ├── ThemeToggle.jsx        # Botón dark/light
│   │   └── Tooltip.jsx            # Tooltips explicativos
│   ├── 📁 hooks/
│   │   └── useTheme.jsx           # Hook de tema con contexto
│   ├── 📁 utils/
│   │   ├── calculations.js        # Lógica financiera
│   │   ├── constants.js           # Valores por defecto
│   │   └── tooltips.js            # Contenido tooltips
│   ├── App.jsx                    # Componente principal
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Estilos globales
├── 📁 public/
│   └── vite.svg                   # Favicon
├── 📄 index-analyzer.html         # HTML principal
├── 📄 package.json                # Dependencias
├── 📄 vite.config.js              # Config Vite
├── 📄 tailwind.config.js          # Config Tailwind
├── 📄 README.md                   # Documentación completa
├── 📄 DEPLOYMENT.md               # Guía de despliegue
├── 📄 LICENSE                     # Licencia MIT
└── 📄 .gitignore                  # Archivos ignorados
```

## Características Principales

### ✨ Nuevas Funcionalidades

1. **🌓 Dark/Light Mode**
   - Botón en la esquina superior derecha
   - Persiste tu preferencia en localStorage
   - Transiciones suaves entre temas

2. **💡 Tooltips Explicativos**
   - Pasa el ratón sobre los iconos (?) para ver explicaciones
   - Conceptos financieros explicados en lenguaje simple
   - Ejemplos prácticos incluidos

3. **🎯 Simulación de Venta Flexible**
   - Haz clic en cualquier fila de la tabla
   - Calcula la rentabilidad apalancada si vendes ese año
   - Ve tu TIR, equity múltiple y ganancia real
   - Considera deuda pendiente, impuestos y cashflows acumulados

4. **📊 Análisis de Escenarios**
   - Optimista, Base, Pesimista
   - Cambia instantáneamente entre escenarios
   - Ve cómo varían las métricas

5. **🎨 Diseño Profesional**
   - Interfaz limpia y moderna
   - Responsivo (desktop y móvil)
   - Componentes modulares y mantenibles

## Conceptos Clave Explicados

### TIR (Tasa Interna de Retorno)
- **Qué es**: Rentabilidad anual de tu inversión
- **Ejemplo**: TIR 10% = tu dinero crece 10% cada año
- **Bueno**: > 8-10% para inmobiliario

### Cash-on-Cash
- **Qué es**: Retorno del primer año dividido por tu inversión
- **Ejemplo**: Inviertes 20k€, recibes 1.2k€/año = CoC 6%
- **Bueno**: > 5-7%

### DSCR (Debt Service Coverage Ratio)
- **Qué es**: Cuántas veces cubres la hipoteca con ingresos
- **Ejemplo**: Ganas 600€/mes, pagas 400€ = DSCR 1.5x
- **Bueno**: > 1.25x

### Equity Multiple
- **Qué es**: Cuántas veces recuperas tu inversión
- **Ejemplo**: Inviertes 20k€, recuperas 40k€ = 2.0x
- **Bueno**: > 1.5x en 10 años

## Cómo Usar la Aplicación

### 1. Configurar Parámetros
- Introduce los datos de tu propiedad
- Ajusta gastos e impuestos según tu región
- Define tu alquiler esperado y ocupación

### 2. Analizar Resultados
- El panel verde/rojo te dice si es buena inversión
- Revisa las métricas clave (TIR, CoC, DSCR)
- Mira la tabla de cashflows año por año

### 3. Simular Ventas
- Haz clic en cualquier fila de la tabla
- Ve qué pasaría si vendes ese año
- Compara diferentes momentos de salida

### 4. Cambiar Escenarios
- Prueba Optimista, Base y Pesimista
- Ve cómo cambian tus retornos
- Toma decisiones informadas

## Ejemplo Práctico

**Caso: Piso en Valencia**
- Precio: 130.000€
- Entrada: 10% (13.000€)
- Costes totales: 17.000€ (equity inicial real)
- Alquiler: 1.100€/mes
- Ocupación: 83% (10 meses/año)

**Resultados (escenario base, 10 años):**
- ✅ TIR: 9.2% (objetivo: > 8%)
- ✅ CoC año 1: 7.8% (objetivo: > 5%)
- ✅ DSCR: 1.42x (objetivo: > 1.25x)
- ✅ Equity múltiple: 2.1x
- 💰 Ganancia neta: 18.700€

**Si vendes en año 5:**
- Valor: 143.500€
- Deuda pendiente: 102.000€
- Cashflows acumulados: 5.200€
- **Retorno total: 41.500€ (2.44x sobre 17.000€)**

## Siguiente Pasos

1. **Experimenta**: Cambia los números y ve cómo afectan las métricas
2. **Compara**: Analiza diferentes propiedades
3. **Aprende**: Lee los tooltips para entender cada concepto
4. **Decide**: Usa la herramienta para evaluar inversiones reales

## Soporte

- 📖 Lee el [README.md](README.md) completo
- 🚀 Consulta [DEPLOYMENT.md](DEPLOYMENT.md) para publicar
- 🐛 Reporta bugs en GitHub Issues
- 📧 Contacto: adrian@zapatera.xyz

---

**¡Feliz análisis! 🏡📊**
