// src/App.jsx

import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./apps/HomeApp";
import Practica from "./apps/PracticeApp";
import TheoryApp from "./apps/TheoryApp";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teoria" element={<TheoryApp />} /> 
        <Route path="/practica" element={<Practica />} />
      </Routes>
    </HashRouter>
  );
}

export default App;