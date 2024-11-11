import express from 'express'
import AdminController from '../controllers/adminController'
import authenticateToken from '../middleware/auth.middleware'



const admin_route=express.Router()
const adminController=new AdminController()


admin_route.get('/users',authenticateToken,adminController.getAllUser)


export default admin_route