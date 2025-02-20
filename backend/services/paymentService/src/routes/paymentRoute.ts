import express from 'express'
import authenticateToken from '../middleware/authMiddleware'
// import { paymentController } from '@/config/container'
import {paymentController} from '../config/container'
const payment_route=express.Router()


payment_route.post('/create-checkout-session',authenticateToken,paymentController.createSessionForStripe.bind(paymentController))
// payment_route.post('/create-checkout-session',authenticateToken,paymentController.createSessionForStripe)


export default payment_route