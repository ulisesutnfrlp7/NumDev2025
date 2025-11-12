"use client"

import { useEffect, useRef } from "react"
import { Chart, type ChartConfiguration, registerables } from "chart.js"
import type { ClusterData } from "@/lib/data-processor"

Chart.register(...registerables)

interface CombinedTypeChartProps {
  clusters: Record<string, ClusterData>
  typeName: string
}

// Mapa de colores por país
const countryColors: Record<string, { bg: string; border: string; line: string }> = {
  ARG: { bg: "rgba(59, 130, 246, 0.5)", border: "rgba(59, 130, 246, 1)", line: "rgb(59, 130, 246)" },
  MEX: { bg: "rgba(239, 68, 68, 0.5)", border: "rgba(239, 68, 68, 1)", line: "rgb(239, 68, 68)" },
  CHL: { bg: "rgba(168, 85, 247, 0.5)", border: "rgba(168, 85, 247, 1)", line: "rgb(168, 85, 247)" },
}

function getCountryFromKey(key: string): string {
  // Formato: PAIS_tipo
  const parts = key.split("_")
  return parts[0].toUpperCase()
}

function getBestFitType(cluster: ClusterData): "lineal" | "exponencial" | "potencial" | "cuadratico" {
  const ajustes = cluster.ajustes
  let mejorAjuste: "lineal" | "exponencial" | "potencial" | "cuadratico" = "lineal"
  let mejorR2 = ajustes.lineal.r2

  if (ajustes.exponencial.r2 > mejorR2) {
    mejorAjuste = "exponencial"
    mejorR2 = ajustes.exponencial.r2
  }
  if (ajustes.potencial.r2 > mejorR2) {
    mejorAjuste = "potencial"
    mejorR2 = ajustes.potencial.r2
  }
  if (ajustes.cuadratico.r2 > mejorR2) {
    mejorAjuste = "cuadratico"
    mejorR2 = ajustes.cuadratico.r2
  }

  return mejorAjuste
}

function generateFitPoints(
  cluster: ClusterData,
  fitType: "lineal" | "exponencial" | "potencial" | "cuadratico",
  tMin: number,
  tMax: number
) {
  const tRange = Array.from({ length: 100 }, (_, i) => tMin + ((tMax - tMin) * i) / 99)
  const ajustes = cluster.ajustes

  switch (fitType) {
    case "lineal":
      return tRange.map((t) => ({
        x: t,
        y: ajustes.lineal.m * t + ajustes.lineal.b,
      }))
    case "exponencial":
      return tRange.map((t) => ({
        x: t,
        y: ajustes.exponencial.a * Math.exp(ajustes.exponencial.b * t),
      }))
    case "potencial":
      return tRange
        .filter((t) => t > 0)
        .map((t) => ({
          x: t,
          y: ajustes.potencial.a * Math.pow(t, ajustes.potencial.b),
        }))
    case "cuadratico":
      return tRange.map((t) => ({
        x: t,
        y: ajustes.cuadratico.a * t * t + ajustes.cuadratico.b * t + ajustes.cuadratico.c,
      }))
  }
}

export function CombinedTypeChart({ clusters, typeName }: CombinedTypeChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Obtener rango de tiempo global
    let globalTMin = Infinity
    let globalTMax = -Infinity

    Object.values(clusters).forEach((cluster) => {
      if (cluster.data.length > 0) {
        const tMin = Math.min(...cluster.data.map((p) => p.x))
        const tMax = Math.max(...cluster.data.map((p) => p.x))
        globalTMin = Math.min(globalTMin, tMin)
        globalTMax = Math.max(globalTMax, tMax)
      }
    })

    const datasets: any[] = []

    // Crear datasets para cada país/cluster
    Object.entries(clusters).forEach(([key, cluster]) => {
      const country = getCountryFromKey(key)
      const colors = countryColors[country] || countryColors['ARG']
      const bestFitType = getBestFitType(cluster)

      // Dataset de la función de mejor bondad
      const fitPoints = generateFitPoints(cluster, bestFitType, globalTMin, globalTMax)

      datasets.push({
        label: `${country}`,
        data: fitPoints,
        borderColor: 'white',
        borderWidth: 3,
        pointRadius: 0,
        showLine: true,
        type: "line",
        fill: false,
        tension: 0.4,
        yAxisID: "y",
      })

      // Dataset de puntos de muestreo
      datasets.push({
        label: `${country} (datos)`,
        data: cluster.data.map((p) => ({ x: p.x, y: p.y })),
        backgroundColor: colors.bg,
        borderColor: colors.border,
        pointRadius: 4,
        pointHoverRadius: 6,
        showLine: false,
        yAxisID: "y",
      })

    })

    const config: ChartConfiguration = {
      type: "scatter",
      data: {
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              color: "#cbd5e1",
              font: { size: 12, family: "Segoe UI" },
              padding: 15,
            },
          },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            titleColor: "#f1f5f9",
            bodyColor: "#cbd5e1",
            borderColor: "#64748b",
            borderWidth: 1,
            padding: 12,
            titleFont: { size: 14, weight: "bold" },
            bodyFont: { size: 12 },
            callbacks: {
              label: function (context) {
                const label = context.dataset.label || ""
                const x = (context.parsed.x as number).toFixed(2)
                const y = (context.parsed.y as number).toFixed(2)
                return `${label}: x=${x}, y=${y}`
              },
            },
          },
        },
        scales: {
          x: {
            min: globalTMin,
            max: globalTMax,
            title: {
              display: true,
              text: "Tiempo (días)",
              color: "#cbd5e1",
              font: { size: 14, weight: "bold" },
            },
            ticks: {
              color: "#94a3b8",
              font: { size: 11 },
            },
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Descargas",
              color: "#cbd5e1",
              font: { size: 14, weight: "bold" },
            },
            ticks: {
              color: "#94a3b8",
              font: { size: 11 },
            },
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
            },
          },
        },
      },
    }

    chartRef.current = new Chart(ctx, config)

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [clusters])

  return (
    <div className="w-full h-[500px]">
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}
