import { Request,Response } from "express";
import { HttpStatus } from "../enums/HttpStatus";
import { adminSignInSchema } from "../utils/validationUtil";
import { AuthService } from "../services/authService";


const authService=new AuthService()



class AuthController {


    async signin(req:Request,res:Response){
        console.log('entering the auth controller in admin side');

        try {
            console.log('the req.body',req.body);

            const validationResult=adminSignInSchema.parse(req.body)

            if(!validationResult){
                res.status(HttpStatus.BAD_REQUEST)
                .json({success:false,message:"invalid Credentials"})
            }

            const response=await authService.loginAdmin(req.body)
            console.log('response in authcontroller back from authservice is ',response);

            if(typeof response==='string'){
                 res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:response})
                 return
            }

            if(response?.success){
                res.status(HttpStatus.CREATED).cookie('refrToken',response.refreshToken,{
                    httpOnly:true,
                    secure:true,
                    sameSite:'none',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                }).json({success:true,message:"login successfull",accessToken:response.accessToken})
                return
            }
            
            if(!response?.success){
                console.log('forwading from here');
                
                res.status(HttpStatus.BAD_REQUEST).json({message:response.message})
            }
            
            
        } catch (error) {
            console.log('error in auth controlller',error);
             res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success:false,message:"error in auth controller"})
            
        }
        
    }


    async logout(req:Request,res:Response){
        console.log('entering the logout  controller admin');
        
        try {
            
            res.clearCookie('refreshToken').json({message:"Logged out successfully"})
            return 
        } catch (error) {
            res.json({message:"Something went wrong"})
            return
        }
    }

    async setNewToken(req:Request,res:Response){
        console.log('entering the setnewtoken');
        
        const token=req.cookies?.refrToken;
       
        if(!token){
            res.status(HttpStatus.FORBIDDEN).json({message:'Internal Server Error'})
        }
        try {
          
          const response=await authService.checkToken({token})
          console.log('the response back in the authcontroller ',response);

          if(response?.success){
            res.json({accessToken:response.accessToken})
            return
          }else{
            res.clearCookie('refrToken')
            res.status(HttpStatus.FORBIDDEN).json({message:response?.message})
          }
          

        } catch (error) {
            console.log('error in the setnew token',error);
            
        }
    }

}



export default AuthController