import type { Request, Response } from "express";
import Product from "../../models/seller/product.model.js";


export const getCategoryProducts = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    
    
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Category is required" });
    }

    const products = await Product.find({ category });

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const GetAllProducts = async (req:Request, res:Response) => {
  try {
    const products = await Product.find({});
    return res.json({ success: true, products });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .send({ message: "Error in getting current user", success: false });
  }
};
