import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js"
import { User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js";

const generatAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accesToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return{accesToken, refreshToken}

    } catch (error) {
        throw new apiError(500 , "error in generating access and refreshtokens")
    }
}


const registerUser = asyncHandler( async (req, res) => {


    const {fullName, email, username, password } = req.body
    //console.log("email: ", email);

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new apiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new apiError(409, "User with email or username already exists")
    }
    //console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    

    if (!avatarLocalPath) {
        throw new apiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new apiError(400, "Avatar file is required")
    }
   

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new apiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new apiResponse(200, createdUser, "User registered Successfully")
    )

} )

const loginUser = asyncHandler(async(req, res)=>{

const {fullName, email, username}=req.body

    if ( !username || !email ){
        throw new apiError(400, "username and email required")
    }

const user = await User.findOne({
        $or:[{username} , {email}]
        })

const isPasswordValid = await user.isPasswordCorrect(password)
    
        if(!isPasswordValid){
            throw new apiError(401, "password is incorrect")
        }

        const {refreshToken, accesToken} = await generatAccessAndRefreshToken(user._id)

const loggedUser = await User.findById(user._id).select("-password -refreshToken")

const option ={
    httpOnly : true ,
    secure : true
}

    return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(
        new apiResponse(200,
            {
                user : loggedUser, accesToken, refreshToken
            },
            "User Logged in succesfully"
        )
    )
})

const logoutUser = asyncHandler(async(req, res)=>{
    
})

export {
    registerUser,
    loginUser
}