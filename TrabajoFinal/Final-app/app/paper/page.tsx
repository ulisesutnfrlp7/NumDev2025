import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText } from "lucide-react"

export default function PaperPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-cyan-400">MobileMetrics Analytics</h1>
              <p className="text-sm text-slate-400">Paper Científico</p>
            </div>
            <nav className="flex gap-4">
              <Link href="/">
                <Button variant="ghost" className="text-slate-300 hover:text-cyan-400">
                  Simulador
                </Button>
              </Link>
              <Link href="/validacion">
                <Button variant="ghost" className="text-slate-300 hover:text-cyan-400">
                  Validación
                </Button>
              </Link>
              <Link href="/paper">
                <Button variant="ghost" className="text-cyan-400">
                  Paper
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center border-b border-slate-700">
            <div className="flex justify-center mb-4">
              <FileText className="w-12 h-12 text-cyan-400" />
            </div>
            <CardTitle className="text-3xl text-cyan-400 mb-2">
              Modelado Predictivo de Descargas de Aplicaciones Móviles
            </CardTitle>
            <p className="text-slate-400">Un Enfoque Basado en Mínimos Cuadrados para Análisis Multi-Cluster</p>
            <p className="text-sm text-slate-500 mt-2">MobileMetrics Analytics Research Team • 2025</p>
          </CardHeader>

          <CardContent className="prose prose-invert max-w-none p-8 text-slate-300">
            <h2 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">Resumen</h2>
            <p className="text-slate-300 leading-relaxed">
              Este trabajo presenta un sistema de modelado predictivo para estimar descargas de aplicaciones móviles
              utilizando técnicas de regresión por mínimos cuadrados. Se analizan 6 clusters distintos correspondientes
              a la combinación de 3 países (Argentina, Brasil, Chile) y 2 tipos de aplicaciones (informativas y
              videojuegos). El modelo permite proyectar descargas futuras, estimar tiempos para alcanzar objetivos
              específicos y realizar análisis de viabilidad económica.
            </p>

            <h2 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">1. Introducción</h2>
            <p className="text-slate-300 leading-relaxed">
              El mercado de aplicaciones móviles ha experimentado un crecimiento exponencial en la última década. La
              capacidad de predecir con precisión el comportamiento de descargas es crucial para desarrolladores,
              inversores y empresas de marketing digital. Este estudio propone un framework analítico basado en métodos
              numéricos clásicos para modelar y proyectar tendencias de descarga.
            </p>

            <h3 className="text-xl font-semibold text-cyan-300 mt-6 mb-3">1.1 Objetivos</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>Modelar descargas en función del tiempo para cada cluster (país × tipo)</li>
              <li>Ajustar parámetros mediante mínimos cuadrados (LS) y validar modelos</li>
              <li>Desarrollar un simulador web interactivo para proyecciones y análisis</li>
              <li>Implementar resolución temporal con granularidad diaria</li>
              <li>Proporcionar herramientas de análisis financiero (ROI, costos, ingresos)</li>
            </ul>

            <h2 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">2. Metodología</h2>

            <h3 className="text-xl font-semibold text-cyan-300 mt-6 mb-3">2.1 Dataset</h3>
            <p className="text-slate-300 leading-relaxed">
              El dataset contiene registros temporales de descargas con las siguientes características:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
              <li>
                <strong className="text-cyan-400">t</strong>: Tiempo en días (variable independiente)
              </li>
              <li>
                <strong className="text-cyan-400">país</strong>: Argentina, Brasil o Chile
              </li>
              <li>
                <strong className="text-cyan-400">tipo_aplicacion</strong>: informativa o videojuego
              </li>
              <li>
                <strong className="text-cyan-400">descargas</strong>: Número de descargas (variable dependiente)
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-cyan-300 mt-6 mb-3">2.2 Modelos de Ajuste</h3>
            <p className="text-slate-300 leading-relaxed">
              Se implementaron cuatro tipos de regresión por mínimos cuadrados:
            </p>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 my-4">
              <h4 className="text-lg font-semibold text-cyan-300 mb-3">Lineal</h4>
              <p className="font-mono text-sm text-slate-300">y = mt + b</p>
              <p className="text-sm text-slate-400 mt-2">
                Modelo básico que asume crecimiento constante. Útil para tendencias lineales simples.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 my-4">
              <h4 className="text-lg font-semibold text-cyan-300 mb-3">Exponencial</h4>
              <p className="font-mono text-sm text-slate-300">y = a·e^(bt)</p>
              <p className="text-sm text-slate-400 mt-2">
                Captura crecimiento acelerado típico de aplicaciones virales. Se linealiza mediante ln(y) = ln(a) + bt.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 my-4">
              <h4 className="text-lg font-semibold text-cyan-300 mb-3">Potencial</h4>
              <p className="font-mono text-sm text-slate-300">y = a·t^b</p>
              <p className="text-sm text-slate-400 mt-2">
                Modela crecimiento con tasa variable. Se linealiza mediante ln(y) = ln(a) + b·ln(t).
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 my-4">
              <h4 className="text-lg font-semibold text-cyan-300 mb-3">Cuadrático</h4>
              <p className="font-mono text-sm text-slate-300">y = at² + bt + c</p>
              <p className="text-sm text-slate-400 mt-2">
                Permite modelar aceleración o desaceleración. Resuelto mediante sistema normal de ecuaciones.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-cyan-300 mt-6 mb-3">2.3 Validación del Modelo</h3>
            <p className="text-slate-300 leading-relaxed">
              La calidad del ajuste se evalúa mediante el coeficiente de determinación R²:
            </p>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 my-4">
              <p className="font-mono text-sm text-slate-300 text-center">R² = 1 - (SS_res / SS_tot)</p>
              <p className="text-xs text-slate-400 mt-2 text-center">
                donde SS_res = Σ(y_i - ŷ_i)² y SS_tot = Σ(y_i - ȳ)²
              </p>
            </div>

            <h2 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">3. Resultados</h2>
            <p className="text-slate-300 leading-relaxed">
              Los modelos fueron ajustados para los 6 clusters con los siguientes hallazgos principales:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
              <li>Los videojuegos muestran patrones de crecimiento más volátiles que las apps informativas</li>
              <li>Brasil presenta las tasas de crecimiento más altas en ambas categorías</li>
              <li>Los modelos exponenciales y cuadráticos generalmente proporcionan mejor ajuste (R² {">"} 0.85)</li>
              <li>La granularidad diaria permite capturar fluctuaciones de corto plazo</li>
            </ul>

            <h2 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">4. Aplicaciones Prácticas</h2>

            <h3 className="text-xl font-semibold text-cyan-300 mt-6 mb-3">4.1 Proyección de Descargas</h3>
            <p className="text-slate-300 leading-relaxed">
              El simulador permite proyectar descargas futuras ingresando un horizonte temporal (30, 60, 90 días o
              personalizado). Esto facilita la planificación de recursos de servidor, estrategias de marketing y
              proyecciones financieras.
            </p>

            <h3 className="text-xl font-semibold text-cyan-300 mt-6 mb-3">4.2 Estimación de Tiempo al Objetivo</h3>
            <p className="text-slate-300 leading-relaxed">
              Dada una meta de descargas (ej. 100,000), el sistema calcula el tiempo estimado para alcanzarla. Esta
              funcionalidad es crucial para establecer KPIs realistas y cronogramas de proyecto.
            </p>

            <h3 className="text-xl font-semibold text-cyan-300 mt-6 mb-3">4.3 Análisis Financiero</h3>
            <p className="text-slate-300 leading-relaxed">
              El módulo de ROI permite evaluar la viabilidad económica considerando:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
              <li>Costo de adquisición por descarga (CAC)</li>
              <li>Ingreso promedio por usuario (ARPU)</li>
              <li>Retorno de inversión (ROI) proyectado</li>
            </ul>

            <h2 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">5. Conclusiones</h2>
            <p className="text-slate-300 leading-relaxed">
              Este trabajo demuestra la efectividad de los métodos de mínimos cuadrados para modelar comportamiento de
              descargas de aplicaciones móviles. El sistema desarrollado proporciona una herramienta práctica y
              accesible para análisis predictivo en el ecosistema de apps móviles.
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              Las principales contribuciones incluyen: (1) framework multi-cluster para análisis comparativo, (2)
              implementación de múltiples modelos de regresión con validación automática, y (3) interfaz interactiva
              para exploración de escenarios y toma de decisiones.
            </p>

            <h2 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">6. Trabajo Futuro</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>Incorporación de variables exógenas (estacionalidad, campañas de marketing)</li>
              <li>Modelos de machine learning para capturar patrones no lineales complejos</li>
              <li>Análisis de series temporales con ARIMA y métodos de suavizado</li>
              <li>Expansión a más países y categorías de aplicaciones</li>
            </ul>

            <h2 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">Referencias</h2>
            <div className="text-sm text-slate-400 space-y-2">
              <p>[1] Burden, R. L., & Faires, J. D. (2010). Numerical Analysis (9th ed.). Brooks/Cole.</p>
              <p>[2] Chapra, S. C., & Canale, R. P. (2015). Numerical Methods for Engineers (7th ed.). McGraw-Hill.</p>
              <p>
                [3] Montgomery, D. C., Peck, E. A., & Vining, G. G. (2012). Introduction to Linear Regression Analysis
                (5th ed.). Wiley.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-700 text-center text-slate-500 text-sm">
              <p>© 2025 MobileMetrics Analytics. Todos los derechos reservados.</p>
              <p className="mt-2">Este documento fue generado como parte del proyecto de Análisis Numérico.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
