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
            const { docId, slotId } = req.body
            console.log(`docId ${docId}, slotId ${slotId} in payment controller `)

            const data = {
                docId,
                slotId
            }

            const response = await this.paymentService.createSession(data)

        } catch (error) {
            console.error('ERror founded in create session  paymenservice', error);
            next(error)
        }
    }

}

export default PaymentController