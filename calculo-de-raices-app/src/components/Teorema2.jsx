// src/components/Teorema2.jsx

const Teorema2 = () => {
  return (
    <section className="mb-8 bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600 border-b pb-2">
        📘 Teorema 2: Teorema del Punto Fijo
      </h2>

      <div className="mb-6">
        <p className="mb-2">
          <span className="font-semibold">Hipótesis:</span>
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>
            g(x) continua en [a,b].
          </li>
          <li>
            g(x) &epsilon; [a,b] para todo x &epsilon; [a,b].
          </li>
          <li>
            g'(x) existe para todo x &epsilon; (a,b) y siendo 0 &lt; k &lt; 1, y cumpliéndose que |g'(x)| &lt;= k para todo x &epsilon; (a,b).
          </li>
        </ul>
        <p className="mb-4">
          <span className="font-semibold">Conclusión:</span> Para cualquier punto <strong>P<sub>0</sub></strong> &epsilon; [a,b], la sucesión definida por la técnica punto fijo P<sub>n</sub> = g(P<sub>n</sub> - 1); n &gt;= 1 converge al único punto fijo p en [a,b].
        </p>
        <p className="italic text-gray-600">
          (Esto se demuestra rigurosamente con el uso del Teorema 1 y el Teorema del Valor Medio aplicado a la sucesión definida por P<sub>n</sub> = g(P<sub>n</sub> - 1), como muestra el apunte).
        </p>
      </div>
    </section>
  );
};

export default Teorema2;