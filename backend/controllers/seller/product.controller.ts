import type{ Request, Response } from "express";
import Product from "../../models/seller/product.model.js";
import { uploadToCloudinary } from "../../config/cloudinary.js";
import fs from "fs";
import { Category } from "../../models/categories.model.js";

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


export const addCategories=async(req:Request,res:Response)=>{
  try {
    const {name}=req.body.toLowerCase();

    if(!name){
      return res.status(400).json({
        success:false,
        message:"please enter name"
      })
    }

    if(!req.file){
      return res.status(400).json({
        success:false,
        message:"image is required"
      })
    }

    const cloudinaryImageUrl=await uploadToCloudinary(req.file.path);

    fs.unlinkSync(req.file.path);

    await Category.create({
      name,
      image:cloudinaryImageUrl.url,
      imagePublicId:cloudinaryImageUrl.public_id
    })
      return res.status(201).json({
      success: true,
      message: "Category added successfully",
    });
  } catch (error) {
    console.log("Add category Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

export const getCategories=async(req:Request,res:Response)=>{
  try{
    const categories=await Category.find({});
    return res.status(200).json({success:true,categories})
  }catch(error){
    res.status(500).json({message:"Error in getting categories",success:false})
  }
}