// src/components/ResultDisplay.js

import React from 'react';

const ResultDisplay = ({ result, label }) => {
    return (
        <div className="result-display">
            <h3>{label}</h3>
            <p>Resultado: {result}</p>
        </div>
    );
};

export default ResultDisplay;