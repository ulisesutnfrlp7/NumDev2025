import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./apps/HomeApp";
//import Teoria from "./Teoria";
import Practica from "./apps/PracticeApp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/teoria" element={<Teoria />} /> */}
        <Route path="/practica" element={<Practica />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
