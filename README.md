# 🏡 Analizador de Inversión Inmobiliaria

Herramienta profesional de análisis financiero para inversiones inmobiliarias con análisis de escenarios, cálculo de métricas clave (TIR, Cash-on-Cash, DSCR) y simulación de rentabilidad apalancada.

## ✨ Características

### 📊 Análisis Financiero Completo
- **TIR (Tasa Interna de Retorno)**: Rentabilidad anualizada post-impuestos
- **Cash-on-Cash**: Retorno sobre el capital invertido (bruto y neto)
- **DSCR (Debt Service Coverage Ratio)**: Capacidad de servicio de deuda
- **Equity Multiple**: Múltiplo de retorno sobre inversión inicial
- **Proyección de cashflows**: Detalle año por año de ingresos, gastos e impuestos

### 🎯 Simulación de Venta Flexible
- **Venta en cualquier año**: Haz clic en cualquier fila de la tabla para simular una venta
- **Rentabilidad apalancada**: Calcula el retorno real considerando:
  - Valor de mercado actual de la propiedad
  - Deuda hipotecaria pendiente
  - Impuestos sobre ganancia patrimonial
  - Cashflows acumulados hasta la fecha
- **Análisis instantáneo**: TIR y múltiplo de equity actualizados para cada año

### 🎨 Interfaz Moderna
- **Dark/Light Mode**: Tema claro y oscuro con persistencia en localStorage
- **Tooltips explicativos**: Pasa el ratón sobre 📘 para entender cada concepto
- **Diseño responsivo**: Optimizado para desktop y móvil
- **Componentes modulares**: Código limpio y mantenible

### 📈 Análisis de Escenarios
- **Optimista**: +10% alquiler, +5% ocupación, +30% revalorización, -10% gastos
- **Base**: Números reales del mercado
- **Pesimista**: -10% alquiler, -15% ocupación, -30% revalorización, +15% gastos

## 🚀 Inicio Rápido

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/mimeticflaneur/real-estate-analyzer.git
cd real-estate-analyzer

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

### Build para producción

```bash
# Generar build optimizado
npm run build

# Previsualizar build
npm run preview
```

## 📖 Cómo Usar

### 1. Configurar parámetros de entrada

#### Hipótesis Generales
- **Impuesto rentas capital**: Normalmente 19-26% según tramos
- **Impuesto ganancias patrimoniales**: 19-26% sobre beneficio de venta
- **Bonificación alquiler**: 60% de reducción en España
- **Bonificación venta 1ª vivienda**: 95% si reinviertes en vivienda habitual

#### Adquisición
- **Valor vivienda**: Precio de compra
- **Entrada**: % que pagas de tu bolsillo (normalmente 10-30%)
- **ITP**: Impuesto de transmisiones (6-10% según comunidad)
- **Gastos notaría, registro, agencia**: Normalmente 2-3% adicional

#### Gastos Operativos (% anual sobre valor vivienda)
- **Comunidad**: 0.5-1%
- **IBI**: 0.3-0.5%
- **Mantenimiento**: 0.5-1%
- **Derramas**: 0.5-1%

#### Alquiler
- **Alquiler mensual**: Renta esperada
- **Ocupación**: % del año alquilado (83.33% = 10 meses)
- **Subida anual**: Incremento esperado de alquileres (IPC + prima)
- **Revalorización**: Incremento anual del valor del inmueble

### 2. Seleccionar escenario

Elige entre **Optimista**, **Base** o **Pesimista** para ver cómo cambian las métricas en diferentes condiciones de mercado.

### 3. Analizar resultados

El panel de decisión te indica si la compra es recomendada basándose en:
- ✅ TIR > TIR mínima (defecto: 8%)
- ✅ Cash-on-Cash > CoC mínimo (defecto: 5%)
- ✅ DSCR > 1.25 (capacidad de pago)
- ✅ Todos los cashflows positivos

### 4. Simular ventas

Haz clic en cualquier fila de la tabla de cashflows para ver:
- 💰 **Valor de venta** en ese año
- 💳 **Deuda pendiente** a pagar
- 🏦 **Impuestos** sobre la ganancia patrimonial
- 💵 **Cashflows acumulados** hasta ese momento
- 📊 **Retorno total** y **equity múltiple**
- 📈 **TIR** desde la compra hasta la venta

## 🧮 Conceptos Clave

### TIR (Tasa Interna de Retorno)
La TIR es el % de rentabilidad anual que obtienes. Si tu TIR es 10%, significa que tu dinero crece un 10% cada año. Es como el interés de un depósito, pero considerando todos los flujos de caja (positivos y negativos) a lo largo del tiempo.

