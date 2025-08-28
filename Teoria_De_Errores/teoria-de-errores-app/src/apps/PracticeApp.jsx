import RoundOff from '../components/RoundOff';
import ErrorAbsolute from '../components/ErrorAbsolute';
import PracticeExamples from '../components/PracticeExamples';
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
                ⬅ Volver al Home
            </button>
            <h1>Análisis Numérico</h1>
            <PracticeExamples />
            <RoundOff />
            <ErrorAbsolute />
            
        </div>
    );
};
export default PracticeApp;