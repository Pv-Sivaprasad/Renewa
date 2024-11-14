import express from 'express'
import AuthController from '../controllers/authController'


const auth_route=express.Router()
const authController=new AuthController()


auth_route.post('/signup',authController.signUp)
auth_route.post('/signin',authController.signIn)
auth_route.post('/logout',authController.logout)


export default auth_route