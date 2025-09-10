import { useNavigate } from 'react-router-dom';
import Teorema1 from '../components/Teorema1';
import Teorema2 from '../components/Teorema2';
import VentajasDesventajas from '../components/VentajasYDesventajas';
import Teorema3 from '../components/Teorema3';
import CriterioDeParo from '../components/CriterioDeParo';


function TheoryApp() {
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
          Definición del Método, Teoremas, Ventajas, Desventajas y Criterios de Paro
        </h1>
        <Teorema1 />
        <Teorema2 />
        <Teorema3 />
        <CriterioDeParo />
        <VentajasDesventajas />
      </div>
    </div>
  );
}

export default TheoryApp;
