import Login from "./Components/Login";
import Register from "./Components/Register";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import SavedCharacters from "./Components/SavedCharacters";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/savedcharacters" element={<SavedCharacters />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
