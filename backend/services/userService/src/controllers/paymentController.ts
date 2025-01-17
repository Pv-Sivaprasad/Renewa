import { NextFunction,Response } from "express";
import { IncomingReques } from "../middleware/auth.middleware";
import { PaymentService } from "../services/paymentService";
import { JwtPayload } from "jsonwebtoken";
import { HttpStatus } from "../enums/http.status";
import stripe from "../utils/stripeUtil";

const paymentService=new PaymentService()

export class PaymentController {
  
    async createPayment(req:IncomingReques,res:Response,next:NextFunction){

  
        const user=req.user as JwtPayload
        const userId=user.id
        const data=req.body
        const {amount}=req.body
        const slotId=data.slot.slotId
        // console.log(`amount : ${amount} slotId ${slotId} the userId ${userId}  `);
        
        const paymentDetails={
            docId: data.doctorId,
            date:data.date,
            amount:data.amount,
            slot:data.slot,
            userId:userId
        }

        try {
            // const clientSecret=await paymentService.createPaymentIntent(paymentDetails)
            // console.log(clientSecret,'the res in con pay');
            // return res.status(HttpStatus.CREATED).json(clientSecret)

            const session = await stripe.checkout.sessions.create({
                line_items: [
                  {
                    price_data: {
                      currency: 'usd',
                      product_data: {
                        name: 'slot fro afsal',
                      },
                      unit_amount: 2000,
                    },
                    quantity: 1,
                  },
                ],
                mode: 'payment',
                success_url: 'http://localhost:4242/success/',
                cancel_url: 'http://localhost:4242/cancel',
              });

              console.log(session);
              

              res.json({session: session.url});
            
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"internal server Error"});
        }
    }

}