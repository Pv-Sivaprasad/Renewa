import express, { Request, Response } from 'express'
import AuthController from '../controllers/authController'


const auth_route=express.Router()
const authController=new AuthController()

auth_route.post('/signup',authController.signup)
auth_route.post('/signin',authController.signin)



export default auth_route



