"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { loadCSVData } from "@/lib/data-processor"
import { ClusterChart } from "@/components/cluster-chart"
import { BarChart3 } from "lucide-react"
import { useDataContext } from "@/lib/data-context"

export default function ValidacionPage() {
  const { clusters } = useDataContext()
  const [localClusters, setLocalClusters] = useState(clusters)

  useEffect(() => {
    if (!clusters) {
      loadCSVData().then(setLocalClusters)
    } else {
      setLocalClusters(clusters)
    }
  }, [clusters])

  const clusterKeys = localClusters ? Object.keys(localClusters) : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <main className="container mx-auto px-4 py-8">
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Análisis de los 6 Clusters
            </CardTitle>
            <CardDescription className="text-slate-400">
              Ajustes por mínimos cuadrados y coeficientes de determinación (R²) para cada combinación país × tipo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6">
              {clusterKeys.map((key) => {
                const cluster = localClusters![key]
                const [pais, tipo] = key.split("_")
                return (
                  <Card key={key} className="bg-slate-900/50 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-lg text-cyan-300">
                        {pais} - {tipo === "informativa" ? "Aplicación Informativa" : "Videojuego"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ClusterChart cluster={cluster} clusterName={key} />

                      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                          <p className="text-xs text-slate-400 mb-1">Lineal</p>
                          <p className="text-sm font-mono text-cyan-400">R² = {cluster.ajustes.lineal.r2.toFixed(4)}</p>
                          <p className="text-xs text-slate-500 mt-1 font-mono">
                            y = {cluster.ajustes.lineal.m.toFixed(3)}t + {cluster.ajustes.lineal.b.toFixed(2)}
                          </p>
                        </div>

                        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                          <p className="text-xs text-slate-400 mb-1">Exponencial</p>
                          <p className="text-sm font-mono text-green-400">
                            R² = {cluster.ajustes.exponencial.r2.toFixed(4)}
                          </p>
                          <p className="text-xs text-slate-500 mt-1 font-mono">
                            y = {cluster.ajustes.exponencial.a.toFixed(2)}e^({cluster.ajustes.exponencial.b.toFixed(4)}
                            t)
                          </p>
                        </div>

                        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                          <p className="text-xs text-slate-400 mb-1">Potencial</p>
                          <p className="text-sm font-mono text-blue-400">
                            R² = {cluster.ajustes.potencial.r2.toFixed(4)}
                          </p>
                          <p className="text-xs text-slate-500 mt-1 font-mono">
                            y = {cluster.ajustes.potencial.a.toFixed(2)}t^{cluster.ajustes.potencial.b.toFixed(4)}
                          </p>
                        </div>

                        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                          <p className="text-xs text-slate-400 mb-1">Cuadrático</p>
                          <p className="text-sm font-mono text-orange-400">
                            R² = {cluster.ajustes.cuadratico.r2.toFixed(4)}
                          </p>
                          <p className="text-xs text-slate-500 mt-1 font-mono">
                            y = {cluster.ajustes.cuadratico.a.toFixed(4)}t² + ...
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
