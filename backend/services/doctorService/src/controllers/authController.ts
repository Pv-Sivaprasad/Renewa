import { Request,Response } from "express";
import { HttpStatus } from "../enums/HttpStatus";
import { docSignIn, doctorSignInSchema } from "../utils/validationUtil";
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
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Internal server error"})
        }
    }


    async signIn(req:Request,res:Response){
        console.log('entering the signin authcontroller doc side');
        console.log(req.body,'signin authcontroller doc side');
        
        try {
            
            const validationResult=docSignIn.safeParse(req.body)
            if(!validationResult.success){
               return res.status(HttpStatus.BAD_REQUEST)
                .json({message:"Invalid Credentials"})
            }

            const response= await authService.docSignIn(req.body)
            console.log(response,'res in the authController');
            
            if(!response.success){
              return  res.status(HttpStatus.NOT_FOUND).json({message:response.message})
            }

            return res.status(HttpStatus.CREATED)
            .cookie('refrToken',response.refreshToken,{
                httpOnly:true,
                secure:true,
                sameSite:'none',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .json({
                message:response.message,
                accessToken:response.accessToken,
                username:response.username,
                email:response.email,
            })
            

        } catch (error) {
           console.log('error int signin authcontroller doc side');
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Internal server error"})
        }
        
    }


}



export default AuthController