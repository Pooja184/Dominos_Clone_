import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../axios/axiosInstance.ts";
import { toast } from "react-toastify";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const email = params.get("email"); // get email passed from register
  const role=params.get("role");

  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/verify-otp", { email,otp,role });
      console.log(res.data)
      if (res.data.success) {
        toast.success("Email verified!");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE6]">
      <header className="bg-[#1570c3] h-20 flex items-center justify-center shadow-md">
        <p className="text-white text-2xl md:text-3xl font-[Bebas_Neue]">
          Verify Your Email
        </p>
      </header>

      <div className="flex flex-1 justify-center items-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-[#1570c3] rounded-lg shadow-lg p-6 w-full max-w-sm"
        >
          <h2 className="text-center text-2xl font-semibold mb-5 text-gray-800">
            Enter OTP
          </h2>

          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="w-full p-2 border rounded-md mb-3 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-[#e31837] text-white py-2 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Verify OTP
          </button>

          <p className="text-sm text-center mt-3">
            OTP sent to: <span className="font-medium">{email}</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
