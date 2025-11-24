import { Router } from "express";
import authRouter from "../routes/auth.ts";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);

export default mainRouter;
