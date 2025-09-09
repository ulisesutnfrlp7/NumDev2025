const VentajasDesventajas = () => {
    return (
      <section className="mb-8 bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 border-b pb-2">
          📘 Método de Newton: Ventajas y Desventajas
        </h2>
  
        {/* Ventajas */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-green-700 mb-2">VENTAJAS</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Si el valor inicial está cerca de la raíz y la derivada de la función es no nula, el método converge directamente a la raíz.
            </li>
            <li>
              El número de cifras significativas se duplica en cada iteración, o sea que converge cuadráticamente.
            </li>
          </ul>
        </div>
  
        {/* Desventajas */}
        <div>
          <h3 className="text-xl font-semibold text-red-700 mb-2">DESVENTAJAS</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              A diferencia del método de bisección, como solo tenemos un valor inicial en vez de un intervalo, no se puede aplicar el teorema de Bolzano para garantizar que exista una raíz.
            </li>
            <li>
              Si f′(x) = 0, el método no se puede aplicar.
            </li>
            <li>
              Existen casos en los que el método de Newton puede caer en procesos iterativos infinitos.
            </li>
          </ul>
        </div>
      </section>
    );
  };

export default VentajasDesventajas;