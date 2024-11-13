import express from 'express'
import AuthController from '../controllers/authController'


const doctor_route=express.Router()
const authController=new AuthController()


doctor_route.post('/signup',authController.signUp)
doctor_route.post('/signin',authController.signIn)
doctor_route.post('/logout',authController.logout)


export default doctor_route