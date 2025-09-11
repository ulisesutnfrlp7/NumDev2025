// src/components/NewtonMethodCalculator.jsx


import React, { useState } from 'react';
import { Calculator, Play, RotateCcw, Info } from 'lucide-react';

const NewtonMethodCalculator = () => {
  // 🔹 guardamos por separado el texto y el valor numérico
  const [coeffInputs, setCoeffInputs] = useState({ a: "1", b: "-2", c: "-3" });
  const [coefficients, setCoefficients] = useState({ a: 1, b: -2, c: -3 });

  const [x0, setX0] = useState(4);
  const [iterations, setIterations] = useState([]);
  const [maxIterations, setMaxIterations] = useState(10);
  const [tolerance, setTolerance] = useState(0.0001);
  const [isCalculating, setIsCalculating] = useState(false);

  // Función f(x) = ax² + bx + c
  const f = (x) => coefficients.a * x * x + coefficients.b * x + coefficients.c;

  // Derivada f'(x) = 2ax + b
  const fPrime = (x) => 2 * coefficients.a * x + coefficients.b;

  const calculateNewtonMethod = () => {
    setIsCalculating(true);
    const newIterations = [];
    let x = x0;

    newIterations.push({
      iteration: 0,
      x,
      fx: f(x),
      fpx: fPrime(x),
      error: null
    });

    for (let i = 1; i <= maxIterations; i++) {
      const fx = f(x);
      const fpx = fPrime(x);

      if (Math.abs(fpx) < 1e-15) {
        alert('La derivada es muy pequeña. El método puede no converger.');
        break;
      }

      const xNew = x - fx / fpx;
      const error = Math.abs(xNew - x);

      newIterations.push({
        iteration: i,
        x: xNew,
        fx: f(xNew),
        fpx: fPrime(xNew),
        error
      });

      if (error < tolerance) break;

      x = xNew;
    }

    setIterations(newIterations);
    setIsCalculating(false);
  };

  const resetCalculation = () => setIterations([]);

  // 👉 Maneja tanto fracciones como decimales y guarda el texto original
  const handleCoefficientChange = (key, value) => {
    setCoeffInputs((prev) => ({ ...prev, [key]: value })); // guardamos lo escrito

    let parsed = 0;
    if (value.includes("/")) {
      const [num, den] = value.split("/").map(Number);
      if (!isNaN(num) && !isNaN(den) && den !== 0) {
        parsed = num / den;
      }
    } else {
      parsed = parseFloat(value);
    }

    setCoefficients((prev) => ({
      ...prev,
      [key]: isNaN(parsed) ? 0 : parsed
    }));
  };

  const formatNumber = (num) =>
    typeof num === "number" && !isNaN(num) ? num.toFixed(6) : num;

  const getFunctionString = () => {
    const { a, b, c } = coefficients;
    let func = "f(x) = ";
    if (a !== 0) func += a === 1 ? "x²" : a === -1 ? "-x²" : `${a}x²`;
    if (b !== 0) {
      if (a !== 0) func += b > 0 ? " + " : " - ";
      func += Math.abs(b) === 1 ? "x" : `${Math.abs(b)}x`;
    }
    if (c !== 0) {
      if (a !== 0 || b !== 0) func += c > 0 ? " + " : " - ";
      func += Math.abs(c);
    }
    return func;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 hover:scale-105 transition-transform">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-8">
          <Calculator className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Método de Newton-Raphson</h1>
        </div>

        {/* Configuración */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Función */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Función actual:</h3>
              <p className="text-lg font-mono text-blue-600">{getFunctionString()}</p>
            </div>

            {/* Coeficientes */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">
                Coeficientes de la función cuadrática:
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {["a", "b", "c"].map((key, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {key === "a"
                        ? "Coeficiente de x² (a)"
                        : key === "b"
                        ? "Coeficiente de x (b)"
                        : "Término independiente (c)"}
                    </label>
                    <input
                      type="text"
                      value={coeffInputs[key]} // 👈 mostramos lo que el usuario escribió
                      onChange={(e) => handleCoefficientChange(key, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Valor inicial */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Valor inicial (X₀)
              </label>
              <input
                type="number"
                step="any"
                value={x0}
                onChange={(e) => setX0(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Parámetros */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Tolerancia
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={tolerance}
                  onChange={(e) => setTolerance(parseFloat(e.target.value) || 0.0001)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Máximo de iteraciones
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={maxIterations}
                  onChange={(e) => setMaxIterations(parseInt(e.target.value) || 10)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                onClick={calculateNewtonMethod}
                disabled={isCalculating}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Play size={16} />
                {isCalculating ? 'Calculando...' : 'Calcular'}
              </button>

              <button
                onClick={resetCalculation}
                className="flex items-center gap-2 bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                <RotateCcw size={16} />
                Limpiar
              </button>
            </div>
          </div>

          {/* Resultados */}
          <div>
            {iterations.length > 0 && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <h3 className="text-green-800 font-semibold mb-2">Resultado Final</h3>
                <p className="text-green-700">
                  Raíz aproximada:{" "}
                  <strong>{formatNumber(iterations[iterations.length - 1].x)}</strong>
                </p>
                <p className="text-sm text-green-600">
                  Convergió en {iterations.length - 1} iteraciones
                </p>
              </div>
            )}
            {/* 👉 Ahora la tabla queda justo debajo del resultado final */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">n</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">x<sub>n</sub></th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">f(x<sub>n</sub>)</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">f'(x<sub>n</sub>)</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Error</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {iterations.map((iter, index) => (
                    <tr key={index} className={index === iterations.length - 1 ? 'bg-green-50' : ''}>
                      <td className="px-3 py-2 text-sm text-gray-900">{iter.iteration}</td>
                      <td className="px-3 py-2 text-sm font-mono text-gray-900">{formatNumber(iter.x)}</td>
                      <td className="px-3 py-2 text-sm font-mono text-gray-900">{formatNumber(iter.fx)}</td>
                      <td className="px-3 py-2 text-sm font-mono text-gray-900">{formatNumber(iter.fpx)}</td>
                      <td className="px-3 py-2 text-sm font-mono text-gray-900">
                        {iter.error !== null ? formatNumber(iter.error) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewtonMethodCalculator;