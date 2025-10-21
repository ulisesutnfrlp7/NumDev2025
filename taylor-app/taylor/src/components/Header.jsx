// src/components/Header.jsx

import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-900 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide font-mono">
          N U M D E V — ANÁLISIS NUMÉRICO: RESOLUCIÓN DE PROBLEMAS DE VALOR INICIAL (U9)
        </h1>
        <span className="text-sm italic text-blue-200">
          Método de Taylor y más...
        </span>
      </div>
    </header>
  );
};

export default Header;