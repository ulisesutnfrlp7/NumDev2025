// src/apps/PracticeApp.jsx



import { useNavigate } from 'react-router-dom';
import NewtonMethodCalculator from '../components/NewtonMethodCalculator';
import Ejercicio1 from '../components/Ejercicio1';
import Ejercicio2 from '../components/Ejercicio2';

function PracticeApp() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-200 to-indigo-400 p-6 relative text-gray-800">
            <button
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 hover:scale-105 transition-transform shadow-md"
            >
                ⬅ Volver al Home
            </button>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">
                Unidad 6: Método de Newton para el Cálculo de Raíces
                </h1>
                <Ejercicio1 />
                <Ejercicio2 />
                <NewtonMethodCalculator />
            </div>
        </div>
    );
};
export default PracticeApp;