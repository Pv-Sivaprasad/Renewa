import express from 'express'
import AuthController from '../controllers/authController'


const doctor_route=express.Router()
const authController=new AuthController()


doctor_route.post('/signin',authController.signUp)



export default doctor_route