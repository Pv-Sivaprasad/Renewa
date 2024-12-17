import express from 'express'
import AdminController from '../controllers/adminController'
import authenticateToken from '../middleware/auth.middleware'



const admin_route=express.Router()
const adminController=new AdminController()


admin_route.get('/users',authenticateToken,adminController.getAllUser)
admin_route.patch('/users/:id',authenticateToken,adminController.updateUserStatus)

admin_route.get('/doctors',authenticateToken,adminController.getAllDoctor)
admin_route.patch('/doctors/:id',authenticateToken,adminController.updateDoctorStatus)

export default admin_route