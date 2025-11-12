"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { loadCSVData } from "@/lib/data-processor"
import { CombinedTypeChart } from "@/components/combined-type-chart"
import { LineChart } from "lucide-react"
import { useDataContext } from "@/lib/data-context"

export default function GraficosPage() {
  const { clusters } = useDataContext()
  const [localClusters, setLocalClusters] = useState(clusters)

  useEffect(() => {
    if (!clusters) {
      loadCSVData().then(setLocalClusters)
    } else {
      setLocalClusters(clusters)
    }
  }, [clusters])

  // Separar datos por tipo (informativa vs videojuego)
  const informaticaClusters: Record<string, any> = {}
  const videojuegosClusters: Record<string, any> = {}

  if (localClusters) {
    Object.entries(localClusters).forEach(([key, cluster]) => {
      if (key.includes("informativa")) {
        informaticaClusters[key] = cluster
      } else if (key.includes("videojuego")) {
        videojuegosClusters[key] = cluster
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <main className="container mx-auto px-4 py-8">
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <LineChart className="w-6 h-6" />
              Análisis Comparativo por Tipo de Aplicación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-8">
              {/* Gráfico de Informática */}
              <Card className="bg-slate-900/50 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-lg text-cyan-300">
                    Descargas - Aplicación Informativa (por País)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.keys(informaticaClusters).length > 0 ? (
                    <CombinedTypeChart
                      clusters={informaticaClusters}
                      typeName="informativa"
                    />
                  ) : (
                    <p className="text-gray-400">Cargando datos de informática...</p>
                  )}
                </CardContent>
              </Card>

              {/* Gráfico de Videojuegos */}
              <Card className="bg-slate-900/50 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-lg text-cyan-300">
                    Descargas - Videojuego (por País)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.keys(videojuegosClusters).length > 0 ? (
                    <CombinedTypeChart
                      clusters={videojuegosClusters}
                      typeName="videojuego"
                    />
                  ) : (
                    <p className="text-gray-400">Cargando datos de videojuegos...</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
