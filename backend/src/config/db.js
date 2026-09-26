import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log(`server connected to mongodb successfully`);
  } catch (error) {
    console.log(`server failed to connect`);
  }
};
export default connectDB;
