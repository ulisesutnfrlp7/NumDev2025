// src/components/RoundOff.js

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { roundOff } from '../hooks/useMath';
import { roundOffSchema } from '../utils/validationSchemas';
import ResultDisplay from './ResultDisplay';

const RoundOff = () => {
    const [result, setResult] = useState(null);
    const initialValues = { number: '', decimals: '' };

    const handleSubmit = (values) => {
        const result = roundOff(parseFloat(values.number), parseInt(values.decimals));
        setResult(result);
    };

    return (
        <div>
            <h2>Redondeo al Valor Más Próximo</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={roundOffSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label htmlFor="number">Número:</label>
                        <Field name="number" type="text" />
                        <ErrorMessage name="number" component="div" />
                    </div>
                    <div>
                        <label htmlFor="decimals">Decimales:</label>
                        <Field name="decimals" type="text" />
                        <ErrorMessage name="decimals" component="div" />
                    </div>
                    <button type="submit">Calcular</button>
                </Form>
            </Formik>
            {result !== null && <ResultDisplay result={result} label="Resultado de Redondeo" />}
        </div>
    );
};

export default RoundOff;