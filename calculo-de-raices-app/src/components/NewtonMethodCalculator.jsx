import React, { useState, useEffect } from 'react';
import { Calculator, Play, RotateCcw, Info } from 'lucide-react';

const NewtonMethodCalculator = () => {
  const [coefficients, setCoefficients] = useState({
    a: 1,  // coeficiente de x²
    b: -2, // coeficiente de x
    c: -3  // término independiente
  });
  
  const [x0, setX0] = useState(4);
  const [iterations, setIterations] = useState([]);
  const [maxIterations, setMaxIterations] = useState(10);
  const [tolerance, setTolerance] = useState(0.0001);
  const [isCalculating, setIsCalculating] = useState(false);

  // Función f(x) = ax² + bx + c
  const f = (x) => {
    return coefficients.a * x * x + coefficients.b * x + coefficients.c;
  };

  // Derivada f'(x) = 2ax + b
  const fPrime = (x) => {
    return 2 * coefficients.a * x + coefficients.b;
  };

  const calculateNewtonMethod = () => {
    setIsCalculating(true);
    const newIterations = [];
    let x = x0;
    let iteration = 0;

    newIterations.push({
      iteration: 0,
      x: x,
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

      const xNew = x - (fx / fpx);
      const error = Math.abs(xNew - x);

      newIterations.push({
        iteration: i,
        x: xNew,
        fx: f(xNew),
        fpx: fPrime(xNew),
        error: error
      });

      if (error < tolerance) {
        break;
      }

      x = xNew;
      iteration = i;
    }

    setIterations(newIterations);
    setIsCalculating(false);
  };

  const resetCalculation = () => {
    setIterations([]);
  };

  const handleCoefficientChange = (key, value) => {
    setCoefficients(prev => ({
      ...prev,
      [key]: parseFloat(value) || 0
    }));
  };

  const formatNumber = (num) => {
    return typeof num === 'number' ? num.toFixed(6) : num;
  };

  const getFunctionString = () => {
    const { a, b, c } = coefficients;
    let func = 'f(x) = ';
    
    // Término x²
    if (a !== 0) {
      func += a === 1 ? 'x²' : a === -1 ? '-x²' : `${a}x²`;
    }
    
    // Término x
    if (b !== 0) {
      if (a !== 0) {
        func += b > 0 ? ' + ' : ' - ';
        func += Math.abs(b) === 1 ? 'x' : `${Math.abs(b)}x`;
      } else {
        func += b === 1 ? 'x' : b === -1 ? '-x' : `${b}x`;
      }
    }
    
    // Término independiente
    if (c !== 0) {
      if (a !== 0 || b !== 0) {
        func += c > 0 ? ' + ' : ' - ';
        func += Math.abs(c);
      } else {
        func += c;
      }
    }
    
    return func;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-8">
          <Calculator className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Método de Newton-Raphson</h1>
        </div>

        {/* Información del método */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex items-start">
            <Info className="text-blue-600 mr-2 mt-1" size={20} />
            <div>
              <h3 className="text-blue-800 font-semibold mb-2">Fórmula del Método de Newton</h3>
              <p className="text-blue-700">x<sub>n+1</sub> = x<sub>n</sub> - f(x<sub>n</sub>)/f'(x<sub>n</sub>)</p>
              <p className="text-sm text-blue-600 mt-1">Para funciones cuadráticas: f(x) = ax² + bx + c</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Panel de entrada */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-2">
              Configuración del Problema
            </h2>
            
            {/* Función actual */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Función actual:</h3>
              <p className="text-lg font-mono text-blue-600">{getFunctionString()}</p>
            </div>

            {/* Coeficientes */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Coeficientes de la función cuadrática:</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Coeficiente de x² (a)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={coefficients.a}
                    onChange={(e) => handleCoefficientChange('a', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Coeficiente de x (b)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={coefficients.b}
                    onChange={(e) => handleCoefficientChange('b', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Término independiente (c)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={coefficients.c}
                    onChange={(e) => handleCoefficientChange('c', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Valor inicial y parámetros */}
            <div className="grid grid-cols-2 gap-4">
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
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-2">
              Resultados
            </h2>

            {iterations.length > 0 && (
              <div className="space-y-4">
                {/* Resultado final */}
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <h3 className="text-green-800 font-semibold mb-2">Resultado Final</h3>
                  <p className="text-green-700">
                    Raíz aproximada: <strong>{formatNumber(iterations[iterations.length - 1].x)}</strong>
                  </p>
                  <p className="text-sm text-green-600">
                    Convergió en {iterations.length - 1} iteraciones
                  </p>
                </div>

                {/* Tabla de iteraciones */}
                <div className="overflow-x-auto">
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
            )}

            {iterations.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Calculator size={48} className="mx-auto mb-4 opacity-50" />
                <p>Ingresa los valores y presiona "Calcular" para ver los resultados</p>
              </div>
            )}
          </div>
        </div>

        {/* Ejemplo de uso */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <h3 className="text-yellow-800 font-semibold mb-2">Ejemplo del problema mostrado</h3>
          <p className="text-yellow-700 mb-2">
            Para el problema f(x) = x² - 2x - 3 con X₀ = 4:
          </p>
          <ul className="text-sm text-yellow-600 list-disc list-inside space-y-1">
            <li>a = 1 (coeficiente de x²)</li>
            <li>b = -2 (coeficiente de x)</li>
            <li>c = -3 (término independiente)</li>
            <li>X₀ = 4 (valor inicial)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewtonMethodCalculator;