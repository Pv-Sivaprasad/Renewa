import express from  'express'
import DoctorController from '../controllers/doctorController'
import SlotController from '../controllers/slotController'
import authenticateToken from '../middleware/isAuthenticated'
import multer from 'multer'
import { checkDocStatus } from '../middleware/checkUser'




const doctor_route=express.Router()
const doctorController=new DoctorController()
const slotController=new SlotController()

const storage=multer.memoryStorage()
const  upload=multer({storage:storage})


doctor_route.get('/profiledata',authenticateToken,checkDocStatus,doctorController.getProfile)
doctor_route.patch('/profile',authenticateToken,checkDocStatus,upload.single('image'),doctorController.updateProfile)
doctor_route.post('/slots',authenticateToken,checkDocStatus,slotController.upsertSlots)



export default doctor_route