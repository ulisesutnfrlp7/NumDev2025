"use client"

import { useEffect, useRef } from "react"
import { Chart, type ChartConfiguration, registerables } from "chart.js"
import type { ClusterData } from "@/lib/data-processor"

Chart.register(...registerables)

interface DownloadChartProps {
  clusters: Record<string, ClusterData>
  selectedCountry: string
  selectedType: string
}

export function DownloadChart({ clusters, selectedCountry, selectedType }: DownloadChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const key = `${selectedCountry}_${selectedType}`
    const cluster = clusters[key]
    if (!cluster) return

    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const scatterData = cluster.data.map((p) => ({ x: p.x, y: p.y }))
    const tMin = cluster.timeRange.min
    const tMax = cluster.timeRange.max

    // Generate fitted curves only within observed data range
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
            label: "Datos Observados",
            data: scatterData,
            backgroundColor: "rgba(34, 211, 238, 0.6)",
            borderColor: "rgba(34, 211, 238, 1)",
            pointRadius: 4,
            pointHoverRadius: 6,
          },
          {
            label: `Lineal (R²=${cluster.ajustes.lineal.r2.toFixed(3)})`,
            data: linealPoints,
            type: "line",
            borderColor: "rgba(239, 68, 68, 0.8)",
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
            tension: 0,
          },
          {
            label: `Exponencial (R²=${cluster.ajustes.exponencial.r2.toFixed(3)})`,
            data: exponencialPoints,
            type: "line",
            borderColor: "rgba(34, 197, 94, 0.8)",
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
            tension: 0,
          },
          {
            label: `Potencial (R²=${cluster.ajustes.potencial.r2.toFixed(3)})`,
            data: potencialPoints,
            type: "line",
            borderColor: "rgba(59, 130, 246, 0.8)",
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
            tension: 0,
          },
          {
            label: `Cuadrático (R²=${cluster.ajustes.cuadratico.r2.toFixed(3)})`,
            data: cuadraticoPoints,
            type: "line",
            borderColor: "rgba(251, 146, 60, 0.8)",
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
            tension: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#e2e8f0",
              font: { size: 12 },
            },
          },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            titleColor: "#22d3ee",
            bodyColor: "#e2e8f0",
            borderColor: "#22d3ee",
            borderWidth: 1,
            callbacks: {
              label: (context) => {
                return `${context.dataset.label}: t=${context.parsed.x.toFixed(3)}, y=${context.parsed.y.toFixed(2)}`
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Tiempo (escala normalizada)",
              color: "#e2e8f0",
              font: { size: 14 },
            },
            ticks: { color: "#cbd5e1" },
            grid: { color: "rgba(255, 255, 255, 0.1)" },
          },
          y: {
            title: {
              display: true,
              text: "Descargas",
              color: "#e2e8f0",
              font: { size: 14 },
            },
            ticks: { color: "#cbd5e1" },
            grid: { color: "rgba(255, 255, 255, 0.1)" },
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
  }, [clusters, selectedCountry, selectedType])

  return (
    <div className="w-full h-[500px]">
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}
