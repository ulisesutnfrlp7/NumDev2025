// src/components/InitialValueTaylorSolver.jsx

import React, { useState } from 'react';
import { Calculator, BookOpen, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * InitialValueTaylorSolver
 * - Método de Taylor para EDOs de primer orden: y' = f(x,y)
 * - Calcula hasta orden especificado (recomendado 1..4)
 * - Derivadas sucesivas por diferencias finitas centradas + regla de derivada total
 *
 * Integrar visualmente con tu BoundaryValueSolver.
 */

const InitialValueTaylorSolver = () => {
  const [activeTab, setActiveTab] = useState('theory');
  const [expanded, setExpanded] = useState({});
  const [form, setForm] = useState({
    f: 'x + y',            // ejemplo por defecto
    x0: '0',
    y0: '1',
    xf: '1',
    h: '0.1',
    order: '3',
    exact: ''              // expresion opcional de solución exacta y(x)
  });
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const toggle = (i) => setExpanded(prev => ({...prev, [i]: !prev[i]}));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({...prev, [name]: value}));
  };

  // crea una función JS a partir de la expresión del usuario en términos de x,y
  const makeFunc = (expr) => {
    // permite usar Math.* funciones sin escribir Math explícito
    const safeExpr = expr.replace(/\^/g, '**');
    try {
      // crear una función que use Math dentro de with para conveniencia
      // Nota: usar "with" facilita el acceso a Math.sin, etc.
      // Alternativa: new Function('x','y','return ' + safeExpr)
      // En entornos productivos deberías sanitizar la entrada.
      // Aquí seguimos el patrón ya usado en tu código (eval-like).
      return new Function('x','y', `with (Math) { return (${safeExpr}); }`);
    } catch (e) {
      throw new Error('Expresión inválida: ' + expr);
    }
  };

  // evaluar f(x,y) con protección
  const evalF = (fn, x, y) => {
    try {
      const v = fn(x, y);
      if (!isFinite(v)) throw new Error('No finito');
      return v;
    } catch (e) {
      throw new Error(`Error evaluando f en (x=${x}, y=${y}): ${e.message}`);
    }
  };

  // aproxima parciales (central differences) de una función G(x,y)
  // G is a function (x,y) => number
  const partialsCentral = (G, x, y, eps = 1e-6) => {
    const gxph = G(x + eps, y);
    const gxmh = G(x - eps, y);
    const gyph = G(x, y + eps);
    const gymh = G(x, y - eps);
    const fx = (gxph - gxmh) / (2 * eps);
    const fy = (gyph - gymh) / (2 * eps);
    return { fx, fy };
  };

  // calcula D^{(k)} en (x,y) recursivamente
  // D0 = f; Dk = partial_x(D_{k-1}) + partial_y(D_{k-1}) * f
  // Para calcular parciales de D_{k-1} en un punto, evaluamos D_{k-1} en puntos desplazados (recursión).
  const computeTotalDerivative = (fFunc, order, x, y, eps = 1e-6) => {
    // cache para evitar repetidos cómputos en la misma llamada
    const cache = new Map();

    // recursive function to compute D^{(m)} at (x,y)
    const Dm = (m, xx, yy) => {
      const key = `${m}_${xx}_${yy}`;
      if (cache.has(key)) return cache.get(key);

      if (m === 0) {
        const v = evalF(fFunc, xx, yy);
        cache.set(key, v);
        return v;
      }

      // To compute D^{(m)} we need partials of D^{(m-1)}:
      // define function G(u,v) = D^{(m-1)}(u,v)
      const G = (u, v) => Dm(m - 1, u, v);

      // compute partials of G numerically
      const { fx, fy } = partialsCentral(G, xx, yy, eps);

      // f at (xx,yy)
      const fval = Dm(0, xx, yy);
      const val = fx + fy * fval;
      cache.set(key, val);
      return val;
    };

    // returns array [D0, D1, ..., D_{order-1}] at (x,y)
    const out = [];
    for (let m = 0; m < order; m++) {
      out.push(Dm(m, x, y));
    }
    return out;
  };

  const solve = () => {
    try {
      setError('');
      setResult(null);

      // validaciones básicas
      const fExpr = form.f.trim();
      if (!fExpr) throw new Error('Ingrese la función f(x,y).');

      const x0 = parseFloat(form.x0);
      const y0 = parseFloat(form.y0);
      const xf = parseFloat(form.xf);
      const h = parseFloat(form.h);
      const order = Math.max(1, Math.min(6, parseInt(form.order || '1', 10))); // limitar a 6 para seguridad

      if (!isFinite(x0) || !isFinite(y0) || !isFinite(xf) || !isFinite(h)) {
        throw new Error('x0, y0, xf y h deben ser numéricos válidos.');
      }
      if (h <= 0) throw new Error('h debe ser mayor que 0.');
      if ((xf - x0) * h < 0) throw new Error('El signo de h no coincide con el dominio (xf - x0).');
      const steps = Math.round(Math.abs((xf - x0) / h));
      if (steps > 10000) throw new Error('Demasiados pasos; aumenta h o acorta el intervalo.');

      // compilar funciones
      const fFunc = makeFunc(fExpr);
      const exactFunc = form.exact ? makeFunc(form.exact) : null;

      // iteración por pasos usando Taylor
      const points = [];
      let xn = x0;
      let yn = y0;
      points.push({ n: 0, x: xn, y: yn, exact: exactFunc ? evalF(exactFunc, xn, yn) : null });

      for (let i = 0; i < steps; i++) {
        // compute D^{(0..order-1)} at (xn,yn)
        // beware: computeTotalDerivative returns D0..D_{order-1}
        const Ds = computeTotalDerivative(fFunc, order, xn, yn, 1e-6);

        // Taylor update
        let increment = 0;
        for (let m = 1; m <= order; m++) {
          const Dm_minus1 = Ds[m - 1];
          increment += (Math.pow(h, m) / factorial(m)) * Dm_minus1;
        }
        const yn1 = yn + increment;
        const xn1 = xn + h;

        // push and step
        points.push({ n: i + 1, x: xn1, y: yn1, exact: exactFunc ? tryEvalExact(exactFunc, xn1) : null });
        xn = xn1;
        yn = yn1;
      }

      setResult({
        points,
        metadata: {
          fExpr,
          x0, y0, xf, h, order
        }
      });

    } catch (err) {
      setError(err.message || String(err));
    }
  };

  const tryEvalExact = (fn, x) => {
    try {
      const v = fn(x, 0); // exact might be function of x only; we pass y dummy
      return isFinite(v) ? v : null;
    } catch {
      try {
        // si exact fue escrita con 'x' solo, llamar con y undefined podría fallar,
        // intentar con only x
        return fn(x);
      } catch {
        return null;
      }
    }
  };

  const factorial = (n) => {
    let f = 1;
    for (let i = 2; i <= n; i++) f *= i;
    return f;
  };

  // small SVG plot: auto-scale points into a box
  const PlotSVG = ({ pts }) => {
    if (!pts || pts.length === 0) return null;
    const W = 700, H = 260, margin = 36;
    const xs = pts.map(p => p.x);
    const ys = pts.map(p => p.y);
    const xmin = Math.min(...xs), xmax = Math.max(...xs);
    const ymin = Math.min(...ys), ymax = Math.max(...ys);
    const xrange = xmax - xmin || 1;
    const yrange = ymax - ymin || 1;

    const sx = (x) => margin + ((x - xmin) / xrange) * (W - 2 * margin);
    const sy = (y) => H - margin - ((y - ymin) / yrange) * (H - 2 * margin);

    const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(p.x)} ${sy(p.y)}`).join(' ');

    // If exact available, draw it as dashed path (interpolate)
    const exactAvailable = pts.every(p => p.exact !== null && p.exact !== undefined);
    const pathExact = exactAvailable
      ? pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(p.x)} ${sy(p.exact)}`).join(' ')
      : null;

    return (
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="border rounded bg-white">
        {/* axes */}
        <line x1={margin} y1={H - margin} x2={W - margin} y2={H - margin} stroke="#e5e7eb" />
        <line x1={margin} y1={margin} x2={margin} y2={H - margin} stroke="#e5e7eb" />
        {/* approximate path */}
        <path d={path} fill="none" stroke="#0ea5e9" strokeWidth="2" />
        {/* exact path */}
        {pathExact && <path d={pathExact} fill="none" stroke="#16a34a" strokeWidth="2" strokeDasharray="6 4" />}
        {/* points */}
        {pts.map((p, i) => (
          <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r={2.6} fill="#0369a1" />
        ))}
        {/* legend */}
        <g transform={`translate(${W - margin - 150}, ${margin})`}>
          <rect x="0" y="-6" width="150" height="52" fill="white" stroke="#e6e6e6" rx="6" />
          <circle cx="12" cy="8" r="6" fill="#0ea5e9" /> <text x="26" y="12" fontSize="12">Aproximación (Taylor)</text>
          {pathExact && (
            <>
              <circle cx="12" cy="28" r="6" fill="#16a34a" /> <text x="26" y="32" fontSize="12">Solución exacta</text>
            </>
          )}
        </g>
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-t-4 border-blue-600">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Calculator className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Taylor — Problemas de Valor Inicial</h1>
              <p className="text-gray-600 mt-1">Método de Taylor (EDO 1º orden) — Interactivo</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6 p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('theory')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold ${activeTab === 'theory' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <BookOpen className="inline mr-2" size={18} /> Teoría
            </button>
            <button
              onClick={() => setActiveTab('solver')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold ${activeTab === 'solver' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Calculator className="inline mr-2" size={18} /> Calculadora
            </button>
          </div>
        </div>

        {activeTab === 'theory' && (
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-4">
            <h2 className="text-2xl font-bold">Método de Taylor para EDOs — Resumen</h2>
            <div className="bg-yellow-50 p-4 rounded">
              <p className="text-gray-700">
                Resumen rápido (LaTeX):
              </p>
              <pre className="bg-white p-3 rounded text-sm font-mono text-gray-800 whitespace-pre-wrap">
{`Expansión: y(x+h)=y(x)+h y'(x)+h^2/2 y''(x)+... 
Con y'=f(x,y), y''=f_x + f_y f, ...`}
              </pre>
              <p className="text-gray-700">
                - Ventaja: orden alto por paso si se calculan derivadas.  
                - Desventaja: cálculo de derivadas costoso y susceptible a errores numéricos si se abusa del orden.
              </p>
            </div>

            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold">Comparación breve</h3>
              <ul className="list-disc pl-5 text-gray-700">
                <li><b>Euler:</b> simple, 1 evaluación de f; baja precisión.</li>
                <li><b>Taylor:</b> mayor precisión por paso si se usan derivadas; coste adicional.</li>
                <li><b>RK4:</b> buen compromiso: 4 evaluaciones de f, robusto, frecuente en práctica.</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded">
              <h3 className="font-semibold">Uso práctico</h3>
              <p className="text-gray-700">El componente de la pestaña "Calculadora" permite probar distintos órdenes y comparar con solución exacta si la proporcionas.</p>
            </div>
          </div>
        )}

        {activeTab === 'solver' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Datos de la EDO (y' = f(x,y))</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">f(x,y)</label>
                  <input name="f" value={form.f} onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-mono" />
                  <p className="text-xs text-gray-500 mt-1">Ej: x + y  — usa funciones Math: sin(x), exp(x), x**2, etc.</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Solución exacta (opcional)</label>
                  <input name="exact" value={form.exact} onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-mono" />
                  <p className="text-xs text-gray-500 mt-1">Si la tienes, pon y(x) en términos de x (opcional) — se mostrará en el gráfico.</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">x₀</label>
                  <input name="x0" value={form.x0} onChange={handleChange} className="w-full px-4 py-2 border-2 rounded" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">y(x₀)</label>
                  <input name="y0" value={form.y0} onChange={handleChange} className="w-full px-4 py-2 border-2 rounded" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">x_f</label>
                  <input name="xf" value={form.xf} onChange={handleChange} className="w-full px-4 py-2 border-2 rounded" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Paso h</label>
                  <input name="h" value={form.h} onChange={handleChange} className="w-full px-4 py-2 border-2 rounded" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Orden (Taylor)</label>
                  <select name="order" value={form.order} onChange={handleChange} className="w-full px-4 py-2 border-2 rounded">
                    <option value="1">1 (Euler equivalente)</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <button onClick={solve} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
                  Calcular (Taylor)
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border-l-4 border-red-600 p-4 rounded flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-bold text-red-800 mb-1">Error</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            {result && (
              <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="text-green-600" size={22} />
                  <h3 className="text-lg font-bold">Resultados</h3>
                </div>

                <div>
                  <PlotSVG pts={result.points} />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 font-semibold">n</th>
                        <th className="px-4 py-2 font-semibold">xₙ</th>
                        <th className="px-4 py-2 font-semibold">yₙ (Taylor)</th>
                        <th className="px-4 py-2 font-semibold">y_exact (si disponible)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.points.map((p, i) => (
                        <tr key={i} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-2 font-mono">{p.n}</td>
                          <td className="px-4 py-2 font-mono">{p.x.toFixed(6)}</td>
                          <td className="px-4 py-2 font-mono">{(p.y).toFixed(8)}</td>
                          <td className="px-4 py-2 font-mono">{p.exact !== null ? Number(p.exact).toFixed(8) : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-sm text-gray-600">
                  <p><b>Nota:</b> Las derivadas sucesivas se aproximan por diferencias finitas centradas. Aumentar el orden incrementa la precisión local pero también el coste y la sensibilidad numérica.</p>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default InitialValueTaylorSolver;