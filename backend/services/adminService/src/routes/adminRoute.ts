import express from 'express'
import AdminController from '../controllers/adminController'




const admin_route=express.Router()
const adminController=new AdminController()


admin_route.get('/users',adminController.getAllUser)


export default admin_route