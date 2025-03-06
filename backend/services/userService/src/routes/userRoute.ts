import express from "express";
import  {authenticateToken}  from "../middleware/auth.middleware";
import UserController from "../controllers/userController";
import { DoctorController } from "../controllers/docController";
import { DocSlotController } from "../controllers/docSlotController";
import { checkUserStatus } from "../middleware/checkUser.middleware";
import multer from 'multer'



const user_route=express.Router()
const userController= new UserController()
const doctorController= new DoctorController()
const docSlotController=new DocSlotController()

 
const storage=multer.memoryStorage()
const upload=multer({storage:storage})


 
user_route.get('/profiledata',authenticateToken,checkUserStatus,userController.getProfile)
user_route.patch('/profile',authenticateToken,checkUserStatus,upload.single('image'),userController.updateProfile)
user_route.get('/doctorlist',authenticateToken,checkUserStatus,doctorController.getAllDoctors)
user_route.get('/alldocs',doctorController.getAllDoctors)
user_route.get('/docslot/:id',authenticateToken,checkUserStatus,docSlotController.getDoctorSlotById)
user_route.get('/bookings',authenticateToken,checkUserStatus,docSlotController.getBookedData)
user_route.get('/singledoc/:id',doctorController.getSingleDoctor)

export default user_route


