// src/components/BoundaryValueSolver.jsx

import React, { useState } from 'react';
import { Calculator, BookOpen, ChevronDown, ChevronUp, AlertCircle, CheckCircle } from 'lucide-react';

const BoundaryValueSolver = () => {
  const [activeTab, setActiveTab] = useState('theory');
  const [expandedSteps, setExpandedSteps] = useState({});
  
  const [formData, setFormData] = useState({
    A: '0',
    B: '-4',
    C: '4',
    D: 'Math.exp(-3*x)',
    x0: '0',
    y0: '0',
    xf: '1',
    yf: '-2',
    yfPrime: '',
    h: '0.25',
    finalConditionType: 'value'
  });

  const [solution, setSolution] = useState(null);
  const [error, setError] = useState('');

  const toggleStep = (step) => {
    setExpandedSteps(prev => ({...prev, [step]: !prev[step]}));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const evaluateExpression = (expr, x) => {
    try {
      return eval(expr.replace(/\^/g, '**'));
    } catch (e) {
      throw new Error(`Error evaluando expresión: ${expr}`);
    }
  };

  const solveBoundaryProblem = () => {
    try {
      setError('');
      
      const A = parseFloat(formData.A);
      const B = parseFloat(formData.B);
      const C = parseFloat(formData.C);
      const x0 = parseFloat(formData.x0);
      const xf = parseFloat(formData.xf);
      const y0 = parseFloat(formData.y0);
      const h = parseFloat(formData.h);
      
      const n = Math.round((xf - x0) / h);
      const points = [];
      
      for (let i = 0; i <= n; i++) {
        points.push({
          index: i,
          x: x0 + i * h
        });
      }

      const equations = [];
      const steps = [];

      const h2 = h * h;
      const coefYnMinus1 = 1 - (B * h) / 2;
      const coefYn = -2 - A * h2;
      const coefYnPlus1 = 1 + (B * h) / 2;

      steps.push({
        title: 'Paso 1: Fórmulas de Taylor',
        content: `Para un problema de contorno de la forma: Ay'' + By' + Cy = D

Usando series de Taylor alrededor de xₙ:
• y'ₙ = (yₙ₊₁ - yₙ₋₁) / (2h)
• y''ₙ = (yₙ₊₁ - 2yₙ + yₙ₋₁) / h²

Sustituyendo en la ecuación diferencial y multiplicando por h²:
(${coefYnMinus1.toFixed(4)})yₙ₋₁ + (${coefYn.toFixed(4)})yₙ + (${coefYnPlus1.toFixed(4)})yₙ₊₁ = h²·D`
      });

      steps.push({
        title: 'Paso 2: Datos del Problema',
        content: `• Ecuación: ${A !== 0 ? A + "y''" : ''}${B !== 0 ? (B > 0 ? ' + ' : ' ') + B + "y'" : ''}${C !== 0 ? (C > 0 ? ' + ' : ' ') + C + 'y' : ''} = D(x)
• Condición inicial: y(${x0}) = ${y0}
• Condición final: ${formData.finalConditionType === 'value' ? `y(${xf}) = ${formData.yf}` : `y'(${xf}) = ${formData.yfPrime}`}
• Paso h = ${h}
• Dominio: [${x0}, ${xf}]
• Número de puntos: ${n + 1}`
      });

      for (let i = 1; i < n; i++) {
        const xi = points[i].x;
        const Di = evaluateExpression(formData.D, xi);
        const rightSide = h2 * Di;
        
        let eq = {
          point: i,
          x: xi,
          coefficients: new Array(n + 1).fill(0),
          rightSide: rightSide,
          display: ''
        };

        if (i === 1) {
          eq.coefficients[0] = 0;
          eq.coefficients[1] = coefYn;
          eq.coefficients[2] = coefYnPlus1;
          eq.rightSide = rightSide - coefYnMinus1 * y0;
          eq.display = `(${coefYn.toFixed(2)})y₁ + (${coefYnPlus1.toFixed(2)})y₂ = ${eq.rightSide.toFixed(4)}`;
        } else if (i === n - 1 && formData.finalConditionType === 'value') {
          const yf = parseFloat(formData.yf);
          eq.coefficients[i - 1] = coefYnMinus1;
          eq.coefficients[i] = coefYn;
          eq.coefficients[i + 1] = 0;
          eq.rightSide = rightSide - coefYnPlus1 * yf;
          eq.display = `(${coefYnMinus1.toFixed(2)})y${i-1} + (${coefYn.toFixed(2)})y${i} = ${eq.rightSide.toFixed(4)}`;
        } else {
          eq.coefficients[i - 1] = coefYnMinus1;
          eq.coefficients[i] = coefYn;
          eq.coefficients[i + 1] = coefYnPlus1;
          eq.display = `(${coefYnMinus1.toFixed(2)})y${i-1} + (${coefYn.toFixed(2)})y${i} + (${coefYnPlus1.toFixed(2)})y${i+1} = ${rightSide.toFixed(4)}`;
        }

        equations.push(eq);
      }

      if (formData.finalConditionType === 'derivative') {
        const yfPrime = parseFloat(formData.yfPrime);
        const xn = points[n].x;
        const Dn = evaluateExpression(formData.D, xn);
        
        let eq = {
          point: n,
          x: xn,
          coefficients: new Array(n + 2).fill(0),
          rightSide: h2 * Dn,
          display: ''
        };

        eq.coefficients[n - 1] = coefYnMinus1;
        eq.coefficients[n] = coefYn;
        eq.coefficients[n + 1] = coefYnPlus1;
        eq.display = `(${coefYnMinus1.toFixed(2)})y${n-1} + (${coefYn.toFixed(2)})y${n} + (${coefYnPlus1.toFixed(2)})y${n+1} = ${eq.rightSide.toFixed(4)}`;
        
        equations.push(eq);

        const phantomEq = {
          point: 'phantom',
          isPhantom: true,
          coefficients: new Array(n + 2).fill(0),
          rightSide: 2 * h * yfPrime,
          display: `y${n+1} - y${n-1} = ${(2 * h * yfPrime).toFixed(4)}`
        };
        phantomEq.coefficients[n + 1] = 1;
        phantomEq.coefficients[n - 1] = -1;
        
        equations.push(phantomEq);

        steps.push({
          title: 'Paso 3: Punto Fantasma',
          content: `Como la condición final es una derivada y'(${xf}) = ${yfPrime},
necesitamos un "punto fantasma" y${n+1} fuera del dominio.

Usando: y'ₙ = (yₙ₊₁ - yₙ₋₁) / (2h)

Despejando: y${n+1} = y${n-1} + 2h·y'${n}
y${n+1} - y${n-1} = ${(2 * h * yfPrime).toFixed(4)}`
        });
      }

      steps.push({
        title: `Paso ${formData.finalConditionType === 'derivative' ? '4' : '3'}: Sistema de Ecuaciones`,
        content: `Sistema lineal resultante (${equations.length} ecuaciones con ${equations.length} incógnitas):

${equations.map((eq, idx) => `Ecuación ${idx + 1}: ${eq.display}`).join('\n')}`
      });

      steps.push({
        title: `Paso ${formData.finalConditionType === 'derivative' ? '5' : '4'}: Solución`,
        content: `Este sistema se puede resolver usando métodos como:
• Eliminación de Gauss
• Factorización LU
• Método de Thomas (para sistemas tridiagonales)

La solución numérica proporciona los valores de y en cada punto del dominio.`
      });

      setSolution({
        points,
        equations,
        steps,
        n
      });

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-250 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-blue-50 rounded-lg shadow-lg p-6 mb-6 border-t-4 border-blue-600">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Calculator className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Solucionador de Problemas de Contorno
              </h1>
              <p className="text-gray-600 mt-1">
                Método de Series de Taylor - UTN FRLP
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6 p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('theory')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold ${
                activeTab === 'theory'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="inline mr-2" size={20} />
              Teoría
            </button>
            <button
              onClick={() => setActiveTab('solver')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold ${
                activeTab === 'solver'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Calculator className="inline mr-2" size={20} />
              Resolver Problema
            </button>
          </div>
        </div>

        {/* Theory Tab */}
        {activeTab === 'theory' && (
          <div className="bg-blue-50 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              ¿Qué es un Problema de Contorno?
            </h2>
            
            <div className="space-y-6">
              <div className="bg-blue-100 border-l-4 border-blue-600 p-6 rounded">
                <h3 className="font-bold text-lg text-blue-900 mb-3">Definición</h3>
                <p className="text-gray-700 leading-relaxed">
                  Un problema de contorno es una ecuación diferencial de segundo orden 
                  donde conocemos los valores de la función en los extremos del dominio 
                  (o sus derivadas), y necesitamos encontrar los valores en los puntos intermedios.
                </p>
              </div>

              <div className="bg-purple-100 p-6 rounded-lg">
                <h3 className="font-bold text-lg text-gray-800 mb-4">Elementos de un Problema de Contorno</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-100 p-4 rounded-lg shadow">
                    <div className="font-semibold text-blue-700 mb-2">1. Ecuación Diferencial</div>
                    <div className="text-sm text-gray-700 bg-gray-100 p-2 rounded font-mono">
                      Ay'' + By' + Cy = D(x)
                    </div>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg shadow">
                    <div className="font-semibold text-blue-700 mb-2">2. Condición Inicial</div>
                    <div className="text-sm text-gray-700 bg-gray-100 p-2 rounded font-mono">
                      y(x₀) = y₀
                    </div>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg shadow">
                    <div className="font-semibold text-blue-700 mb-2">3. Condición Final</div>
                    <div className="text-sm text-gray-700 bg-gray-100 p-2 rounded font-mono">
                      y(xf) = yf o y'(xf) = y'f
                    </div>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg shadow">
                    <div className="font-semibold text-blue-700 mb-2">4. Dominio de Trabajo</div>
                    <div className="text-sm text-gray-700 bg-gray-100 p-2 rounded font-mono">
                      x₀ ≤ x ≤ xf
                    </div>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg shadow">
                    <div className="font-semibold text-blue-700 mb-2">5. Paso "h"</div>
                    <div className="text-sm text-gray-700 bg-gray-100 p-2 rounded font-mono">
                      xₙ₊₁ = xₙ + h
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-100 border-l-4 border-yellow-600 p-6 rounded">
                <h3 className="font-bold text-lg text-yellow-900 mb-3">
                  Método de Series de Taylor
                </h3>
                <p className="text-gray-700 mb-3">
                  Aproximamos las derivadas usando desarrollos de Taylor:
                </p>
                <div className="bg-white p-4 rounded-lg font-mono text-sm space-y-2">
                  <div>y'ₙ = (yₙ₊₁ - yₙ₋₁) / (2h)</div>
                  <div>y''ₙ = (yₙ₊₁ - 2yₙ + yₙ₋₁) / h²</div>
                </div>
              </div>

              <div className="bg-green-100 border-l-4 border-green-600 p-6 rounded">
                <h3 className="font-bold text-lg text-green-900 mb-3">
                  Ejemplo Práctico: Barra de Metal
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Imagina una barra de metal de 10 cm de largo que marcamos cada 1 cm. 
                  Aplicamos temperatura en ambos extremos. El problema de contorno nos 
                  permite calcular la temperatura en cada punto intermedio de la barra, 
                  sabiendo que depende de las temperaturas de los puntos vecinos.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Solver Tab */}
        {activeTab === 'solver' && (
          <div className="space-y-6">
            {/* Input Form */}
            <div className="bg-blue-50 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Ingrese los Datos del Problema
              </h2>

              <div className="space-y-6">
                {/* Ecuación Diferencial */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-4">
                    Ecuación Diferencial: Ay'' + By' + Cy = D(x)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Coef. A (y'')
                      </label>
                      <input
                        type="text"
                        name="A"
                        value={formData.A}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Coef. B (y')
                      </label>
                      <input
                        type="text"
                        name="B"
                        value={formData.B}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        placeholder="-4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Coef. C (y)
                      </label>
                      <input
                        type="text"
                        name="C"
                        value={formData.C}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        placeholder="4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Paso h
                      </label>
                      <input
                        type="text"
                        name="h"
                        value={formData.h}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        placeholder="0.25"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Función D(x) - Usa 'x' como variable
                    </label>
                    <input
                      type="text"
                      name="D"
                      value={formData.D}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none font-mono"
                      placeholder="Math.exp(-3*x)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Ejemplos: Math.exp(-3*x), 4*x**2 + 2, Math.sin(x)
                    </p>
                  </div>
                </div>

                {/* Condiciones de Contorno */}
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-4">Condiciones de Contorno</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        x₀ (inicial)
                      </label>
                      <input
                        type="text"
                        name="x0"
                        value={formData.x0}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        y(x₀)
                      </label>
                      <input
                        type="text"
                        name="y0"
                        value={formData.y0}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        xf (final)
                      </label>
                      <input
                        type="text"
                        name="xf"
                        value={formData.xf}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo de Condición Final
                    </label>
                    <select
                      name="finalConditionType"
                      value={formData.finalConditionType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="value">Valor: y(xf) = yf</option>
                      <option value="derivative">Derivada: y'(xf) = y'f</option>
                    </select>
                  </div>

                  {formData.finalConditionType === 'value' ? (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        y(xf)
                      </label>
                      <input
                        type="text"
                        name="yf"
                        value={formData.yf}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        y'(xf)
                      </label>
                      <input
                        type="text"
                        name="yfPrime"
                        value={formData.yfPrime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                <button
                  onClick={solveBoundaryProblem}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 shadow-lg"
                >
                  Resolver Problema
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-600 p-4 rounded flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-bold text-red-800 mb-1">Error</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Solution Display */}
            {solution && (
              <div className="bg-blue-50 rounded-lg shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="text-green-600" size={28} />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Solución Paso a Paso
                  </h2>
                </div>

                <div className="space-y-4">
                  {solution.steps.map((step, idx) => (
                    <div key={idx} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleStep(idx)}
                        className="w-full bg-blue-50 p-4 flex items-center justify-between hover:bg-blue-100"
                      >
                        <span className="font-bold text-gray-800 text-left">
                          {step.title}
                        </span>
                        {expandedSteps[idx] ? (
                          <ChevronUp className="text-blue-600" />
                        ) : (
                          <ChevronDown className="text-blue-600" />
                        )}
                      </button>
                      
                      {expandedSteps[idx] && (
                        <div className="p-6 bg-white">
                          <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans">
                            {step.content}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Tabla de puntos */}
                  <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-green-50 p-4">
                      <span className="font-bold text-gray-800">
                        Tabla de Puntos del Dominio
                      </span>
                    </div>
                    <div className="p-6 bg-white overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Índice</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">xₙ</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">yₙ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {solution.points.map((point, idx) => (
                            <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                              <td className="px-4 py-2 font-mono">{point.index}</td>
                              <td className="px-4 py-2 font-mono">{point.x.toFixed(4)}</td>
                              <td className="px-4 py-2 text-gray-500">
                                {idx === 0 ? formData.y0 : 
                                (idx === solution.points.length - 1 && formData.finalConditionType === 'value') ? formData.yf : '?'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BoundaryValueSolver;