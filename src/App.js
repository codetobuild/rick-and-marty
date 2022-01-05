import Login from "./Components/Login";
import Register from "./Components/Register";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

function Home() {
  return <h1>HOME PAGE UNDER DEVELOPMENT</h1>;
}

export default App;
