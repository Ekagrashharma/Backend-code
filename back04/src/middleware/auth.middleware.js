import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"

const verifyJwt = asyncHandler(async(req,res, next)=>{

    try {
        const token =req.cookies?.accessToken || req.header("authorization")?.replace("beerer ","")
    
        if (!token) {
            throw new ApiError(401, "Unauthorized user")
        }
    
        const decodedToken =jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
    
        const user =  User.findById(decodedToken?._id).select("-refreshToken -password")
    
        if (!user) {
            throw new ApiError(402,"Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(402, error?.message || "user logout failed")
    }

})
export {verifyJwt}