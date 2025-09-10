// src/components/Ejercicio1.jsx

import { Resolucion1 } from "./Resolucion1";

const Ejercicio1 = () => {
  return (
    <section className="mb-8 bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600 border-b pb-2">
        🧮 Ejercicio 1: Método de Newton
      </h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Encuentra la raíz de la función:</h3>
        <p className="mb-2 font-semibold">
            f(x) = 2e<sup>x</sup> - 2x<sup>2</sup>
        </p>
        <p className="mb-2">
            X<sub>0</sub> = 3
        </p>
        <p className="mb-4">
            ¿Cuántas iteraciones fueron necesarias para hallar la raíz exacta usando este método?
        </p>
        <Resolucion1 />
      </div>
    </section>
  );
};

export default Ejercicio1;