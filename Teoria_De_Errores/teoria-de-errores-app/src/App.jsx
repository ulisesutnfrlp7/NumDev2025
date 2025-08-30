// src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./apps/HomeApp";
import Practica from "./apps/PracticeApp";
import TheoryApp from "./apps/TheoryApp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teoria" element={<TheoryApp />} /> 
        <Route path="/practica" element={<Practica />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;