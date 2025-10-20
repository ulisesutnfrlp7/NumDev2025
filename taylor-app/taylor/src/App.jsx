// src/App.jsx
import React from 'react';
import BoundaryValueSolver from './components/BoundaryValueSolver';
import InitialValueTaylorSolver from './components/InitialValueTaylorSolver';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <InitialValueTaylorSolver />
      <BoundaryValueSolver />
    </div>
  );
};

export default App;