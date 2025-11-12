"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
