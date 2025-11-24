import { Router } from "express";
import { loginUser, logoutUser, registerUser, verifyOtp } from "../controllers/auth.controller.ts";
// import authRouter from "./auth.route";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);

export default authRouter;