**Ejemplo**: Inviertes 20.000€ y obtienes una TIR del 12%. Eso es mejor que dejar tu dinero en el banco al 2%.

### Cash-on-Cash
Mide cuánto dinero recibes cada año dividido por lo que invertiste al principio. Si pones 20.000€ y recibes 1.200€/año, tu CoC es 6%.

**Diferencia con TIR**: CoC solo mira el primer año. TIR mira todo el período de inversión.

### DSCR (Debt Service Coverage Ratio)
Es cuántas veces puedes pagar la hipoteca con los ingresos netos del alquiler.

- **DSCR > 1.25**: Bien. Ganas 25% más de lo que pagas
- **DSCR = 1.0**: Justo cubres la hipoteca
- **DSCR < 1.0**: Números rojos. Tienes que poner dinero de tu bolsillo

### Equity Multiple
Cuántas veces recuperas tu inversión inicial.

- **2.0x**: Duplicaste tu dinero
- **1.5x**: Ganaste un 50%
- **0.8x**: Perdiste un 20%

### Apalancamiento
Usar dinero prestado (hipoteca) para invertir. Si la propiedad sube más que el interés de la hipoteca, multiplicas ganancias. Si baja, multiplicas pérdidas.

**Ejemplo**: Compras por 100k€ con 10k€ tuyos y 90k€ de hipoteca. Si sube a 120k€, ganaste 20k€ sobre 10k€ invertidos = 200% de ganancia (sin apalancamiento hubiera sido solo 20%).

## 🛠️ Stack Tecnológico

- **React 18**: Framework UI
- **Vite**: Build tool ultrarrápido
- **Tailwind CSS**: Estilos utilitarios
- **Lucide React**: Iconos modernos

## 📁 Estructura del Proyecto

```
real-estate-analyzer/
├── src/
│   ├── components/
│   │   ├── CashflowTable.jsx      # Tabla de cashflows con simulación de venta
│   │   ├── InputSection.jsx       # Formulario de parámetros
│   │   ├── MetricsDisplay.jsx     # Métricas y resultados
│   │   ├── ThemeToggle.jsx        # Botón dark/light mode
│   │   └── Tooltip.jsx            # Tooltips explicativos
│   ├── hooks/
│   │   └── useTheme.jsx           # Hook de tema con contexto
│   ├── utils/
│   │   ├── calculations.js        # Lógica de cálculo financiero
│   │   ├── constants.js           # Valores por defecto
│   │   └── tooltips.js            # Contenido de tooltips
│   ├── App.jsx                    # Componente principal
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Estilos globales
├── public/                        # Assets estáticos
├── index.html                     # HTML principal
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🧪 Ejemplo de Uso

### Caso: Piso en Madrid

**Compra:**
- Precio: 130.000€
- Entrada: 10% (13.000€)
- Costes totales: ~17.000€ (ITP 6%, agencia 1%, notaría 1%, hipoteca 1.4%)
- **Equity inicial real**: 17.000€

**Alquiler:**
- Renta: 1.100€/mes
- Ocupación: 83% (10 meses/año)
- Gastos operativos: ~2.500€/año

**Hipoteca:**
- Importe: 117.000€
- Plazo: 30 años
- Interés: 1.4%
- Cuota: ~405€/mes

**Resultado con escenario base (10 años):**
- TIR: ~9.2%
- Cash-on-Cash año 1: ~7.8%
- Equity múltiple: 2.1x
- Ganancia neta: ~18.700€

**Si vendes en año 5:**
- Valor propiedad: ~143.500€
- Deuda pendiente: ~102.000€
- Neto venta + cashflows: ~41.500€
- **Retorno total sobre 17.000€**: 2.44x (144% ganancia)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Roadmap

- [ ] Exportar a PDF/Excel
- [ ] Comparar múltiples propiedades
- [ ] Gráficos de evolución temporal
- [ ] API para datos de mercado en tiempo real
- [ ] Calculadora de reinversión (efecto bola de nieve)
- [ ] Modo "portafolio" para múltiples inmuebles

## ⚠️ Disclaimer

Esta herramienta es solo para fines educativos y de análisis. No constituye asesoramiento financiero profesional. Consulta con un asesor financiero antes de tomar decisiones de inversión.

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles

## 👤 Autor

**Adrián Zapatera**
- Website: [zapatera.xyz](https://zapatera.xyz)
- Substack: [Cortando el Nudo](https://cortandoelnudo.substack.com/)
- Email: adrian@zapatera.xyz

---

⭐ Si te resulta útil, considera darle una estrella al repositorio!
