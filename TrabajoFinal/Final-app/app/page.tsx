"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { DownloadChart } from "@/components/download-chart"
import { loadCSVData, parseCSVData, type ClusterData, predecirDescargas, estimarTiempo } from "@/lib/data-processor"
import { Calculator, TrendingUp, Clock, DollarSign, Upload } from "lucide-react"
import { CSVUploader } from "@/components/csv-uploader"
import { useDataContext } from "@/lib/data-context"

export default function SimuladorPage() {
  const { clusters, setClusters } = useDataContext()
  const [availableCountries, setAvailableCountries] = useState<string[]>([])
  const [availableTypes, setAvailableTypes] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState("Argentina")
  const [selectedType, setSelectedType] = useState("informativa")
  const [horizonte, setHorizonte] = useState(30)
  const [umbral, setUmbral] = useState(100000)
  const [costoDescarga, setCostoDescarga] = useState(0.5)
  const [ingresoDescarga, setIngresoDescarga] = useState(2.0)

  const [prediccion, setPrediccion] = useState<number | null>(null)
  const [tiempoEstimado, setTiempoEstimado] = useState<number | null>(null)
  const [uploadMessage, setUploadMessage] = useState("")

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

  const handleCSVUpload = (csvText: string) => {
    try {
      const newClusters = parseCSVData(csvText)
      setClusters(newClusters)
      updateCountriesAndTypes(newClusters)
      setPrediccion(null)
      setTiempoEstimado(null)
      setUploadMessage("Archivo CSV cargado correctamente. Los datos se han actualizado.")
      setTimeout(() => setUploadMessage(""), 5000)
    } catch (error) {
      setUploadMessage("Error al cargar el archivo CSV. Verifica el formato.")
      setTimeout(() => setUploadMessage(""), 5000)
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

  const calcularROI = () => {
    if (!prediccion) return null
    const costoTotal = prediccion * costoDescarga
    const ingresoTotal = prediccion * ingresoDescarga
    const ganancia = ingresoTotal - costoTotal
    const roi = ((ganancia / costoTotal) * 100).toFixed(2)
    return { costoTotal, ingresoTotal, ganancia, roi }
  }

  const roi = calcularROI()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-cyan-400">MobileMetrics Analytics</h1>
              <p className="text-sm text-slate-400">Simulador de Descargas de Aplicaciones</p>
            </div>
            <nav className="flex gap-4">
              <Link href="/">
                <Button variant="ghost" className="text-cyan-400">
                  Simulador
                </Button>
              </Link>
              <Link href="/validacion">
                <Button variant="ghost" className="text-slate-300 hover:text-cyan-400">
                  Validación
                </Button>
              </Link>
              <Link href="/paper">
                <Button variant="ghost" className="text-slate-300 hover:text-cyan-400">
                  Paper
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Cargar Datos
            </CardTitle>
            <CardDescription className="text-slate-400">
              Sube un archivo CSV con los datos de descargas para análisis personalizado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CSVUploader onUpload={handleCSVUpload} />
            {uploadMessage && (
              <div className="mt-4 p-3 bg-cyan-900/30 border border-cyan-500/50 rounded text-cyan-300 text-sm">
                {uploadMessage}
              </div>
            )}
          </CardContent>
        </Card>

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
                onClick={calcularPrediccion}
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

              {roi && (
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Costos:</span>
                    <span className="text-red-400">${roi.costoTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Ingresos:</span>
                    <span className="text-green-400">${roi.ingresoTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-300">ROI:</span>
                    <span className="text-cyan-400">{roi.roi}%</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
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
                <p className="text-slate-400 mb-2">Descargas proyectadas en {horizonte} días:</p>
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
