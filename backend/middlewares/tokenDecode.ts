import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Request type to include custom fields
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      role?: string;
    }
  }
}

export const tokenDecoder = (req: Request, res: Response, next: NextFunction) => {
  try {
  //  console.log(req.cookies)
    // Get token from cookies
    const token = req.cookies?.token;
// console.log(token)
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      role: string;
    };

    // console.log("Decoded token:", decoded);

    // Attach decoded data to req
    req.userId = decoded.userId;
    req.role = decoded.role;

    next();
  } catch (error) {
    console.log("Token decode error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
