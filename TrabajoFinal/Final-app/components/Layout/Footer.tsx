import React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Columna 1: Marca y Misión */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-cyan-400" />
              <h4 className="text-lg font-bold text-slate-100">MobileMetrics</h4>
            </div>
            <p className="text-sm text-slate-400">
              Proyecciones de crecimiento impulsadas por ciencia de datos para la toma de decisiones estratégicas.
            </p>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div>
            <h4 className="text-md font-semibold mb-3 text-slate-100">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/simulador" className="text-slate-400 hover:text-cyan-400 transition duration-150">Simulador</Link></li>
              <li><Link href="/acerca" className="text-slate-400 hover:text-cyan-400 transition duration-150">Acerca de Nosotros</Link></li>
              <li><Link href="/contacto" className="text-slate-400 hover:text-cyan-400 transition duration-150">Contacto</Link></li>
            </ul>
          </div>

          {/* Columna 3: Modelo y Ciencia */}
          <div>
            <h4 className="text-md font-semibold mb-3 text-slate-100">Ciencia</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/validacion" className="text-slate-400 hover:text-cyan-400 transition duration-150">Validación del Modelo LS</Link></li>
            </ul>
          </div>

          {/* Columna 4: Legal y Contacto Ficticio */}
          <div>
            <h4 className="text-md font-semibold mb-3 text-slate-100">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition duration-150">Términos de Servicio</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition duration-150">Política de Privacidad</a></li>
              <li><p className="text-slate-400 mt-4">contacto@mobilemetrics.com</p></li>
            </ul>
          </div>

        </div>
        
        {/* Derechos de Autor */}
        <div className="mt-12 pt-6 border-t border-slate-700 text-center">
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} MobileMetrics Analytics. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;