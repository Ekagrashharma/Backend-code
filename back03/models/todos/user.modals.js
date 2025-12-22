import mongoose from 'mongoose';
const {Schema, model} = mongoose

const blogSchema = new Schema({ 
    username:{
        type : string,
        required:true,
        unique: true,
        lowercase: true
    },
    email:{
      type:string,
      require: [true,"[password is required"],
      lowercase:true,
      unique: true
    },
    password:string
},{timestamps:true})

export const User = model("User" ,blogSchema) ;
