// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./apps/**/src/**/*.{js,ts,jsx,tsx}", // opcional para subapps
    // "./packages/**/src/**/*.{js,ts,jsx,tsx}", // opcional para librerías
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}