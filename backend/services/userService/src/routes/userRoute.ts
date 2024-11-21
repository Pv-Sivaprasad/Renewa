import express from "express";
import  {authenticateToken}  from "../middleware/auth.middleware";
import UserController from "../controllers/userController";
import { checkUserStatus } from "../middleware/checkUser.middleware";




const user_route=express.Router()
const userController= new UserController()





user_route.get('/profileData',authenticateToken,checkUserStatus,userController.getProfile)
user_route.patch('/profile',authenticateToken,checkUserStatus,userController.updateProfile)



export default user_route


