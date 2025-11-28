import { Router } from "express";
import {  login, register, verifyOtp } from "../controllers/auth.controller.js";
import { tokenDecoder } from "../middlewares/tokenDecode.js";
// import authRouter from "./auth.route";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/login", login);
// authRouter.get("/me",authMiddleware, getCurrentUser)
// authRouter.post("/logout", logoutUser);

export default authRouter;
