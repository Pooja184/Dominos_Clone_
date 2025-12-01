import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterAdmin from "./pages/Register";
import Login from "./pages/Login";
import VerifyOTP from "./pages/VerifyOTP";
import Home from "./pages/Home"
import HomeSeller from "./pages/seller/HomeSeller";
import AddProduct from "./pages/seller/AddProduct";
import MyProducts from "./pages/seller/MyProducts";
const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<RegisterAdmin />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/login" element={<Login />} />

        {/* seller routes */}
        <Route path="/seller-dashboard" element={<HomeSeller/>}>
          <Route path="add-product" element={<AddProduct/>}/>
          <Route path="my-products" element={<MyProducts/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;
