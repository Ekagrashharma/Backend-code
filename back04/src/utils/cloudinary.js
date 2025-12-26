import {v2 as cloudinary} from "cloudinary";
import fs from "fs"


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });


    const uploadOnCloudinary = async (localfilePath)=>{
        try {
            if(!localfilePath) return null 
            // upload file now 
            const response = await cloudinary.uploader.upload(localfilePath,{
                resource_type: "auto"
            })
            // file upload success on cloudinary 
            console.log("file upload on cloudnary successfull")
            return response
        } catch (error) {
            fs.unlinkSync(localfilePath)
            // unlink temp file after unsuccesful uploading process
        }
    }

    export {uploadOnCloudinary};