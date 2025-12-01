import { Router } from "express";
import { tokenDecoder } from "../middlewares/tokenDecode.js";
import { isRoleSeller } from "../middlewares/isRoleSeller.js";
import { upload } from "../config/multer.js";
import { addProduct, getSellerProducts } from "../controllers/seller/seller.controller.js";
// import authRouter from "./auth.route";

const productRouter = Router();

productRouter.post('/add-product',tokenDecoder,isRoleSeller,upload.single("image"),addProduct)
productRouter.get("/my-products", tokenDecoder, isRoleSeller, getSellerProducts)

export default productRouter;
