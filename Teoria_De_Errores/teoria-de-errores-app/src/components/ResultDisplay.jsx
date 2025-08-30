// src/components/ResultDisplay.jsx

import React from 'react';

const ResultDisplay = ({ result, label }) => {
    return (
        <div className="result-display">
            <h3>{label}</h3>
            <p>RESULTADO: {result}</p>
        </div>
    );
};

export default ResultDisplay;