import type{ Request, Response } from "express";
import Product from "../../models/seller/product.model.js";
import cloudinary, { uploadToCloudinary } from "../../config/cloudinary.js";
import fs from "fs";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
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

    // VALIDATION
    if (
      !name ||
      !description ||
      !category ||
      !type ||
      !price ||
      !originalPrice ||
      !discount ||
      !details
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // 📤 UPLOAD TO CLOUDINARY
    const cloudinaryImageUrl = await uploadToCloudinary(req.file.path);

    // 🧹 REMOVE TEMP FILE AFTER UPLOAD
    fs.unlinkSync(req.file.path);

    // SAVE PRODUCT IN DATABASE
    await Product.create({
      name,
      description,
      category,
      type,
      price,
      originalPrice,
      discount,
      details: JSON.parse(details),
      image: cloudinaryImageUrl.url, //  VERY IMPORTANT
      imagePublicId: cloudinaryImageUrl.public_id,   // needed for delete
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


export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const sellerId = req.userId; // seller from tokenDecoder

    // STEP 1: Find product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // STEP 2: Check ownership
    if (product.sellerId.toString() !== sellerId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this product",
      });
    }

    // STEP 3: Delete image from Cloudinary
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    // STEP 4: Delete product from DB
    await Product.findByIdAndDelete(productId);

    return res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("Delete Product Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
