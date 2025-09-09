// src/apps/PracticeApp.jsx



import { useNavigate } from 'react-router-dom';
import NewtonMethodCalculator from '../components/NewtonMethodCalculator';

function PracticeApp() {
    const navigate = useNavigate();
    return (
        <div className="app">
            <button
                onClick={() => navigate("/")}
                className="mt-8 px-6 py-3 bg-green-600 text-white rounded-xl text-lg font-semibold hover:bg-green-700 transition"
                style={{ position: "absolute", top: "100px", left: "40px" }}
            >
                ⬅ Volver al Home
            </button>
            <h1 className="mt-20 mb-8 text-3xl font-bold text-green-700 text-center drop-shadow-sm tracking-wide">
                Análisis Numérico - <span className="text-green-800">UNIDAD 6:</span> <span className="text-green-600">CÁLCULO DE RAÍCES</span>
            </h1>
            <NewtonMethodCalculator />
        </div>
    );
};
export default PracticeApp;