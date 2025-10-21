// src/App.jsx
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BoundaryValueSolver from './components/BoundaryValueSolver';
import InitialValueTaylorSolver from './components/InitialValueTaylorSolver';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-blue-200">
      <Header />
      <main className="flex-grow">
        <InitialValueTaylorSolver />
        <BoundaryValueSolver />
      </main>
      <Footer />
    </div>
  );
};

export default App;