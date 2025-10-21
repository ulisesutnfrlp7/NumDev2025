// src/components/Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-3 mt-auto font-mono">
      <div className="container mx-auto px-4 text-center text-sm">
        <p>
          © {new Date().getFullYear()} NUMDEV — Grupo de Análisis Numérico. Todos los derechos reservados.
        </p>
        <p className="mt-1 text-blue-300">
          Contacto: numdev@utnfrlp.edu.ar
        </p>
      </div>
    </footer>
  );
};

export default Footer;