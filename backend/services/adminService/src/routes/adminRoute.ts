import express from 'express'
import AdminController from '../controllers/adminController'
import authenticateToken from '../middleware/auth.middleware'
import  AdminSlotController  from '../controllers/adminSlotController'
import { adminController } from '../config/container'

const admin_route=express.Router()
// const adminController=new AdminController()
const adminSlotController= new AdminSlotController()

admin_route.get('/users',authenticateToken,adminController.getAllUser.bind(adminController))
admin_route.patch('/users/:id',authenticateToken,adminController.updateUserStatus.bind(adminController))

admin_route.get('/doctors',authenticateToken,adminController.getAllDoctor.bind(adminController))
admin_route.patch('/doctors/:id',authenticateToken,adminController.updateDoctorStatus.bind(adminController))

admin_route.get('/docslots/:id',authenticateToken,adminSlotController.getDocSlotById)

export default admin_route