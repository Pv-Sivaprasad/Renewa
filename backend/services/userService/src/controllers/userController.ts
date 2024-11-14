import { Request,Response,NextFunction } from "express";
import { HttpStatus } from "../enums/http.status";
import { JwtPayload } from "jsonwebtoken";
import { IncomingReques } from "../middleware/auth.middleware";
import { UpdateProfileDto } from "../dto/userDto";
import { UserService } from "../services/userService";



const userService=new UserService()


class UserController {

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
                image:updateData.image
            }
            
            return res.status(HttpStatus.CREATED).json(data)
            
        } catch (error) {
            console.log('error in the profile user controller',error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
        
    }


}


export default UserController