// src/components/NewtonMethod
import ejemplo from '../img/ejemplo.png'

const NewtonMethod = () => {
  return (
    <section className="mb-8 bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600 border-b pb-2">
        📘 Método Newton-Raphson
      </h2>

      {/* Objetivo del método */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">🎯 Objetivo</h3>
        <p className="mb-2">
          El objetivo de este método es estimar la solución de una ecuación{" "}
          <strong>f(x) = 0</strong> produciendo una sucesión de aproximaciones que se acerquen a la solución (iteraciones).
        </p>
        <p className="mb-2">
          Escogemos un primer número inicial <strong>x₀</strong> y, en circunstancias favorables, 
          el método se encarga de ir acercándose paso a paso hacia la raíz.
        </p>
      </div>

      {/* Procedimiento */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">⚙️ Procedimiento</h3>
        <ol className="list-decimal list-inside mb-4 text-gray-700">
          <li className="mb-2">
            Adivinar una primera aproximación <strong>x₀</strong> a la solución de la ecuación <strong>f(x) = 0</strong>. 
            Una gráfica de <strong>y = f(x)</strong> puede ayudar.
          </li>
          <li className="mb-2">
            Usar la primera aproximación para obtener la segunda, la segunda para obtener la tercera, 
            y así sucesivamente, aplicando la fórmula de iteración.
          </li>
        </ol>

        <p className="mb-4">
          La fórmula general es:
        </p>
        <p className="bg-gray-100 p-3 rounded-lg font-mono text-center text-lg">
          xₙ₊₁ = xₙ - f(xₙ) / f′(xₙ), &nbsp; si f′(xₙ) ≠ 0
        </p>
      </div>
      <div className='flex justify-center items-center'>
        <img src={ejemplo} alt="Ejemplo" className='border border-gray-200'/>
      </div>
    </section>
  );
};

export default NewtonMethod;
