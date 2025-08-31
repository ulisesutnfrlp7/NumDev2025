# 📘 Análisis Numérico – Redondeo y Error Absoluto

Aplicación interactiva para practicar **redondeo por aproximación** y **cálculo de error absoluto** en problemas de análisis numérico. Incluye teoría, ejemplos prácticos y ejercicios resueltos.  

---

## 🚀 TECNOLOGÍAS UTILIZADAS

- ⚛️ **React 18** – Librería principal para la construcción de la UI.
- ⚡ **Vite** – Bundler para desarrollo y compilación.
- 🛣️ **React Router DOM** – Manejo de navegación entre vistas (`Home`, `Teoría`, `Práctica`).
- 📝 **Formik** – Manejo de formularios y valores de entrada.
- ✅ **Yup** – Validaciones de los formularios.
- 🎨 **TailwindCSS + CSS personalizado** – Estilos modernos, diseño responsivo y sombras.

---

## 📂 ESTRUCTURA DEL PROYECTO

```
src/
├── apps/
│   ├── HomeApp.jsx          # Página principal con navegación
│   ├── PracticeApp.jsx      # Sección de práctica con ejercicios
│   └── TheoryApp.jsx        # Sección de teoría
│
├── components/
│   ├── RoundOff.jsx         # Redondeo al valor más próximo
│   ├── ErrorAbsolute.jsx    # Cálculo del error absoluto
│   ├── PracticeExamples.jsx # Ejemplos prácticos históricos
│   └── ResultDisplay.jsx    # Componente para mostrar resultados
│
├── hooks/
│   └── useMath.js           # Funciones matemáticas reutilizables
│
├── utils/
│   └── validationSchemas.js # Validaciones con Yup
│
├── styles/
│   ├── styles.css           # Estilos principales de la app
│   └── App.css              # Estilos globales y tipografía
│
├── App.jsx                  # Definición de rutas principales
├── main.jsx                 # Punto de entrada React
└── index.html               # Template HTML base
```

---

## 🧮 LÓGICA IMPLEMENTADA

### 🔹 REDONDEO (`roundOff`)
Función que redondea un número al número de cifras significativas indicadas:  

```js
export const roundOff = (number, decimals) => {
    const factor = Math.pow(10, decimals);
    return Math.round(number * factor) / factor;
};
```

* También muestra el resultado en **notación científica** usando `toExponential`.

---

### 🔹 ERROR ABSOLUTO (`calculateErrorAbsolute`)

Calcula la diferencia en valor absoluto entre el valor medido y el real:

```js
export const calculateErrorAbsolute = (measured, actual) => {
    return Math.abs(measured - actual);
};
```

---

### 🔹 FORMULARIOS CON FORMIK + YUP

* Inicialización de valores.
* Validación de entradas numéricas.
* Mensajes de error automáticos en campos inválidos.

---

### 🔹 COMPONENTIZACIÓN

* `ResultDisplay` → muestra resultados en formato consistente.
* `PracticeExamples` → despliega ejemplos históricos (π, velocidad de la luz, etc.).

---

## 🎨 ESTILOS

* **TailwindCSS** aplicado en botones y layout de `HomeApp`.
* **CSS modular (`styles.css`)**:

  * Estilos para formularios, inputs y secciones.
  * Hover animado en tarjetas.
  * Tipografía `Poppins` desde Google Fonts.

---