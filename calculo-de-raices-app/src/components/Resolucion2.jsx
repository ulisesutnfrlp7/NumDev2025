// src/components/Resolucion2.jsx

import React, { useState } from 'react'
import primerpaso from '../img/primerpaso.png'
import pasosdosytres from '../img/pasosdosytres.png'

export const Resolucion2 = () => {
  const [mostrar, setMostrar] = useState(false)

  const imagenes = [ primerpaso, pasosdosytres]

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