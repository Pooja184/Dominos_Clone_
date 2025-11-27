import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser, verifyOtp } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/tokenDecode.js";
// import authRouter from "./auth.route";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/login", loginUser);
authRouter.get("/me",authMiddleware, getCurrentUser)
authRouter.post("/logout", logoutUser);

export default authRouter;
