import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"

    const registerUser = asyncHandler (async (req ,res)=>{
        const {fullname ,email, username, password}=req.body
        if (
            [fullname , email , username, password].some((fields)=>
            fields?.trim()==="")
        ) {
            throw new ApiError(400, "All fields are required ")
        }

    const existedUser = User.findOne(
        {
        $or:[{ username },{ email }]
        }
    ) 
    
    if(existedUser){
        throw new ApiError(409, "User already with same username or existed User")
    }

    const avatarLocalpath = req.files?.avatar[0]?.path;
    const coverImageLocalpath = req.files?.coverImage[0]?.path;

    if(!avatarLocalpath){
        throw new ApiError(400, "avatar is required")
    }
})


    export {registerUser}