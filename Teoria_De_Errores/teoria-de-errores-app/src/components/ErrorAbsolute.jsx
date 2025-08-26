// src/components/ErrorAbsolute.js

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { calculateErrorAbsolute } from '../hooks/useMath';
import { errorAbsoluteSchema } from '../utils/validationSchemas';
import ResultDisplay from './ResultDisplay';

const ErrorAbsolute = () => {
    const [result, setResult] = useState(null);
    const initialValues = { measured: '', actual: '' };

    const handleSubmit = (values) => {
        const result = calculateErrorAbsolute(parseFloat(values.measured), parseFloat(values.actual));
        setResult(result);
    };

    return (
        <div>
            <h2>Error Absoluto</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={errorAbsoluteSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label htmlFor="measured">Valor Medido:</label>
                        <Field name="measured" type="text" />
                        <ErrorMessage name="measured" component="div" />
                    </div>
                    <div>
                        <label htmlFor="actual">Valor Real:</label>
                        <Field name="actual" type="text" />
                        <ErrorMessage name="actual" component="div" />
                    </div>
                    <button type="submit">Calcular</button>
                </Form>
            </Formik>
            {result !== null && <ResultDisplay result={result} label="Error Absoluto" />}
        </div>
    );
};

export default ErrorAbsolute;