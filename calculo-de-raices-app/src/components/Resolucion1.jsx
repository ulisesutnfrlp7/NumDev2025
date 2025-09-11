// src/components/Resolucion1.jsx

import React, { useState } from 'react'
import pasouno from '../img/pasouno.png'
import pasodos from '../img/pasodos.png'
import pasotres_a from '../img/pasotres_a.png'
import pasotres_b from '../img/pasotres_b.png'
import pasocuatro from '../img/pasocuatro.png'

export const Resolucion1 = () => {
  const [mostrar, setMostrar] = useState(false)

  const imagenes = [ pasouno, pasodos, pasotres_a, pasotres_b, pasocuatro ]

  return (
    <div className="mt-4">
      <button
        onClick={() => setMostrar(!mostrar)}
        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 hover:scale-105 transition-transform shadow-md disabled:opacity-50"
      >
        Resolución
      </button>

      {mostrar && (
        <div className="mt-6 space-y-6">
          {imagenes.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Paso ${index + 1}`}
              className="w-full rounded-xl shadow-md border border-gray-200"
            />
          ))}
        </div>
      )}
    </div>
  )
}