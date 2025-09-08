import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { roundOff } from '../hooks/useMath';
import { roundOffSchema } from '../utils/validationSchemas';
import ResultDisplay from './ResultDisplay';
import '../styles/styles.css';

const RoundOff = () => {
    const [result, setResult] = useState(null);
    const initialValues = { number: '', decimals: '' };

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
        const number = parseNumber(values.number);
        const decimals = parseInt(values.decimals);
        const roundedNumber = roundOff(number, decimals);
        const exponent = Math.floor(Math.log10(Math.abs(roundedNumber)));
        const adjustedNumber = roundedNumber / Math.pow(10, exponent + 1);
        const finalResult = `${adjustedNumber.toFixed(decimals)} × 10^${exponent + 1}`;
        setResult(finalResult);
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