const CriterioDeParo = () => {
	return (
		<section className="mb-8 bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
			<h2 className="text-2xl font-semibold mb-4 text-blue-600 border-b pb-2">
				📘 Criterios de Paro
			</h2>

			{/* Parte a) */}
			<div className="mb-6">
				<h3 className="text-xl font-semibold text-gray-800 mb-2">a) Por el número de pasos o iteraciones</h3>
				<p className="mb-2 text-gray-700">
					Este caso es aplicable con fines prácticos, como en el método de Bisección, para comprender
					el funcionamiento del método, pero no es aplicable en la realidad cuando se trabaja en serio.
				</p>
			</div>

			{/* Parte b) */}
			<div className="mb-6">
				<h3 className="text-xl font-semibold text-gray-800 mb-2">b) Por el error</h3>
				<p className="mb-2 text-gray-700">
					De la misma manera que en el método de bisección, establece que una vez que se alcanza
					una cota de error máximo, el método debe parar. Se define como:
				</p>
				<p className="text-center font-mono mt-2 mb-2 text-gray-700">
					|P<sub>n</sub> - P<sub>n-1</sub>| &le; &epsilon;
				</p>
				<p className="text-gray-700">
					donde "&epsilon;" es un valor muy pequeño, como por ejemplo &epsilon; = 10<sup>-3</sup>.
					<br /><br />
					Es decir, paramos de realizar iteraciones cuando la diferencia en valor absoluto del último
					valor hallado para la raíz, menos el valor hallado en el paso anterior, es prácticamente "cero".
				</p>
			</div>
		</section>
        
	);
};

export default CriterioDeParo;
