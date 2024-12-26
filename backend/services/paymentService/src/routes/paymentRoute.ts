import express from 'express'
import authenticateToken from '../middleware/authMiddleware'
import PaymentController from '../controllers/paymentController'


const payment_route=express.Router()
const paymentController=new PaymentController

payment_route.post('/create-checkout-session',authenticateToken,paymentController.createSessionForStripe)


export default payment_route