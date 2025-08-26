// src/App.jsx

import React from 'react';
import RoundOff from './components/RoundOff';
import ErrorAbsolute from './components/ErrorAbsolute';

function App() {
    return (
        <div className="app">
            <h1>Análisis Numérico</h1>
            <RoundOff />
            <ErrorAbsolute />
        </div>
    );
};

export default App;