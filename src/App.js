import Login from "./Components/Login";
import Register from "./Components/Register";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
