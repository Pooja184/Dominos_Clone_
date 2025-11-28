import mongoose, { Schema } from "mongoose";

// export type UserRole = "user" | "seller" | "admin";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  role:string;
  otp?: string | null;
  otpExpires?: Date | null;
}

const sellerSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },

    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
role:{type:String,required:true},
    otp: { type: String, default: null },
    otpExpires: { type: Date, default: null },
  },
  { timestamps: true }
);

const Seller = mongoose.model<IUser>("Seller", sellerSchema);
export default Seller;
