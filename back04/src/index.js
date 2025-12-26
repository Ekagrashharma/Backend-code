import dotenv from "dotenv";
import connectDB from "./DB/index.js";
import {app} from "./app.js"

dotenv.config({ path: "./env" });

console.log(process.env.MONGODB_URI);

connectDB()
  .then(
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is listening at port: ${process.env.PORT}`);
    })
  )
  .catch((err) => {
    console.log("mongo db connection error", err);
  });

/*

************************FIRST APPROACH ********************************

import express from "express";

const app = express()(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DATABASE_NAME}`);
    app.on("error", () => {
      console.error("ERROR", err);
      throw err;
    });

app.listen(process.env.PORT,()=>(
    console.log(`your app listening at ${process.env.PORT}`)
    
))

  } catch (err) {
    console.error("ERROR", err);
    throw err;
  }
})();
*/
