import type{ Request, Response, NextFunction } from "express";

export const isRoleSeller = (req:Request, res:Response, next:NextFunction) => {
  try {
    const role = req.role;
    if (role !== "seller") {
      return res.json({
        success: false,
        message: "Your not allow to access this route.",
      });
    }
    next();
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .send({ message: "Error in decoding token", success: false });
  }
};