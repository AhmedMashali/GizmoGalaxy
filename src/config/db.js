import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database is connected successfully!");
  } catch (err) {
    console.log(err);
  }
};
