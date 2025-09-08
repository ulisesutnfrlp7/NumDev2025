import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorAbsolutoExplicado from '../assets/ErrorAbsolutoExplicado.png';

function TheoryApp() {
    const navigate = useNavigate();
    return (
        <div className="p-6 max-w-4xl mx-auto text-gray-800">
            <button
                onClick={() => navigate("/")}
                className="mt-8 px-6 py-3 bg-green-600 text-white rounded-xl text-lg font-semibold hover:bg-green-700 transition"
                style={{ position: "absolute", top: "100px", left: "40px" }}
            >
                ⬅ Volver al Home
            </button>
            <h1 className="text-3xl font-bold mb-6 text-center">Definición del Método, Ventajas, Desventajas, Criterios de Paro y Teoremas</h1>
            {/*Redondeo */}
            <section className="mb-8 bg-white max-w-3xl mx-auto p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600 border-b pb-2">
                1.  REDONDEO AL VALOR MÁS PRÓXIMO CON “m” CIFRAS SIGNIFICATIVAS
            </h2>
            <p className="mb-6">
                Cuando queremos redondear un número con <strong>m cifras significativas</strong>, 
                debemos observar la cifra siguiente (<strong>m+1</strong>).
            </p>
            {/* Caso 1 */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 mb-6">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">Caso 1 — Por defecto</h3>
                <p className="mb-3">
                Si <strong>a<sub>m+1</sub> &lt; 5</strong>, entonces el número se queda igual hasta la posición <em>m</em>.
                </p>
            </div>
            {/* Caso 2 */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 mb-6">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">Caso 2 — Por exceso</h3>
                <p className="mb-3">
                Si <strong>a<sub>m+1</sub> ≥ 5</strong>, entonces al último dígito de las <em>m</em> cifras se le suma 1.
                </p>
            </div>
            <p className="italic text-gray-600">
                Este método se llama <strong>redondeo simétrico</strong>, porque trata de no sesgar 
                el valor hacia arriba o hacia abajo, sino mantenerlo “cercano” al número real.
            </p>
            </section>
            {/*Ejemplo de redondeo */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. EJEMPLO DE REDONDEO </h2>
                <p className="mt-4">
                    <strong>Ejemplo: </strong>
                    Si α = 124,641 y se pide redondear con m = 4:
                </p>
                <div className="bg-yellow-100 p-3 rounded-md mt-2">
                    ā = 0,1246 × 10³ → se redondea por defecto porque el dígito m+1 es 4 (&lt; 5).
                    <br />
                    Si ese dígito hubiese sido mayor o igual que 5, entonces:
                    ā = 0,1247 × 10³
                </div>
            </section>
            {/* 3. Error absoluto explicacion */}
            <section className="mb-8 text-center">
                <h2 className="text-2xl font-semibold mb-4">3. ERROR ABSOLUTO EXPLICADO</h2>
                <img
                    src={ErrorAbsolutoExplicado}
                    alt="Diagrama explicando el Error Absoluto"
                    className="max-w-full h-auto mx-auto border rounded-lg shadow-md"
                />
            </section>
        </div>
    );
}

export default TheoryApp;