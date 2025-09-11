const Teorema3 = () => {
	return (
		<section className="mb-8 bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
			<h2 className="text-2xl font-semibold mb-4 text-blue-600 border-b pb-2">
				📘 Teorema 3: Método de Newton - Convergencia Local
			</h2>

			<div className="mb-6">
				<h3 className="text-xl font-semibold text-gray-800 mb-2">Hipótesis</h3>
				<ul className="list-disc list-inside space-y-2 pl-4 text-gray-700">
					<li>
						<span className="font-semibold">Condición de la función:</span> La función es
						<span className="font-mono"> f(x) &isin; C&sup2; [a, b]</span>, lo que significa que
						es continua, y sus derivadas primera y segunda también lo son en el intervalo [a, b].
					</li>
					<li>
						<span className="font-semibold">Condición de la raíz:</span> El punto
						<span className="font-mono"> p &isin; [a, b]</span> es una raíz de la función, por lo tanto,
						<span className="font-mono"> f(p) = 0</span>.
					</li>
					<li>
						<span className="font-semibold">Condición de la derivada:</span> La primera derivada de la función en el punto p es diferente de cero, es decir,
						<span className="font-mono"> f&apos;(p) &ne; 0</span>.
					</li>
				</ul>
			</div>

			<div className="mb-6">
				<h3 className="text-xl font-semibold text-gray-800 mb-2">Conclusión</h3>
				<p className="mb-2">
					Existe un entorno local alrededor de la raíz, definido por
					<span className="font-mono"> &delta; &gt; 0</span>, tal que si elegimos un punto inicial
					<span className="font-mono"> P<sub>0</sub> &isin; [p-&delta;, p+&delta;]</span>,
					entonces la sucesión generada por el método de Newton converge a p:
				</p>
				<p className="text-center font-mono mt-2 mb-2">
					P<sub>n+1</sub> = g(P<sub>n</sub>) = P<sub>n</sub> - f(P<sub>n</sub>) / f&apos;(P<sub>n</sub>)
				</p>
			</div>
		</section>
	);
};

export default Teorema3;
