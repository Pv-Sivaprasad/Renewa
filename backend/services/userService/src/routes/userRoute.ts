import express from "express";
import  isAuthenticated  from "../middleware/auth.middleware";
import UserController from "../controllers/userController";




const user_route=express.Router()
const userController= new UserController()





user_route.patch('/profile',isAuthenticated,userController.updateProfile)



export default user_route


