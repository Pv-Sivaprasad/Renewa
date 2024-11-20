import express from  'express'
import DoctorController from '../controllers/doctorController'
import authenticateToken from '../middleware/isAuthenticated'
import multer from 'multer'





const doctor_route=express.Router()
const doctorController=new DoctorController()

const storage=multer.memoryStorage()
const  upload=multer({storage:storage})


doctor_route.get('/profiledata',authenticateToken,doctorController.getProfile)
doctor_route.patch('/profile',authenticateToken,upload.single('image'),doctorController.updateProfile)



export default doctor_route