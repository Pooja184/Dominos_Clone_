import { Router } from "express";
import {  getCurrentUser, login, logoutUser, register, verifyOtp } from "../controllers/auth.controller.js";
import { tokenDecoder } from "../middlewares/tokenDecode.js";
// import authRouter from "./auth.route";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/login", login);
authRouter.get("/me",tokenDecoder, getCurrentUser)
authRouter.post("/logout", logoutUser);

export default authRouter;
