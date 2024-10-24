import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { json } from "stream/consumers";
import jwt  from 'jsonwebtoken'
import { HttpStatus } from "../enums/http.status";
import { auth } from "firebase-admin";
const authService = new AuthService()

class AuthController {


  // This is the sign up in the project 
async signup(req: Request, res: Response) {

    console.log('entering user sign up in authcontroller');
    try {
      const { username, email, password ,confirmPassword} = req.body
      console.log(username, 'name', email, 'email', 'password', password,'cnfPwd',confirmPassword);
      console.log(req.body,'asdfkfhsd');
      
      const response = await authService.registerUser(req.body)
      console.log('the response recived from authservice register user is',response);
      
     return res.status(HttpStatus.OK).json(response)

    } catch (error) {
      console.log('error in the signup auth controller',error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error'})

    }

}

async otpverify(req:Request,res:Response) {
  console.log('entering the otp verify in authcontriller');

    try {
      const data=req.body
      console.log('the otp recieved in the body in the otpverfiy authcontroller',data);
      console.log(typeof data);
      
      const response=await authService.verifyOtpUser(data)
      
    } catch (error) {
      console.log('error in otpverify of authcontroller ',error);
      
    }

}


// This is the sign in for the project with access and refresh token
async signin(req:Request,res:Response) {
    console.log('Entering user sign in authcontroller'); 
    try {
        const {email,password}=req.body
        console.log(email,password,'in the auth controller sign in before auth service ')
      const result  = await authService.loginUser(req.body)
      console.log('token recieved back from authservice for controller is ',result);  
        console.log(typeof result);
      if (typeof result === 'string') {
        return res.status(400).json({ message: result });
    }
      if(result?.success){
        console.log('the refreshtoken recieved is ',result.refreshToken);
        const refreshToken = result.refreshToken || ''
        res.cookie('refreshToken',result.refreshToken,{
          httpOnly:true,
          secure:process.env.NODE_ENV==='production',
          sameSite:'strict',
          maxAge: 10 * 24 * 60 * 60 * 1000 
        })  
      }
      return res.status(HttpStatus.CREATED).json({
        message:'Login completed with refersh token',
        accessToken:result.accessToken
      })

    } catch (error) {
      console.log('error in sign in auth controller');
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'the error got from auth controller signin'})
    }
    

}


async googleSignin(req:Request,res:Response) {
  console.log('entering the googlesignin authcontroller ');
  try {
      const {email,username}=req.body
      const result=await authService.SignInWithGoogle(req.body)
      if (typeof result === 'string') {
        return res.status(400).json({ message: result });
    }

      if(result?.success){
        res.cookie('refreshToken',result.refreshToken,{
          httpOnly:true,
          secure:process.env.NODE_ENV==='production',
          sameSite:'strict',
          maxAge: 10 * 24 * 60 * 60 * 1000

        })

      }
      return res.status(HttpStatus.CREATED).json({
        success:true,message:'Login Successfull ',
        accessToken:result.accessToken
      })

  } catch (error) {
    console.log('error in googlesign in auth controller');
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'the error got from auth controller gooogle signin'})
  }
  
}


}





export default AuthController