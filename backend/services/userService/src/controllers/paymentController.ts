import { NextFunction,Response } from "express";
import { IncomingReques } from "../middleware/auth.middleware";
import { PaymentService } from "../services/paymentService";

const paymentService=new PaymentService()

export class PaymentController {

    async createPayment(req:IncomingReques,res:Response,next:NextFunction){

        console.log('entering th create payment in the payment controller');
        console.log('req.body',req.body);
        
        const data=req.body
        const {amount}=req.body
        const slotId=data.slot.slotId
        console.log(`amount : ${amount} slotId ${slotId}`);
        
        try {
            const clientSecret=await paymentService.createPaymentIntent(req.body)
        } catch (error) {
            
        }
    }

}