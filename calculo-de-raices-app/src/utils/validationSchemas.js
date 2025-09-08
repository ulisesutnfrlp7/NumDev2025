// src/utils/validationSchemas.js

import * as Yup from 'yup';

export const roundOffSchema = Yup.object({
    number: Yup.string().required('Requerido'),
    decimals: Yup.string().required('Requerido').min(0, 'Debe ser un número positivo'),
});

export const errorAbsoluteSchema = Yup.object({
    measured: Yup.string().required('Requerido'),
    actual: Yup.string().required('Requerido'),
});