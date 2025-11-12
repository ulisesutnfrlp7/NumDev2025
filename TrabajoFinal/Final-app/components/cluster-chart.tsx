"use client"

import { useEffect, useRef } from "react"
import { Chart, type ChartConfiguration, registerables } from "chart.js"
import type { ClusterData } from "@/lib/data-processor"

Chart.register(...registerables)

interface ClusterChartProps {
  cluster: ClusterData
  clusterName: string
}

export function ClusterChart({ cluster, clusterName }: ClusterChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const scatterData = cluster.data.map((p) => ({ x: p.x, y: p.y }))

    const tMin = Math.min(...cluster.data.map((p) => p.x))
    const tMax = Math.max(...cluster.data.map((p) => p.x))
    const tRange = Array.from({ length: 100 }, (_, i) => tMin + ((tMax - tMin) * i) / 99)

    const linealPoints = tRange.map((t) => ({
      x: t,
      y: cluster.ajustes.lineal.m * t + cluster.ajustes.lineal.b,
    }))

    const exponencialPoints = tRange.map((t) => ({
      x: t,
      y: cluster.ajustes.exponencial.a * Math.exp(cluster.ajustes.exponencial.b * t),
    }))

    const potencialPoints = tRange
      .filter((t) => t > 0)
      .map((t) => ({
        x: t,
        y: cluster.ajustes.potencial.a * Math.pow(t, cluster.ajustes.potencial.b),
      }))

    const cuadraticoPoints = tRange.map((t) => ({
      x: t,
      y: cluster.ajustes.cuadratico.a * t * t + cluster.ajustes.cuadratico.b * t + cluster.ajustes.cuadratico.c,
    }))

    const config: ChartConfiguration = {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Exponencial",
            data: exponencialPoints,
            type: "line",
            borderColor: "red",
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
          },
          {
            label: "Datos",
            data: scatterData,
            backgroundColor: "rgba(34, 211, 238, 0.5)",
            borderColor: "rgba(34, 211, 238, 1)",
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Tiempo (días)",
              color: "#cbd5e1",
              font: { size: 12 },
            },
            ticks: { color: "#94a3b8", font: { size: 10 } },
            grid: { color: "rgba(255, 255, 255, 0.05)" },
          },
          y: {
            title: {
              display: true,
              text: "Descargas",
              color: "#cbd5e1",
              font: { size: 12 },
            },
            ticks: { color: "#94a3b8", font: { size: 10 } },
            grid: { color: "rgba(255, 255, 255, 0.05)" },
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
  }, [cluster, clusterName])

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}
