import { NextFunction,Response } from "express";
import { IncomingReques } from "../middleware/auth.middleware";
import { PaymentService } from "../services/paymentService";
import { JwtPayload } from "jsonwebtoken";

const paymentService=new PaymentService()

export class PaymentController {

    async createPayment(req:IncomingReques,res:Response,next:NextFunction){

        console.log('entering th create payment in the payment controller');

        console.log('req.body',req.body);

        const user=req.user as JwtPayload
        const userId=user.id
        const data=req.body
        const {amount}=req.body
        const slotId=data.slot.slotId
        console.log(`amount : ${amount} slotId ${slotId} the userId ${userId}  `);
        
        const paymentDetails={
            docId: data.doctorId,
            date:data.date,
            amount:data.amount,
            slot:data.slot,
            userId:userId
        }

        try {
            const clientSecret=await paymentService.createPaymentIntent(paymentDetails)
        } catch (error) {
            
        }
    }

}