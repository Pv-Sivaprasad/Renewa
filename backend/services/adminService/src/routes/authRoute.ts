import express ,{ Request,Response} from "express";
import AuthController from '../controllers/authController'



const auth_route=express.Router()
const authController=new AuthController()

auth_route.post('/signin',authController.signin)
auth_route.get('/logout',authController.logout)
auth_route.get('/refresh-token',authController.setNewToken)



export default auth_route


