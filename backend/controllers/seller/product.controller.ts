import type{ Request, Response } from "express";
import Product from "../../models/seller/product.model.js";

export const GetProducts = async (req:Request, res:Response) => {
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