// src/apps/PracticeApp.jsx

import RoundOff from '../components/RoundOff';
import ErrorAbsolute from '../components/ErrorAbsolute';
import { useNavigate } from 'react-router-dom';

function PracticeApp() {
    const navigate = useNavigate();
    return (
        
        <div className="app">
            <button
            onClick={() => navigate("/")}
            className="mt-8 px-6 py-3 bg-green-600 text-white rounded-xl text-lg font-semibold hover:bg-green-700 transition"
            style={{ position: "absolute", top: "20px", left: "20px" }}
            >
                ⬅ VOLVER AL HOME
            </button>
            <h1>UNIDAD 5 - TEORÍA DE ERRORES</h1>
            <RoundOff />
            <ErrorAbsolute />
        </div>
    );
};
export default PracticeApp;