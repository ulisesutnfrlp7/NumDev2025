"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DownloadChart } from "@/components/download-chart"
import { loadCSVData, type ClusterData, predecirDescargas, estimarTiempo } from "@/lib/data-processor"
import { Calculator, TrendingUp, Clock, DollarSign, Target } from "lucide-react"
import { useDataContext } from "@/lib/data-context"
import { generarReportePDF } from "@/lib/generarPDF"
import { toBase64 } from "@/lib/toBase64";

export default function SimuladorPage() {
  const { clusters, setClusters } = useDataContext()
  const [availableCountries, setAvailableCountries] = useState<string[]>([])
  const [availableTypes, setAvailableTypes] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState("Argentina")
  const [selectedType, setSelectedType] = useState("informativa")
  const [horizonte, setHorizonte] = useState(30)
  const [horizonteLabel, setHorizonteLabel] = useState(0)
  const [umbral, setUmbral] = useState(100000)
  const [costoDescarga, setCostoDescarga] = useState(0.5)
  const [ingresoDescarga, setIngresoDescarga] = useState(2.0)

  const [montoObjetivo, setMontoObjetivo] = useState<number | null>(50000) 
  const [tiempoObjetivoFinanciero, setTiempoObjetivoFinanciero] = useState<number | null>(null)

  const [prediccion, setPrediccion] = useState<number | null>(null)
  const [tiempoEstimado, setTiempoEstimado] = useState<number | null>(null)

  // Cargar datos iniciales
  useEffect(() => {
    if (!clusters) {
      loadCSVData().then((data) => {
        setClusters(data)
        updateCountriesAndTypes(data)
      })
    } else {
      updateCountriesAndTypes(clusters)
    }
  }, [])

  const updateCountriesAndTypes = (data: Record<string, ClusterData>) => {
    const countries = Array.from(new Set(Object.keys(data).map((key) => key.split("_")[0]))).sort()
    const types = Array.from(new Set(Object.keys(data).map((key) => key.split("_")[1]))).sort()
    setAvailableCountries(countries)
    setAvailableTypes(types)
    if (countries.length > 0) {
      setSelectedCountry(countries[0])
    }
    if (types.length > 0) {
      setSelectedType(types[0])
    }
  }

  const calcularPrediccion = () => {
    if (!clusters) return
    const key = `${selectedCountry}_${selectedType}`
    const cluster = clusters[key]
    if (cluster) {
      const pred = predecirDescargas(cluster, horizonte)
      setPrediccion(pred)
    }
  }

  const calcularTiempo = () => {
    if (!clusters) return
    const key = `${selectedCountry}_${selectedType}`
    const cluster = clusters[key]
    if (cluster) {
      const tiempo = estimarTiempo(cluster, umbral)
      setTiempoEstimado(tiempo)
    }
  }

  const calcularTiempoFinanciero = () => {
    if (!clusters || montoObjetivo === null) {
        setTiempoObjetivoFinanciero(null)
        return
    }
    const huellaRentabilidad = ingresoDescarga - costoDescarga;

    if (huellaRentabilidad <= 0) {
        setTiempoObjetivoFinanciero(Infinity) 
        return
    }

    const umbralDescargasRequerido = montoObjetivo / huellaRentabilidad;

    const key = `${selectedCountry}_${selectedType}`
    const cluster = clusters[key]
    if (cluster) {
        const tiempo = estimarTiempo(cluster, umbralDescargasRequerido)
        setTiempoObjetivoFinanciero(tiempo)
    }
  }

  const calcularROI = () => {
    if (!prediccion) return null
    const costoTotal = prediccion * costoDescarga
    const ingresoTotal = prediccion * ingresoDescarga
    const ganancia = ingresoTotal - costoTotal
    const roi = ((ganancia / costoTotal) * 100).toFixed(2)
    return { costoTotal, ingresoTotal, ganancia, roi }
  }

  const roi = calcularROI()

  useEffect(() => {
    calcularTiempoFinanciero()
  }, [montoObjetivo, costoDescarga, ingresoDescarga, selectedCountry, selectedType, clusters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Configuración
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-slate-300 mb-1" >País</Label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="bg-slate-900 border-slate-600 text-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-600">
                    {availableCountries.map((country) => (
                      <SelectItem className="text-white" key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-slate-300 mb-1">Tipo de Aplicación</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="bg-slate-900 border-slate-600 text-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-600">
                    {availableTypes.map((type) => (
                      <SelectItem className="text-white" key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-slate-300 mb-1">Horizonte (días)</Label>
                <Input
                  type="number"
                  value={horizonte}
                  onChange={(e) => setHorizonte(Number(e.target.value))}
                  className="bg-slate-900 border-slate-600 text-slate-200"
                />
              </div>

              <Button
                onClick={() => {
                  calcularPrediccion()
                  setHorizonteLabel(horizonte)
                }}
                className="w-full bg-cyan-600 hover:bg-cyan-700"
                disabled={!clusters}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Proyectar Descargas
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Tiempo al Objetivo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-slate-300 mb-1">Umbral de Descargas</Label>
                <Input
                  type="number"
                  value={umbral}
                  onChange={(e) => setUmbral(Number(e.target.value))}
                  className="bg-slate-900 border-slate-600 text-slate-200"
                  placeholder="100000"
                />
              </div>

              <Button onClick={calcularTiempo} className="w-full bg-cyan-600 hover:bg-cyan-700" disabled={!clusters}>
                <Clock className="w-4 h-4 mr-2" />
                Estimar Tiempo
              </Button>

              {tiempoEstimado !== null && (
                <div className="p-4 bg-slate-900 rounded-lg border border-cyan-500/30">
                  <p className="text-sm text-slate-400">Tiempo estimado:</p>
                  <p className="text-2xl font-bold text-cyan-400">{tiempoEstimado.toFixed(1)} días</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Análisis Financiero
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-slate-300 mb-1">Costo por Descarga ($)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={costoDescarga}
                  onChange={(e) => setCostoDescarga(Number(e.target.value))}
                  className="bg-slate-900 border-slate-600 text-slate-200"
                />
              </div>

              <div>
                <Label className="text-slate-300 mb-1">Ingreso por Descarga ($)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={ingresoDescarga}
                  onChange={(e) => setIngresoDescarga(Number(e.target.value))}
                  className="bg-slate-900 border-slate-600 text-slate-200"
                />
              </div>

              <div className="pt-4 border-t border-slate-700 pb-2">
                <Label className="text-slate-300 mb-1 flex items-center gap-1">
                    <Target className="w-4 h-4 text-cyan-500"/>
                    Meta de Ganancia Neta ($)
                </Label>
                <Input
                    type="number"
                    step="1000"
                    value={montoObjetivo ?? ''} 
                    onChange={(e) => setMontoObjetivo(e.target.value ? Number(e.target.value) : null)}
                    className="bg-slate-900 border-cyan-600 text-slate-200 font-bold mt-2"
                    placeholder="50000"
                />
                {tiempoObjetivoFinanciero !== null && isFinite(tiempoObjetivoFinanciero) && montoObjetivo !== null && (
                  <div className="p-4 bg-slate-900 rounded-lg border border-cyan-500/30 text-center mt-4">
                      <p className="text-sm text-slate-400 mb-1">Tiempo para alcanzar ${montoObjetivo.toLocaleString()} de Ganancia Neta:</p>
                      <p className="text-3xl font-bold text-cyan-400">
                          {tiempoObjetivoFinanciero.toFixed(1)} días
                      </p>
                  </div>
                )}
                {tiempoObjetivoFinanciero === Infinity && (
                    <div className="p-4 bg-red-900/50 rounded-lg border border-red-500/30 text-center">
                        <p className="text-sm text-red-400 font-medium">Margen de Ganancia Negativo o Cero. La meta es inalcanzable con estos costos/ingresos.</p>
                    </div>
                )}
              </div>
              {roi && (
                <div className="space-y-2 pt-2 border-t border-slate-700">
                    <CardDescription className="text-cyan-300">Resumen Proyectado ({horizonteLabel} días):</CardDescription>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Costos:</span>
                      <span className="text-red-400">${roi.costoTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Ingresos:</span>
                      <span className="text-green-400">${roi.ingresoTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Ganancia Neta:</span>
                        <span className={`font-bold ${roi.ganancia >= 0 ? 'text-green-400' : 'text-red-400'}`}>${roi.ganancia.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold">
                        <span className="text-slate-300">ROI Proyectado:</span>
                        <span className="text-cyan-400">{roi.roi}%</span>
                    </div>
                </div>
              )}
            </CardContent>
          </Card>
          <Button
            onClick={ async () => {
              const base64Logo = await toBase64("/mbanalyt.png");
              const tiempoRedondeado = tiempoObjetivoFinanciero 
                ? Math.ceil(tiempoObjetivoFinanciero)
                : "-";
              const descargasRedondeadas = prediccion
                ? Math.ceil(prediccion)
                : "-";
              generarReportePDF({
                pais: selectedCountry,
                tipo: selectedType === "informativa" ? "Informativa" : "Videojuego",
                costoDescarga,
                ingresoDescarga,
                metaGanancia: montoObjetivo,
                tiempoEstimado: tiempoRedondeado,
                detalleResultados: [
                  ["Descargas proyectadas", descargasRedondeadas?.toLocaleString() ?? "-"],
                  ["ROI proyectado", roi?.roi + "%" ?? "-"]
                ],
                logoBase64: base64Logo
              })
            }
          }
            className="bg-cyan-600 hover:bg-cyan-700 text-lg"
          >
            Descargar PDF Para Análisis Ejecutivo
          </Button>
        </div>

        {prediccion !== null && (
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-cyan-400">Resultado de Proyección</CardTitle>
              <CardDescription className="text-slate-400">
                {selectedCountry} - {selectedType === "informativa" ? "Aplicación Informativa" : "Videojuego"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <p className="text-slate-400 mb-2">Descargas proyectadas en {horizonteLabel} días:</p>
                <p className="text-5xl font-bold text-cyan-400">
                  {prediccion.toLocaleString("es-ES", { maximumFractionDigits: 0 })}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-cyan-400">Visualización Interactiva</CardTitle>
            <CardDescription className="text-slate-400">Gráfico de descargas en función del tiempo</CardDescription>
          </CardHeader>
          <CardContent>
            {clusters && (
              <DownloadChart clusters={clusters} selectedCountry={selectedCountry} selectedType={selectedType} />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
