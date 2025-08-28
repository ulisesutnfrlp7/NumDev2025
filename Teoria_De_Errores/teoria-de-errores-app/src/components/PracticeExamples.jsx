import React, { useState } from 'react';

const PracticeExamples = () => {
    const [showExamples, setShowExamples] = useState(false);

    return (
        <div 
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: '2rem 0',
                margin: '0', 
                marginBottom: '0' 
            }}
        >
            <button
                style={{
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease-in-out',
                    fontFamily: 'inherit',
                    display: 'block',
                    margin: '0 auto',
                    marginTop: '0',
                    marginBottom: '0'
                }}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#1d4ed8';
                    e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#2563eb';
                    e.target.style.transform = 'translateY(0)';
                }}
                onClick={() => setShowExamples(!showExamples)}
            >
                Ejemplos Prácticos
            </button>
            {showExamples && (
                <div 
                    style={{
                        marginTop: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        gap: '1.5rem',
                        margin: '2rem 0 0 0', 
                        padding: '0'
                    }}
                >
                    <div 
                        style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '0.75rem',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '12rem',
                            width: '100%',
                            maxWidth: '36rem',
                            margin: '0 auto',
                            marginBottom: '0' 
                        }}
                    >
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: '#1d4ed8',
                            marginBottom: '0.5rem',
                            textAlign: 'center',
                            margin: '0 0 0.5rem 0'
                        }}>
                            Ejemplo 1 - Velocidad de la Luz (Foucault)
                        </h3>
                        <p style={{
                            fontSize: '1rem',
                            fontWeight: '500',
                            color: '#374151',
                            textAlign: 'center',
                            lineHeight: '1.6',
                            margin: '0'
                        }}>
                            En 1862, Foucault calculó la velocidad de la luz en{' '}
                            <span style={{
                                fontWeight: '600', 
                                color: '#2563eb'
                            }}>
                                298,000 km/s
                            </span>
                            . Si el valor exacto es{' '}
                            <span style={{
                                fontWeight: '600', 
                                color: '#2563eb'
                            }}>
                                299,776 km/s
                            </span>
                            , calcular el error absoluto cometido.
                        </p>
                    </div>
                    <div 
                        style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '0.75rem',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '11rem',
                            width: '100%',
                            maxWidth: '36rem',
                            margin: '0 auto',
                            marginBottom: '0' 
                        }}
                    >
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: '#1d4ed8',
                            marginBottom: '0.5rem',
                            textAlign: 'center',
                            margin: '0 0 0.5rem 0' 
                        }}>
                            Ejemplo 2 - Error Absoluto de π
                        </h3>
                        <p style={{
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            color: '#374151',
                            textAlign: 'center',
                            lineHeight: '1.5',
                            margin: '0'
                        }}>
                            Tomando π = <span style={{fontWeight: '600', color: '#2563eb'}}>3.14159265</span> como exacto, 
                            calcular los errores absolutos de las aproximaciones:
                            <br />
                            a) <span style={{fontWeight: '600', color: '#2563eb'}}>22/7</span>, 
                            <br />
                            b) <span style={{fontWeight: '600', color: '#2563eb'}}>333/106</span>, 
                            <br />
                            c) <span style={{fontWeight: '600', color: '#2563eb'}}>355/113</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PracticeExamples;