import { Router } from "express";
import authRouter from "../routes/auth.js";
import productRouter from "./product.js";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/product", productRouter);


export default mainRouter;
