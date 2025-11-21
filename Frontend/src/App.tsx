import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterAdmin from "./pages/Register";
import Login from "./pages/Login";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterAdmin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
