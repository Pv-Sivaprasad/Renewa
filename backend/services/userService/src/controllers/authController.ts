import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { HttpStatus } from "../enums/http.status";
import { forgetPassword, userSignInSchema, userSignUpSchema,resetPassword } from "../utils/validation.util";
import jwt from 'jsonwebtoken'



const authService = new AuthService()

class AuthController {



  async signup(req: Request, res: Response) {
 
    try {
      
      const validationResult= userSignUpSchema.safeParse(req.body)

      if(!validationResult.success){
        return res.status(HttpStatus.BAD_REQUEST)
        .json({success:false,message:validationResult.error.errors[0].message})
      }

      const response = await authService.registerUser(req.body)
    

      return res.status(HttpStatus.OK).json(response)

    } catch (error) {
      console.log('error in the signup auth controller', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Internal server error' })

    }

  }

  async otpverify(req: Request, res: Response) {
 

    try {
      const data = req.body

      const response = await authService.verifyOtpUser(data)
      if (typeof response === 'string') {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: response });
      }
      if (response?.success) {
        return res.status(HttpStatus.CREATED).json({message:response})
      }
        
        
    } catch (error) {
      console.log('error in otpverify of authcontroller ', error);

    }

  }


  async resendOtp(req:Request,res:Response) {
   
    
    try {
        const email=req.body
        const resposne=await authService.resendTheOtp(email)
      
        if (typeof resposne === 'string') {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: resposne });
        }
        if (resposne?.success) {
          return res.status(HttpStatus.CREATED).json({message:resposne})
        }

    } catch (error) {
      
    }

  }

  async signin(req: Request, res: Response) {
   
    try {
      
      const validationResult= userSignInSchema.safeParse(req.body)
      // console.log(validationResult,'the validation result');
      
      if(!validationResult.success){

        return res.status(HttpStatus.BAD_REQUEST)
        .json({success:false,message:"Invalid credentials"})
      }

      const { email, password } = req.body
      const result = await authService.loginUser(req.body)

      if (typeof result === 'string') {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: result });
      }
      if (result?.success) {
        const refreshToken = result.refreshToken || ''
    
          res.status(HttpStatus.CREATED).cookie('reffToken', result.refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite:'none',
          maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .json({
          message: 'Login completed with refersh token',
          accessToken: result.accessToken,username:result.username
          ,email:result.email
        })
        return
      }
      if(!result.success){
        console.log(result.message,'sdhfkjhsdafksf');
        
        return res.status(HttpStatus.BAD_REQUEST).json({message:result.message})
      }
  
      

    } catch (error) {
      console.log('error in sign in auth controller');
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({success:false, message: 'the error got from auth controller signin' })
    
    }


  }


  async googleSignin(req: Request, res: Response) {
    try {
      const { email, username } = req.body
      const result = await authService.SignInWithGoogle(req.body)
  
      if (typeof result === 'string') {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: result });
      }

      if (result?.success) {
        res.cookie('reffToken', result.refreshToken, {
          httpOnly: true,
          secure:true,
          sameSite: 'none',
          maxAge: 7 * 24 * 60 * 60 * 1000

        })

      }
      return res.status(HttpStatus.CREATED).json({
        success: true, 
        message: 'Login Successfull ',
        accessToken: result.accessToken,
        username,
        email
      })

    } catch (error) {
      console.log('error in googlesign in auth controller');
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'the error got from auth controller gooogle signin' })
    }

  }


  async forgetPassword(req: Request, res: Response) {
    const { email } = req.body

    const validationResult=forgetPassword.safeParse(req.body)
    if(!validationResult.success){
      return res.status(HttpStatus.BAD_REQUEST)
      .json({success:false,message:validationResult.error.errors[0].message})
    }


    const response = await authService.forgetPassword(req.body)


    if (typeof response === 'string') {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: response });
    }
    return res.status(HttpStatus.CREATED).json({
      message: 'Otp sent for changing password',

    })

  }


  async resetPassword(req: Request, res: Response) {
      const validationResult=resetPassword.safeParse(req.body)
      if(!validationResult.success){
        return res.status(HttpStatus.BAD_REQUEST)
        .json({success:false,message:validationResult.error.errors[0].message})
      }

      const response=await authService.resetPassword(req.body)
  
      if (typeof response === 'string') {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: response });
      }
      if(response.success){
        return res.status(HttpStatus.CREATED).json({
          message: 'Password successfully changed please login again',
    
        })
      }else{
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: response }); 
      }
      
  }


  async setNewToken(req:Request,res:Response){
    
    try {
      const refreshToken=req.cookies.reffToken

      if(!refreshToken){
        return res.status(HttpStatus.FORBIDDEN)
        .json({message:"No refresh token is available"})
      }

      const SECRET=process.env.REFRESH_TOKEN_SECRET
      
      if(!SECRET) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"internal server error"})

        const decoded= jwt.verify(refreshToken,SECRET)
      
    } catch (error) {
      console.log('error in the setnew token controller',error);
      
    }
  }


  async logout(req:Request,res:Response) {
    try {
    
      res.clearCookie('refreshToken')
      return res.json({message:"Logged out successfully"})
      
    } catch (error) {
      console.log('error in logging out',error);
      
    }
  }




}





export default AuthController