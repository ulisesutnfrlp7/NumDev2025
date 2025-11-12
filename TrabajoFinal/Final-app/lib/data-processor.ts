export interface DataPoint {
  x: number
  y: number
}

export interface AjusteLineal {
  m: number
  b: number
  r2: number
  formula: string
}

export interface AjusteExponencial {
  a: number
  b: number
  r2: number
  formula: string
}

export interface AjustePotencial {
  a: number
  b: number
  r2: number
  formula: string
}

export interface AjusteCuadratico {
  a: number
  b: number
  c: number
  r2: number
  formula: string
}

export interface ClusterData {
  data: DataPoint[]
  ajustes: {
    lineal: AjusteLineal
    exponencial: AjusteExponencial
    potencial: AjustePotencial
    cuadratico: AjusteCuadratico
  }
  timeRange: { min: number; max: number } // Track original data time range
}

// Función para calcular R²
function calcularR2(data: DataPoint[], predictor: (x: number) => number): number {
  const yMean = data.reduce((sum, p) => sum + p.y, 0) / data.length
  const ssTot = data.reduce((sum, p) => sum + Math.pow(p.y - yMean, 2), 0)
  const ssRes = data.reduce((sum, p) => sum + Math.pow(p.y - predictor(p.x), 2), 0)
  return 1 - ssRes / ssTot
}

// Ajuste lineal: y = mx + b
function ajusteLineal(data: DataPoint[]): AjusteLineal {
  const n = data.length
  const sumX = data.reduce((sum, p) => sum + p.x, 0)
  const sumY = data.reduce((sum, p) => sum + p.y, 0)
  const sumXY = data.reduce((sum, p) => sum + p.x * p.y, 0)
  const sumX2 = data.reduce((sum, p) => sum + p.x * p.x, 0)

  const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
  const b = (sumY - m * sumX) / n

  const predictor = (x: number) => m * x + b
  const r2 = calcularR2(data, predictor)

  return {
    m,
    b,
    r2,
    formula: `y = ${m.toFixed(4)}t + ${b.toFixed(2)}`,
  }
}

// Ajuste exponencial: y = a * e^(bx)
function ajusteExponencial(data: DataPoint[]): AjusteExponencial {
  const validData = data.filter((p) => p.y > 0)
  const lnData = validData.map((p) => ({ x: p.x, y: Math.log(p.y) }))

  const ajusteLinealLn = ajusteLineal(lnData)
  const a = Math.exp(ajusteLinealLn.b)
  const b = ajusteLinealLn.m

  const predictor = (x: number) => a * Math.exp(b * x)
  const r2 = calcularR2(validData, predictor)

  return {
    a,
    b,
    r2,
    formula: `y = ${a.toFixed(2)}e^(${b.toFixed(4)}t)`,
  }
}

// Ajuste potencial: y = a * x^b
function ajustePotencial(data: DataPoint[]): AjustePotencial {
  const validData = data.filter((p) => p.x > 0 && p.y > 0)
  const logData = validData.map((p) => ({ x: Math.log(p.x), y: Math.log(p.y) }))

  const ajusteLinealLog = ajusteLineal(logData)
  const a = Math.exp(ajusteLinealLog.b)
  const b = ajusteLinealLog.m

  const predictor = (x: number) => a * Math.pow(x, b)
  const r2 = calcularR2(validData, predictor)

  return {
    a,
    b,
    r2,
    formula: `y = ${a.toFixed(2)}t^${b.toFixed(4)}`,
  }
}

// Ajuste cuadrático: y = ax² + bx + c usando matriz inversa
function ajusteCuadratico(data: DataPoint[]): AjusteCuadratico {
  const n = data.length

  // Crear matriz X (con términos x², x, 1)
  const X: number[][] = data.map((p) => [p.x * p.x, p.x, 1])
  const Y: number[] = data.map((p) => p.y)

  // Calcular X^T * X
  const XtX: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        XtX[j][k] += X[i][j] * X[i][k]
      }
    }
  }

  // Calcular X^T * Y
  const XtY: number[] = [0, 0, 0]
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < 3; j++) {
      XtY[j] += X[i][j] * Y[i]
    }
  }

  // Resolver usando eliminación de Gauss
  const augmented = [
    [...XtX[0], XtY[0]],
    [...XtX[1], XtY[1]],
    [...XtX[2], XtY[2]],
  ]

  for (let i = 0; i < 3; i++) {
    // Encontrar pivote
    let maxRow = i
    for (let k = i + 1; k < 3; k++) {
      if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
        maxRow = k
      }
    }
    // Intercambiar filas
    ;[augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]]

    // Hacer ceros debajo del pivote
    for (let k = i + 1; k < 3; k++) {
      const factor = augmented[k][i] / augmented[i][i]
      for (let j = i; j < 4; j++) {
        augmented[k][j] -= factor * augmented[i][j]
      }
    }
  }

  // Sustitución hacia atrás
  const coef = [0, 0, 0]
  for (let i = 2; i >= 0; i--) {
    coef[i] = augmented[i][3]
    for (let j = i + 1; j < 3; j++) {
      coef[i] -= augmented[i][j] * coef[j]
    }
    coef[i] /= augmented[i][i]
  }

  const a = coef[0]
  const b = coef[1]
  const c = coef[2]

  const predictor = (x: number) => a * x * x + b * x + c
  const r2 = calcularR2(data, predictor)

  return {
    a,
    b,
    c,
    r2,
    formula: `y = ${a.toFixed(6)}t² + ${b.toFixed(4)}t + ${c.toFixed(2)}`,
  }
}

