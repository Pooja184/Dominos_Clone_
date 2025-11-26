import jwt from "jsonwebtoken";

export const tokenGenerator = (userId: string, role: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(
    { userId, role },   
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};
