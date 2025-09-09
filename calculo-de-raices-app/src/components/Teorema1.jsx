// src/components/Teorema1.jsx

const Teorema1 = () => {
  return (
    <section className="mb-8 bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600 border-b pb-2">
        📘 Teorema 1: Existencia y Unicidad del Punto Fijo
      </h2>

      {/* Parte a) Existencia */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Parte a) Existencia</h3>
        <p className="mb-2">
          <span className="font-semibold">Hipótesis:</span> g(x) es una función continua en un intervalo cerrado [a, b].
        </p>
        <p className="mb-2">
          g(x) “mapea” el intervalo en sí mismo, es decir, para toda x en [a, b], el resultado g(x) también está en [a, b].
        </p>
        <p className="mb-4">
          <span className="font-semibold">Conclusión:</span> Existe al menos un punto fijo <strong>p</strong> en [a, b] tal que <strong>p = g(p)</strong>.
        </p>
        <p className="italic text-gray-600">
          (Esto se demuestra rigurosamente con el Teorema del Valor Intermedio aplicado a la función h(x) = g(x) - x, como muestra el apunte).
        </p>
      </div>

      {/* Parte b) Unicidad */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Parte b) Unicidad</h3>
        <p className="mb-2">
          <span className="font-semibold">Hipótesis adicionales (además de las de la parte a):</span>
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>La derivada g′(x) existe para toda x en el intervalo abierto (a, b).</li>
          <li>Existe una constante k &lt; 1 tal que |g′(x)| ≤ k para toda x en (a, b).</li>
        </ul>
        <p className="mb-4">
          Es decir, las pendientes de las rectas tangentes a g(x) están siempre acotadas por un valor menor que 1.
        </p>
        <p>
          <span className="font-semibold">Conclusión:</span> El punto fijo <strong>p</strong> en [a, b] es único.
        </p>
        <p className="italic text-gray-600 mt-2">
          (La demostración formal usa el Teorema del Valor Medio, como muestra el apunte).
        </p>
      </div>
    </section>
  );
};

export default Teorema1;