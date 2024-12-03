import express from "express";
import  {authenticateToken}  from "../middleware/auth.middleware";
import UserController from "../controllers/userController";
import { DoctorController } from "../controllers/docController";
import { checkUserStatus } from "../middleware/checkUser.middleware";
import multer from 'multer'



const user_route=express.Router()
const userController= new UserController()
const doctorController= new DoctorController()

const storage=multer.memoryStorage()
const upload=multer({storage:storage})



user_route.get('/profiledata',authenticateToken,checkUserStatus,userController.getProfile)
user_route.patch('/profile',authenticateToken,checkUserStatus,upload.single('image'),userController.updateProfile)
user_route.get('/doctorlist',authenticateToken,checkUserStatus,doctorController.getAllDoctors)


export default user_route


