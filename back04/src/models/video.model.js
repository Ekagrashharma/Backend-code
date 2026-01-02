import mongoose ,{Schema} from "mongoose";

const videoSchema = new Schema(
    {
        videoFile:{
            type: String, // cloudnary url
            require: true
        },
        thumbnail:{
            type: String, // cloudnary url 
            require: true
        },
        title:{
            type: String, 
            require: true
        },
        discription:{
            type: String, 
            require: true
        },
        duration:{
            type: number,
            require: true
        },
        isPublised:{
            type:Boolean,
            default: true
        },
        views:{
            type: number,
            default: 0
        }
    }
,{timestamps}
)