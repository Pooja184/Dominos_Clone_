import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterAdmin from "./pages/Register";
import Login from "./pages/Login";
import VerifyOTP from "./pages/VerifyOtp";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterAdmin />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
