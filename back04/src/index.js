import mongoose from "mongoose";
import { DATABASE_NAME } from "./contanst";

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
