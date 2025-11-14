"use client"

import { useEffect, useRef } from "react"
import { Chart, type ChartConfiguration, registerables } from "chart.js"
import type { ClusterData } from "@/lib/data-processor"

Chart.register(...registerables)

interface CombinedTypeChartProps {
	clusters: Record<string, ClusterData>
	typeName: string
}

// COMENTARIO: Se redefinen las claves del mapa de colores para usar los nombres completos de los países.
const countryColors: Record<string, { bg: string; border: string; line: string }> = {
	// Clave: Nombre capitalizado (Argentina)
	Argentina: { bg: "rgba(0, 188, 212, 0.4)", border: "rgba(9, 105, 117, 1)", line: "rgba(4, 220, 248, 1)" }, // Celeste (Cyan)
	Chile: { bg: "rgba(172, 48, 75, 1) 1)", border: "rgba(172, 48, 75, 1) 1)", line: "rgba(250, 3, 3, 1)" }, // Rojo
	México: { bg: "rgba(12, 207, 87, 0.4)", border: "rgba(4, 110, 61, 1)", line: "rgba(8, 255, 28, 1)" }, // Verde (Teal)
}

// COMENTARIO: Se elimina countryNames ya que el nombre completo se usará como clave principal.
// Se añade una función auxiliar para capitalizar nombres.
function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function getCountryFromKey(key: string): string {
	// Formato esperado de la key: PAIS_tipo (ej: ARG_informativa, ARGENTINA_informativa, Argentina_informativa)
	const parts = key.split("_")
	let countryName = parts[0].trim()

	// COMENTARIO: Normaliza las claves de 3 letras a su nombre completo para buscar en countryColors.
	if (countryName.toUpperCase() === 'ARG') return 'Argentina';
	if (countryName.toUpperCase() === 'CHL') return 'Chile';
	if (countryName.toUpperCase() === 'MEX') return 'México';

	// COMENTARIO: Si es el nombre completo, se capitaliza para asegurar que coincida con la clave del mapa.
	return capitalize(countryName);
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
			const countryNameKey = getCountryFromKey(key) // Obtiene el nombre completo capitalizado (ej: Argentina)
			
			// COMENTARIO: Se usa el nombre capitalizado para buscar el color. Se utiliza 'Argentina' como fallback.
			const colors = countryColors[countryNameKey] || countryColors['Argentina']
			
			const formattedCountry = countryNameKey // El valor ya está formateado correctamente para la leyenda (ej: Argentina)

			const bestFitType = getBestFitType(cluster)

			// Dataset de la función de mejor bondad
			const fitPoints = generateFitPoints(cluster, bestFitType, globalTMin, globalTMax)

			datasets.push({
				// COMENTARIO: Usa el nombre completo para la leyenda de la función.
				label: formattedCountry,
				data: fitPoints,
				// COMENTARIO: Usa el color fuerte ('line') para la función.
				borderColor: colors.line,
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
				// COMENTARIO: Usa el nombre completo para la leyenda de los datos.
				label: `${formattedCountry} (datos)`,
				data: cluster.data.map((p) => ({ x: p.x, y: p.y })),
				// COMENTARIO: Usa el color suave/semitransparente ('bg') para el fondo de los puntos.
				backgroundColor: colors.bg,
				// COMENTARIO: Usa el color fuerte ('border') para el borde de los puntos.
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