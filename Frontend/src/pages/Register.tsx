import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axiosInstance.ts";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
 
} from "react-icons/fa";
import { InputField, PasswordField } from "../components/InputFields.tsx";

interface UserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  // role: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // role: "user",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await api.post("/auth/register", userData);

    if (res.data.success) {
      toast.success("OTP sent to your email!");
      navigate(`/verify-otp?email=${userData.email}`);

    } else {
      toast.error(res.data.message);
    }
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Server error");
  }
};


  return (
    <div className="min-h-screen flex flex-col font-['Roboto',sans-serif] bg-[#F5EFE6]">
      {/* Header */}
      <header className="bg-[#1570c3] h-20 flex items-center justify-center shadow-md">
        <p className="text-white text-2xl md:text-3xl font-[Bebas_Neue]">
          Order Online With Auburn Domino's Pizza!
        </p>
      </header>

      {/* Form Section */}
      <div className="flex flex-1 justify-center items-center px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-[#1570c3] rounded-lg shadow-lg p-6 w-full max-w-sm"
        >
          <h2 className="text-center text-2xl font-semibold mb-5 text-gray-800">
            Register
          </h2>

          {/* Role
          <div className="mb-3">
           
          </div> */}

          {/* Name */}
          <InputField
            label="Name"
            icon={<FaUser />}
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Your Name"
          />

          {/* Email */}
          <InputField
            label="Email"
            icon={<FaEnvelope />}
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Your Email"
          />

          {/* Password */}
          <PasswordField
            label="Password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            show={showPassword}
            setShow={setShowPassword}
          />

          {/* Confirm Password */}
          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            show={showConfirm}
            setShow={setShowConfirm}
          />

          <button
            type="submit"
            className="w-full bg-[#e31837] text-white py-2 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Register
          </button>

          <p className="text-sm text-center mt-3">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#1570c3] hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
