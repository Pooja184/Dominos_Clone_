import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/auth.model.js";
import { tokenGenerator } from "../utils/tokenGenerator.js";
import { sendEmail } from "../utils/sendEmail.js";

//  Helper to generate 6-digit OTP
const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// =========================
//  REGISTER (Send OTP)
// =========================
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword} = req.body;

    // 1. Validate fields
    if (!name || !email || !password || !confirmPassword) {
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

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    // console.log(existingUser)
  if (existingUser && !existingUser.isVerified) {
  return res.status(400).json({
    success: false,
    message: `This email is already registered`,
  });
}

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Generate OTP & expiry (10 minutes)
    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    let user;

    if (existingUser && !existingUser.isVerified) {
      // If user exists but is not verified, update OTP & password
      existingUser.name = name;
      existingUser.password = hashedPassword;
      existingUser.otp = otp;
      existingUser.otpExpires = otpExpires;
      user = await existingUser.save();
    } else {
      // 5. Create new user but not verified yet
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        isVerified: false,
        otp,
        otpExpires,
      });
    }

    // 6. Send OTP email
    const html = `
      <h2>Your Auburn Domino's Verification Code</h2>
      <p>Hello ${user.name},</p>
      <p>Your OTP is: <b>${otp}</b></p>
      <p>This code will expire in 10 minutes.</p>
    `;

    await sendEmail(user.email, "Verify your email - Auburn Domino's", html);

    // 7. Response 
    return res.status(201).json({
      success: true,
      message: "OTP sent to your email. Please verify to complete registration.",
    });
  } catch (error: any) {
     if (error.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Email already registered for this role",
    });
  }
  }
};

// =========================
//  VERIFY OTP (Create token)
// =========================
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    // console.log("BODY RECEIVED:", req.body);
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });
// console.log(user)
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User is already verified. Please login.",
      });
    }

    // Check OTP & expiry
    if (!user.otp || !user.otpExpires) {
      return res.status(400).json({
        success: false,
        message: "OTP not found. Please register again.",
      });
    }

    const now = new Date();

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.otpExpires < now) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please register again.",
      });
    }

    // Mark as verified and clear OTP fields
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // Generate JWT token
    const token = tokenGenerator(user._id.toString());

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Account verified successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// =========================
//  LOGIN (Only verified users)
// =========================
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });
console.log(user)
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    // 2. Check if verified
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    // 3. Check password
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // 4. Generate token
    const token = tokenGenerator(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};


export const getCurrentUser = async (req:Request, res:Response) => {
  try {
    console.log(req.userId, "req.userId");

    // FIND USER BY ID
    const user = await User.findById(req.userId)
console.log(user)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // RETURN RESPONSE
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        userId: user._id,
      
      },
    });

  } catch (error) {
    console.log("getCurrentUser error:", error);
    return res.status(500).json({
      success: false,
      message: "Error in getting current user",
    });
  }
};


// =========================
//  LOGOUT
// =========================
export const logoutUser = (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.json({ success: true, message: "Logout succesfull." });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .send({ message: "Error in getting current user", success: false });
  }
};
