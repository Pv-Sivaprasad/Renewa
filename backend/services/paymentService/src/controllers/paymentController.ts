import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { HttpStatus } from "../enums/httpStatus";
import { IPaymentService } from "../services/interface/IPaymentService";

interface CustomeRequest extends Request {
    user?: string | JwtPayload,

}

export class PaymentController {


    constructor(private paymentService: IPaymentService) { }

    async createSessionForStripe(req: CustomeRequest, res: Response, next: NextFunction) {

        console.log('entering the payment createsessionfor Stripe');

        try {
            const user = req.user as JwtPayload
            const userId = user.id
            const { docId, startTime ,date} = req.body
            console.log(`docId ${docId}, startTime ${startTime} in payment controller `)

            const data = {
                userId,
                docId,
                startTime,
                date
            }
            console.log('data to send is ',data);
            
            const response = await this.paymentService.createSession(data)
            console.log('the response is',response);
            if(response.success){

                 res.status(HttpStatus.CREATED).json(response)
                 return
            }else{
                 res.status(HttpStatus.BAD_REQUEST).json(response)
                 return
            }
            

        } catch (error) {
            console.error('ERror founded in create session  paymenservice', error);
            next(error)
        }
    }



}

export default PaymentController