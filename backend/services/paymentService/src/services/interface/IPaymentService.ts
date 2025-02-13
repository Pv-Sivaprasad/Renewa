import Stripe from 'stripe'

import { PaymentDataDto,PaymentServiceDto } from '../../dto/paymentDto'
import { IPayment } from '../../models/paymentModel'


export interface IPaymentService{

    createSession(paymentDataDto:PaymentDataDto):Promise<PaymentServiceDto>
    // webhookHandleSave(event: Stripe.Event): Promise<null>;
    allPaymentData(id:string):Promise<void>
    getUserPayments(id:String):Promise<IPayment[]>
}

