import React from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

// ------------------------------
// 🔹 TYPES
// ------------------------------

// For normal input fields
export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

// For password input fields
export interface PasswordFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

// ------------------------------
// 🔹 INPUT FIELD (text, email, etc)
// ------------------------------
export const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  ...props
}) => (
  <div className="mb-3">
    <label className="text-sm font-medium text-gray-700 mb-1 block">
      {label}
    </label>

    <div className="flex items-center border rounded-md px-2">
      <span className="text-gray-500 mr-2">{icon}</span>

      <input
        {...props}
        className="w-full p-2 outline-none text-sm"
      />
    </div>
  </div>
);

// ------------------------------
// 🔹 PASSWORD FIELD
// ------------------------------
export const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  show,
  setShow,
  ...props
}) => (
  <div className="mb-3">
    <label className="text-sm font-medium text-gray-700 mb-1 block">
      {label}
    </label>

    <div className="flex items-center border rounded-md px-2 relative">
      <FaLock className="text-gray-500 mr-2 text-sm" />

      <input
        {...props}
        type={show ? "text" : "password"}
        className="w-full p-2 text-sm outline-none"
      />

      <span
        onClick={() => setShow(!show)}
        className="absolute right-3 cursor-pointer text-gray-500"
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  </div>
);
