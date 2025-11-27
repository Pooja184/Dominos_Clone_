import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId: string;
  file?: Express.Multer.File;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }

  try {
    // console.log(req.role)
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    console.log("DECODED TOKEN:", decoded);

    req.userId = decoded.userId;
    // console.log(req.userId,req.role)
    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
