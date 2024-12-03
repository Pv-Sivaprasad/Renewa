import express, { Request, Response } from 'express'
import AuthController from '../controllers/authController'
import {S3Client} from '@aws-sdk/client-s3'


const auth_route=express.Router()
const authController=new AuthController()

auth_route.post('/signup',authController.signup)
auth_route.post('/otpverify',authController.otpverify)
auth_route.post('/resend-otp',authController.resendOtp)
auth_route.post('/signin',authController.signin)
auth_route.post('/google-signin',authController.googleSignin)
auth_route.post('/forget',authController.forgetPassword)
auth_route.post('/reset',authController.resetPassword)
auth_route.get('/logout',authController.logout)
auth_route.get('/refresh-token',authController.setNewToken)



export default auth_route



