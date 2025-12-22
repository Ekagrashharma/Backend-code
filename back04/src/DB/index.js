import mongoose from "mongoose";
import { DATABASE_NAME } from "../constant.js";


const connectDB = async () => {
  try {
   const connectInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DATABASE_NAME}`);
    console.log(`\n mongo db is connected !!!${connectInstance.connection.host}`)
  } catch (err) {
    console.log("mongo db connection error", err);
    process.exit(1);
  }
};

export default connectDB;