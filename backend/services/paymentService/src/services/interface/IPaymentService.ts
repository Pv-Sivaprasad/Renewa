import Stripe from 'stripe'

import { PaymentDataDto,PaymentServiceDto } from '../../dto/paymentDto'


export interface IPaymentService{

    createSession(paymentDataDto:PaymentDataDto):Promise<PaymentServiceDto>
    // webhookHandleSave(event: Stripe.Event): Promise<null>;
}

