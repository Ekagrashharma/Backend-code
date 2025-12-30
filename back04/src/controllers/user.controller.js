import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "..utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"

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

    const avatar = await uploadOnCloudinary(avatarLocalpath)
    const coverImage = await uploadOnCloudinary(coverImageLocalpath)

    if (!avatar){
        throw new ApiError(400, "avatar is required")
    }

    const user = await  User.create({
            filename,
            email,
            username:islowerCase(),
            avatar: avatar.url,
            coverImage : coverImage?.url || "",
            password
        })
    
    const createdUser = User.findById(user._id).select(
        "-password -refreshTokens"
    )
    if(!createdUser){
        throw new ApiError(500 ,"Something went wrong while creating User")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered succesfully")
    )
})


    export {registerUser}