import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { json } from "stream/consumers";
import jwt  from 'jsonwebtoken'
import { HttpStatus } from "../enums/http.status";
const authService = new AuthService()

class AuthController {

  async signup(req: Request, res: Response) {

    console.log('entering user sign up in authcontroller');
    try {
      const { username, email, password } = req.body
      console.log(username, 'name', email, 'email', 'password', password);

      const response = await authService.registerUser(req.body)
     return res.status(HttpStatus.OK).json(response)

    } catch (error) {
      console.log('error in the signup auth controller');
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error'})

    }

  }

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


}





export default AuthController