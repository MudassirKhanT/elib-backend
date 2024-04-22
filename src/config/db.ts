import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("connected to databse successfully");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Error in connecting to databse.", err);
    });
    await mongoose.connect(config.databaseUrl as string);
  } catch (err) {
    console.log("Failed to connect to databse", err);
    process.exit(1);
  }
};

export default connectDB;
