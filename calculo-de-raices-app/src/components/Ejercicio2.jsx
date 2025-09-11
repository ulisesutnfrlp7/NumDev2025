// src/components/Ejercicio2.jsx
import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import { Resolucion2 } from './Resolucion2';

const Ejercicio2 = () => {
  return (
    <section className="mb-8 bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600 border-b pb-2">
        🧮 Ejercicio 2: Equilibrio de Mercado
      </h2>

      <div className="mb-6">
        <p>
            En un mercado, la curva de oferta y la curva de demanda de un producto están 
            dadas implícitamente por las siguientes ecuaciones:
        </p>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">CURVA DE DEMANDA</h3>
        <p className="mb-2">
            p = 18 + 0,7q
        </p>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">CURVA DE OFERTA</h3>
        <p className="mb-2">
            p = <InlineMath math="\frac{q^2}{22}" /> + 4
        </p>
        <p className="mb-4">
            donde "p" es el precio del producto y "q" es la cantidad. Encuentre Newton con un error máximo de 0.01, la cantidad "q" que hace que la oferta y la demanda estén en equilibrio sabiendo que podrían ser entre 20 y 30 unidades.
        </p>
        <Resolucion2 />
      </div>
    </section>
  );
};

export default Ejercicio2;