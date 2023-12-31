import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MAIN_DB_URI);
    console.log("DB connected successfully");
  } catch (error) {
    console.log("DB Connectivity Error:", error);
  }
};

export default connectDB;
