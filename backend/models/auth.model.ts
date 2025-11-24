import mongoose, { Schema } from "mongoose";

export type authRole = "user" | "seller" | "admin";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: authRole;
  isVerified: boolean;
  otp?: string | null;
  otpExpires?: Date | null;
}

const authSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Auth = mongoose.model<IUser>("Auth", authSchema);
export default Auth;
