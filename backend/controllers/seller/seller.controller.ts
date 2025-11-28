import type{ Request, Response } from "express";
import Product from "../../models/seller/product.model.js";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const userId=req.userId;
    const {
      name,
      description,
      category,
      type,
      price,
      originalPrice,
      discount,
      details,
    } = req.body;

    if(!name ||!description || !category || !type || !price || !originalPrice || !discount || !details){
        return res.status(400).json({
          success:false,
          message:"all fields are required",
        })
    }
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    await Product.create({
      name,
      description,
      category,
      type,
      price,
      originalPrice,
      discount,
      details: details ? JSON.parse(details) : [],
      image: req.file.filename,
      sellerId: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.log("Add Product Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const getSellerProducts = async (req: Request, res: Response) => {
  try {
    const sellerId = req.userId;

    const products = await Product.find({ sellerId });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.log("Get Seller Products Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



