// src/components/ErrorAbsolute.js

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { calculateErrorAbsolute } from '../hooks/useMath';
import { errorAbsoluteSchema } from '../utils/validationSchemas';
import ResultDisplay from './ResultDisplay';
import '../styles/styles.css'

const ErrorAbsolute = () => {
    const [result, setResult] = useState(null);
    const initialValues = { measured: '', actual: '' };

    const parseNumber = (value) => {
        if (typeof value === "string" && value.includes("/")) {
            const [num, den] = value.split("/").map(Number);
            if (!isNaN(num) && !isNaN(den) && den !== 0) {
                return num / den;
            }
        }
        return parseFloat(value);
        };

    const handleSubmit = (values) => {
        const measured = parseNumber(values.measured);
        const actual = parseNumber(values.actual);

        const result = calculateErrorAbsolute(measured, actual);
        setResult(result);
    };
    

    return (
        <section>
            <h2>Error Absoluto</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={errorAbsoluteSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label htmlFor="measured"><strong>VALOR MEDIDO:</strong></label>
                        <Field name="measured" type="text" />
                        <ErrorMessage name="measured" component="div" />
                    </div>
                    <div>
                        <label htmlFor="actual"><strong>VALOR REAL:</strong></label>
                        <Field name="actual" type="text" />
                        <ErrorMessage name="actual" component="div" />
                    </div>
                    <button type='submit'>CALCULAR</button>
                </Form>
            </Formik>
            {result !== null && <ResultDisplay result={result} label="ERROR ABSOLUTO" />}
        </section>
    );
};

export default ErrorAbsolute;