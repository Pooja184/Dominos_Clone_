import { Router } from "express";
import { tokenDecoder } from "../middlewares/tokenDecode.js";
import { isRoleSeller } from "../middlewares/isRoleSeller.js";
import { upload } from "../config/multer.js";
import { addProduct, deleteProduct, getSellerProducts } from "../controllers/seller/seller.controller.js";
import { addCategories, getCategories } from "../controllers/seller/product.controller.js";
import { getCategoryProducts } from "../controllers/user/products.controller.js";
// import authRouter from "./auth.route";

const productRouter = Router();

// seller
productRouter.post('/add-product',tokenDecoder,isRoleSeller,upload.single("image"),addProduct)
productRouter.get("/my-products", tokenDecoder, isRoleSeller, getSellerProducts)
productRouter.delete("/delete/:id",tokenDecoder,deleteProduct)

// user
productRouter.get("/get-products/:category",getCategoryProducts)
// admin
productRouter.post("/add-category",upload.single("image"),addCategories)
productRouter.get("/get-categories",getCategories)

export default productRouter;
