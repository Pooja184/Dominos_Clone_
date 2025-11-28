import User from "../models/user/user.model.js";
import Seller from "../models/seller/seller.model.js";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { sendEmail } from "../utils/sendEmail.js";
import { tokenGenerator } from "../utils/tokenGenerator.js";

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();


export const register = async (req:Request, res:Response) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    if (!name || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // 🔍 Check if exists in USER
    const existingUser = await User.findOne({ email });
    // 🔍 Check if exists in SELLER
    const existingSeller = await Seller.findOne({ email });
    // console.log(existingSeller)

    if(existingUser && existingSeller){
       return res.status(400).json({
        success: false,
        message: "Email already registered as a User and Seller",
      });
    }else if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered as a User",
      });
    }else if (existingSeller) {
      return res.status(400).json({
        success: false,
        message: "Email already registered as a Seller",
      });
    }

    // Choose correct model
    const Model = role === "seller" ? Seller : User;

    // Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user/seller
    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await Model.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      role,
      otp,
      otpExpires,
    });

    const html = `
      <h2>Your OTP Verification Code</h2>
      <p>Hello ${name},</p>
      <p>Your OTP is: <strong>${otp}</strong></p>
      <p>Valid for 10 minutes.</p>
    `;

    await sendEmail(email, "Verify your email", html);

    return res.status(201).json({
      success: true,
      message: `OTP sent to ${email}. Please verify to complete registration.`,
    });


  } catch (error) {
    console.log("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp, role } = req.body;

    if (!email || !otp || !role) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const Model = role === "seller" ? Seller : User;

    const user = await Model.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.otpExpires! < new Date()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = tokenGenerator(user._id.toString(), role);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    return res.json({
      success: true,
      message: "Account verified",
      user: { name: user.name, email: user.email, role },
    });
  } catch (error) {
    console.log("Verify OTP Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    let role = "user";

    if (!user) {
      user = await Seller.findOne({ email });
      role = "seller";
    }

    if (!user) {
      return res.status(404).json({ success: false, message: "Email not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ success: false, message: "Please verify your email" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    const token = tokenGenerator(user._id.toString(), role);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        role,
      },
    });
  } catch (error) {
    console.log("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getCurrentUser = async (req:Request, res:Response) => {
  try {
    // const token = req.cookies.token;
    // console.log("Token from cookies:", token);
    console.log(req.userId, "req.userId");

    const isUserExists = await User.findById(req.userId);
    if (!isUserExists) {
      var isSellerExists = await Seller.findById(req.userId);
      if (!isSellerExists) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }

      return res.status(200).json({
        message: "Login Successful",
        success: true,
        user: {
          name: isSellerExists.name,
          userId: isSellerExists._id,
          role: "seller",
        },
      });
    }

    return res.status(200).json({
      message: "Login Successful",
      success: true,
      user: { name: isUserExists.name, userId: isUserExists._id, role: "user" },
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .send({ message: "Error in getting current user", success: false });
  }
};


export const logoutUser = (req: Request, res: Response) => {
  try {
    // Clear token cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // set true if HTTPS
    });

    return res.json({
      success: true,
      message: "Logout successful",
    });

  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during logout",
    });
  }
};

