// src//apps/HomeApp.jsx

import { useNavigate } from "react-router-dom";

export default function HomeApp() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 p-6">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-12 text-center">
        Redondeo por Aproximación y Error Absoluto
      </h1>

      <div style={{ justifyContent: "space-around", display: "flex", width: "100%" }}>
        <button
          onClick={() => navigate("/teoria")}
          className="text-2xl font-semibold rounded-2xl bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform"
          style={{ height: "400px", width: "400px" }}
        >
          📘 TEORÍA
        </button>

        <button
          onClick={() => navigate("/practica")}
          className="text-2xl font-semibold rounded-2xl bg-green-600 text-white shadow-lg hover:bg-green-700 hover:scale-105 transition-transform"
          style={{ height: "400px", width: "400px" }}
        >
          🧮 PRÁCTICA
        </button>
      </div>
    </div>
  );
}