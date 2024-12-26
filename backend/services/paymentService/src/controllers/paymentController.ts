import { Request,Response,NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { HttpStatus } from "../enums/httpStatus";


interface CustomeRequest extends Request {
    user?: string | JwtPayload,

}

export class PaymentController{
    
    async createSessionForStripe(req:CustomeRequest,res:Response,next:NextFunction){

        console.log('entering the payment createsessionfor Stripe');
        
        try {
            const user=req.user as JwtPayload
            const userId=user.id
            const {docId,slotId}=req.body
        } catch (error) {
            
        }
    }

}

export default PaymentController