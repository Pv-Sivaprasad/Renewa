import { Request, Response } from "express";
import { AuthService } from "../services/authService";

const authService = new AuthService()

class AuthController {

  async signup(req: Request, res: Response):Promise<void> {

    console.log('entering user sign up in authcontroller');
    try {
      const { username, email, password } = req.body
      console.log(username, 'name', email, 'email', 'password', password);

      const response = await authService.registerUser(req.body)
      res.status(201).json(response)

    } catch (error) {
      console.log('error in the signup auth controller');
       res.status(500).json({ success: false, message: 'Internal server error'})

    }

  }


}





export default AuthController