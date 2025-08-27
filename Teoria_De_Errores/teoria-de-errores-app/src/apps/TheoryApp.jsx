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
                style={{ position: "absolute", top: "20px", left: "20px" }}
            >
                ⬅ Volver al Home
            </button>
            <h1 className="text-3xl font-bold mb-6 text-center">Teoría: Redondeo y Errores</h1>

            {/* 1. Redondeo */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Redondeo al valor más próximo con “m” cifras</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        Para redondear se analiza la cifra <strong>“m+1”</strong>:
                        <ul className="list-[circle] pl-6 mt-2 space-y-1">
                            <li><strong>Si a<sub>m+1</sub> &lt; 5 →</strong> se redondea por defecto:</li>
                            <li className="bg-gray-100 p-2 rounded-md text-sm">
                                ā = 0, a₁ a₂ … aₘ × 10ᵏ
                            </li>
                            <li><strong>Si a<sub>m+1</sub> ≥ 5 →</strong> se redondea por exceso:</li>
                            <li className="bg-gray-100 p-2 rounded-md text-sm">
                                ā = 0, a₁ a₂ … (aₘ + 1) × 10ᵏ
                            </li>
                        </ul>
                    </li>
                </ul>
            </section>

            {/* 2. Ejemplo de Redondeo */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Ejemplo de Redondeo</h2>
                <p className="mt-4">
                    <strong>Ejemplo:</strong>
                    Si α = 124,641 y se pide redondear con m = 4:
                </p>
                <div className="bg-yellow-100 p-3 rounded-md mt-2">
                    ā = 0,1246 × 10³ → se redondea por defecto porque el dígito m+1 es 4 (&lt; 5).
                    <br />
                    Si ese dígito hubiese sido mayor o igual que 5, entonces:
                    ā = 0,1247 × 10³
                </div>
            </section>

            {/* 3. Error Absoluto Explicado (con la imagen) */}
            <section className="mb-8 text-center">
                <h2 className="text-2xl font-semibold mb-4">3. Error Absoluto Explicado</h2>
                {/* Aquí insertamos la imagen */}
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