import { User } from "../models/user.model"
import { apiError } from "../utils/apiError"
import { asyncHandler } from "../utils/asyncHandler"
import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"

const verifyJwt = asyncHandler(async(req,res, next)=>{

    try {
        const token =req.cookies?.accessToken || req.header("authorization")?.replace("beerer ","")
    
        if (!token) {
            throw new apiError(401, "Unauthorized user")
        }
    
        const decodedToken =jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
    
        const user =  User.findById(decodedToken?._id).select("-refreshToken -password")
    
        if (!user) {
            throw new apiError(402,"Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new apiError(402, error?.message || "user logout failed")
    }

})
export {verifyJwt}