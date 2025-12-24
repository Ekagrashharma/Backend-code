import mongoose ,{Schema} from "mongoose";

const videoSchema = new Schema(
    {
        videoFile:{
            type: string, // cloudnary url
            require: true
        },
        thumbnail:{
            type: string, // cloudnary url 
            require: true
        },
        title:{
            type: string, 
            require: true
        },
        discription:{
            type: string, 
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