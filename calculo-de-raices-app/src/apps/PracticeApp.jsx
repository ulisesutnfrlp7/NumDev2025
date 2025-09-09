// src/apps/PracticeApp.jsx

import { useNavigate } from 'react-router-dom';

function PracticeApp() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-indigo-400 p-6 flex flex-col items-center justify-center relative text-gray-800">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 hover:scale-105 transition-transform shadow-md"
      >
        ⬅ Volver al Home
      </button>

      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Análisis Numérico — UNIDAD 6: CÁLCULO DE RAÍCES
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl w-full text-center">
        <p className="text-lg text-gray-700">
          Aquí irá el contenido práctico: simuladores, inputs, resultados, etc.
        </p>
      </div>
    </div>
  );
}

export default PracticeApp;