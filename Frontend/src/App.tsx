import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterAdmin from "./pages/Register";
import Login from "./pages/Login";
import VerifyOTP from "./pages/VerifyOTP";
import Home from "./pages/Home"
const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<RegisterAdmin />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
