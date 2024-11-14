import express from  'express'
import DoctorController from '../controllers/doctorController'
import authenticateToken from '../middleware/isAuthenticated'


const doctor_route=express.Router()
const doctorController=new DoctorController()


doctor_route.patch('/profile',authenticateToken,doctorController.updateProfile)



export default doctor_route