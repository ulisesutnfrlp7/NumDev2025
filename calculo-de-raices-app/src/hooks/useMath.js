// src/hooks/useMath.js

export const roundOff = (number, decimals) => {
    const factor = Math.pow(10, decimals);
    return Math.round(number * factor) / factor;
};

export const calculateErrorAbsolute = (measured, actual) => {
    return measured - actual;
}