import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store/store.ts"; 
import api from "../axios/axiosInstance.ts";
import { loginSuccess } from "../redux/features/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { InputField, PasswordField } from "../components/InputFields";

interface LoginCred {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [cred, setCred] = useState<LoginCred>({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", cred);

      if (res.data.success) {
        dispatch(loginSuccess(res.data.user));
        toast.success("Login Successful!");
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE6]">
      {/* Header */}
      <header className="bg-[#1570c3] h-20 flex items-center justify-center shadow-md">
        <p className="text-white text-2xl md:text-3xl font-[Bebas_Neue]">
          Order Online With Auburn Domino's Pizza!
        </p>
      </header>

      {/* Login Form */}
      <div className="flex flex-1 justify-center items-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-[#1570c3] rounded-lg shadow-lg p-6 w-full max-w-sm"
        >
          <h2 className="text-center text-2xl font-semibold mb-5 text-gray-800">
            Login
          </h2>

          <InputField
            label="Email"
            icon={<FaEnvelope />}
            name="email"
            type="email"
            value={cred.email}
            onChange={handleChange}
            placeholder="Enter Email"
          />

          <PasswordField
            label="Password"
            name="password"
            value={cred.password}
            onChange={handleChange}
            show={showPassword}
            setShow={setShowPassword}
          />

          <button
            type="submit"
            className="w-full bg-[#e31837] text-white py-2 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Login
          </button>

          <p className="text-sm text-center mt-3">
            New user?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-[#1570c3] hover:underline cursor-pointer"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
