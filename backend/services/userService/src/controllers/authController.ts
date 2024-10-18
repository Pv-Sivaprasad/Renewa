import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { json } from "stream/consumers";
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
      const token= await authService.loginUser(req.body)
      if(token)   return res.status(HttpStatus.OK).json({ message:"Login successfully completed" });
      
    } catch (error) {
      console.log('error in sign in auth controller');
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({})
    }
    

  }


}





export default AuthController