import { Request,Response,NextFunction } from "express";
import { HttpStatus } from "../enums/http.status";
import { JwtPayload } from "jsonwebtoken";
import { IncomingReques } from "../middleware/auth.middleware";
import { UpdateProfileDto } from "../dto/userDto";
import { UserService } from "../services/userService";



const userService=new UserService()


class UserController {


    async getProfile(req:IncomingReques,res:Response){
        console.log('entering the get profile in userController');
         try {
            const user=req.user as JwtPayload
        console.log(user,'the user  from the middleware is');
        const userId=user.id
        console.log(userId,'the user id from the middleware is');

            const data=await userService.getProfileData(userId)
            console.log('data from the controller is',data);
            
        const response={
            username:data?.username,
            email:data?.email,
            address:data?.address,
            image:data?.image,
            mobile:data?.mobile,
            city:data?.address?.city,
            state:data?.address?.state,
            pincode:data?.address?.pincode,
            nationality:data?.address?.nationality,
            landmark:data?.address?.landmark
            
        }
        return res.status(HttpStatus.CREATED).json(response)

         } catch (error) {
            console.log('error in getprofile in userCon',error);
            
         }
        
    }

    
    async updateProfile(req:IncomingReques,res:Response){
        console.log('entering the profile in the user controller');

        try {
            const user=req.user as JwtPayload
            console.log('the userid from the middleware is ',user);
            const userId=user.id
            console.log('the user id ',userId);

            const updateData:UpdateProfileDto=req.body
            console.log('the data to be updated is ',updateData);
            

            const updatedData=await userService.updateUserProfile(userId,updateData)
            console.log('the updated data is',updatedData);
             

            const data={
                username:updateData.username,
                address:updateData.address,
                image:updateData.image,
                mobile:updateData.mobile,
                city:updateData.address?.city,
                state:updateData.address?.state,
                pincode:updateData.address?.pincode,
                nationality:updateData.address?.nationality,
                landmark:updateData.address?.landmark,
                
            }
            
            return res.status(HttpStatus.CREATED).json(data)
            
        } catch (error) {
            console.log('error in the profile user controller',error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
        
    }



}


export default UserController