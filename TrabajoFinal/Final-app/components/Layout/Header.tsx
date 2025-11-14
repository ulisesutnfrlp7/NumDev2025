"use client"

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
    const pathname = usePathname();

    const activeLinkClass = "text-cyan-400 font-semibold border-b-2 border-cyan-400";
    const defaultLinkClass = "text-slate-300 hover:text-cyan-400 hover:border-b-2 border-transparent transition duration-150";

  // Función para obtener las clases basado en la ruta (si la ruta es exacta o si es la raíz)
    const getLinkClasses = (href: string) => {
        const isActive = href === pathname || (href === '/' && pathname === '/');
        return isActive ? activeLinkClass : defaultLinkClass;
    };

  return (
    <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo y Marca */}
          <Link href="/" className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-cyan-400" />
              <h1 className="text-xl font-bold text-slate-100">MobileMetrics Analytics</h1>
          </Link>
          
          {/* Navegación Principal */}
          <nav className="flex gap-6">
            <Link href="/" className={getLinkClasses("/")}>
                Home
            </Link>
            <Link href="/simulador" className={getLinkClasses("/simulador")}>
                Simulador
            </Link>
            <Link href="/graficos" className={getLinkClasses("/graficos")}>
                Gráficos
            </Link>
            <Link href="/acerca" className={getLinkClasses("/acerca")}>
                Acerca de Nosotros
            </Link>
            <Link href="/contacto" className={getLinkClasses("/contacto")}>
                Contacto
            </Link>
          </nav>

        </div>
      </div>
    </header>
  );
};

export default Header;