import { Request,Response } from "express";
import { HttpStatus } from "../enums/HttpStatus";
import { doctorSignInSchema } from "../utils/validationUtil";



class AuthController {


    async signIn(req:Request,res:Response){
        console.log('entering the auth controller in the doctor side');
        
        try {
            console.log(req.body,'the data in the body ')
            const validationResult=doctorSignInSchema.safeParse(req.body)

            if(!validationResult.success){
                res.status(HttpStatus.BAD_REQUEST)
                .json({message:"Invalid Credentials"})
            }
            
           
        } catch (error) {
            console.log('error in signin controller of doctor side',error);
            
        }
    }


}



export default AuthController