// Cargar y procesar datos del CSV
export async function loadCSVData(): Promise<Record<string, ClusterData>> {
  const response = await fetch("/datos_descargas.csv")
  const text = await response.text()

  const lines = text.trim().split("\n")
  const headers = lines[0].split(";")

  const clusters: Record<string, DataPoint[]> = {}

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(";")
    const t = Number.parseFloat(values[0].replace(",", "."))
    const pais = values[1]
    const tipo = values[2]
    const descargas = Number.parseFloat(values[3].replace(",", "."))

    const key = `${pais}_${tipo}`
    if (!clusters[key]) {
      clusters[key] = []
    }

    clusters[key].push({ x: t, y: descargas })
  }

  const result: Record<string, ClusterData> = {}

  for (const [key, data] of Object.entries(clusters)) {
    const timeRange = {
      min: Math.min(...data.map((p) => p.x)),
      max: Math.max(...data.map((p) => p.x)),
    }
    result[key] = {
      data,
      ajustes: {
        lineal: ajusteLineal(data),
        exponencial: ajusteExponencial(data),
        potencial: ajustePotencial(data),
        cuadratico: ajusteCuadratico(data),
      },
      timeRange, // Store original time range
    }
  }

  return result
}

// Predecir descargas en un tiempo futuro
export function predecirDescargas(cluster: ClusterData, dias: number): number {
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

  switch (mejorAjuste) {
    case "lineal":
      return ajustes.lineal.m * dias + ajustes.lineal.b
    case "exponencial":
      return ajustes.exponencial.a * Math.exp(ajustes.exponencial.b * dias)
    case "potencial":
      return ajustes.potencial.a * Math.pow(dias, ajustes.potencial.b)
    case "cuadratico":
      return ajustes.cuadratico.a * dias * dias + ajustes.cuadratico.b * dias + ajustes.cuadratico.c
  }
}

// Estimar tiempo para alcanzar un umbral de descargas
export function estimarTiempo(cluster: ClusterData, umbral: number): number {
  let tMin = 0
  let tMax = 5475

  while (tMax - tMin > 0.1) {
    const tMid = (tMin + tMax) / 2
    const prediccion = predecirDescargas(cluster, tMid)

    if (prediccion < umbral) {
      tMin = tMid
    } else {
      tMax = tMid
    }
  }

  return (tMin + tMax) / 2
}

// Parsear datos del CSV desde texto
export function parseCSVData(csvText: string): Record<string, ClusterData> {
  const lines = csvText.trim().split("\n")
  const headers = lines[0].split(";")

  const clusters: Record<string, DataPoint[]> = {}

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(";")
    if (values.length < 4) continue

    const t = Number.parseFloat(values[0].replace(",", "."))
    const pais = values[1].trim()
    const tipo = values[2].trim()
    const descargas = Number.parseFloat(values[3].replace(",", "."))

    if (isNaN(t) || isNaN(descargas)) continue

    const key = `${pais}_${tipo}`
    if (!clusters[key]) {
      clusters[key] = []
    }

    clusters[key].push({ x: t, y: descargas })
  }

  const result: Record<string, ClusterData> = {}

  for (const [key, data] of Object.entries(clusters)) {
    if (data.length > 0) {
      const timeRange = {
        min: Math.min(...data.map((p) => p.x)),
        max: Math.max(...data.map((p) => p.x)),
      }
      result[key] = {
        data,
        ajustes: {
          lineal: ajusteLineal(data),
          exponencial: ajusteExponencial(data),
          potencial: ajustePotencial(data),
          cuadratico: ajusteCuadratico(data),
        },
        timeRange, // Store original time range
      }
    }
  }

  return result
}
