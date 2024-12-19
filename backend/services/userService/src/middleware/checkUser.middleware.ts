import { Request,Response,NextFunction } from "express";
import { UserRepository } from "../repositories/implementations/userRespository";
import { JwtPayload } from "jsonwebtoken";
import { UserService } from "../services/userService";
import { HttpStatus } from "../enums/http.status";


const userService=new UserService()

export interface IncomingReques extends Request {
    user?:  JwtPayload
    userId?: string;
}

export const checkUserStatus=async(req:IncomingReques,res:Response,next:NextFunction)=>{

    console.log('entering the checkusermiddleware');

    try {
        const userId=req.user as JwtPayload
        console.log('the userId in cheusermiddleware is ',userId);

        const id=userId.id
        console.log(id,'idfrom the userId');
        
        const userData=await userService.getProfileData(id)
        console.log('the user data in the check usr middleware',userData);
    
            if(userData?.isBlocked){
                console.log('now it is here as it is true',userData?.isBlocked);
                return res.status(HttpStatus.BAD_REQUEST).json({success:false,message:"No authentication"})
            }else{
                next()

            }
            
    } catch (error) {
        console.log('error in the check usr middleware',error);
        
    }
    

}