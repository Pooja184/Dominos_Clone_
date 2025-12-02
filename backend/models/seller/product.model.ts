import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  type: "veg" | "non-veg";

  price: number;
  originalPrice?: number;
  discount?: number;

  image: string;
  imagePublicId: string;
  details?: string[];

  sellerId: mongoose.Types.ObjectId; // RELATION
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },

    category: { type: String, required: true,lowercase:true},
    type: { type: String, enum: ["veg", "non-veg"], required: true },

    price: { type: Number, required: true },
    originalPrice: Number,
    discount: Number,

    image: { type: String, required: true },
    imagePublicId: {
      type: String,
      required: true,
    },
    details: [{ type: String }],

    // ⭐ RELATION WITH SELLER COLLECTION
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
