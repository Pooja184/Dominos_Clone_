import mongoose, { Schema, model } from "mongoose";

export interface CategoryDocument extends mongoose.Document {
  name: string;
  image: string;
  imagePublicId:string;
}

const categorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true, unique: true,lowercase:true },
    image: { type: String, required: true },
    imagePublicId:{type:String,required:true}
  },
  { timestamps: true }
);

export const Category = model<CategoryDocument>("Category", categorySchema);
