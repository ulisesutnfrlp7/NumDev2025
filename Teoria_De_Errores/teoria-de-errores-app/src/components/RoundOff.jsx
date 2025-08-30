// src/components/RoundOff.jsx

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { roundOff } from '../hooks/useMath';
import { roundOffSchema } from '../utils/validationSchemas';
import ResultDisplay from './ResultDisplay';
import '../styles/styles.css'

const RoundOff = () => {
    const [result, setResult] = useState(null);
    const initialValues = { number: '', decimals: '' };

    const handleSubmit = (values) => {
        const result = roundOff(parseFloat(values.number), parseInt(values.decimals));
        const cientific = result.toExponential(values.decimals);
        const [base, exponente] = cientific.split("e");
        setResult(`${base} × 10^${parseInt(exponente)}`);
    };

    return (
        <section>
            <h2>Redondeo al Valor Más Próximo</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={roundOffSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label htmlFor="number"><strong>NÚMERO:</strong></label>
                        <Field name="number" type="text" />
                        <ErrorMessage name="number" component="div" />
                    </div>
                    <div>
                        <label htmlFor="decimals"><strong>CIFRAS SIGNIFICATIVAS:</strong></label>
                        <Field name="decimals" type="text" />
                        <ErrorMessage name="decimals" component="div" />
                    </div>
                    <button type='submit'>CALCULAR</button>
                </Form>
            </Formik>
            {result !== null && <ResultDisplay result={result} label="RESULTADO DE REDONDEO" />}
        </section>
    );
};

export default RoundOff;