import { Request,Response } from "express";
import { HttpStatus } from "../enums/HttpStatus";
import { doctorSignInSchema } from "../utils/validationUtil";
import { AuthService } from "../services/authService";



const authService= new AuthService()


class AuthController {


    async signUp(req:Request,res:Response){
        console.log('entering the auth controller in the doctor side');
        
        try {
            console.log(req.body,'the data in the body ')
            const validationResult=doctorSignInSchema.safeParse(req.body)

            if(!validationResult.success){
                res.status(HttpStatus.BAD_REQUEST)
                .json({message:"Invalid Credentials"})
            }
            
            const response=await authService.docSignUp(req.body) 
            console.log(response,'res in authcontroller');
            
            if(!response.success){
                res.status(HttpStatus.BAD_REQUEST).json(response)
            }else{

                return res.status(HttpStatus.CREATED).json({message:"Doctor registered successfully"})
            }

        } catch (error) {
            console.log('error in signin controller of doctor side',error);
            
        }
    }


}



export default AuthController