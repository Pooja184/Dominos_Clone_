import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoURL = process.env.MONGODB_URL;

    if (!mongoURL) throw new Error("MONGODB_URL missing");

    await mongoose.connect(mongoURL);

    console.log(" MongoDB Connected");
  } catch (error) {
    console.error(" MongoDB connection failed:", error);
  }
};

export default connectDB;
