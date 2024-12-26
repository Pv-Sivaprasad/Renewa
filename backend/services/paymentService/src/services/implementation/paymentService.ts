import { IPayment } from "../../models/paymentModel";
import { IPaymentService } from "../interface/IPaymentService";
import Stripe from "stripe";
import { PaymentDataDto, PaymentServiceDto } from "../../dto/paymentDto";
import { PaymentRepository } from "../../repositories/implementation/PaymentRepository";


export class PaymentService implements IPaymentService{
    private stripe:Stripe
    private paymentRepository:PaymentRepository

    constructor(paymentRepository:PaymentRepository){
        
        this.stripe= new Stripe(process.env.STRIPE_SECRET_KEY!)
        this.paymentRepository=paymentRepository
    }

    async createSession(paymentDataDto: PaymentDataDto): Promise<PaymentServiceDto> {

        console.log('payment dto in the service is ');
        
        try {

            return {
                success: true,
                message: "payment session created",
               //  id: session.id 
               }

        } catch (error) {
            console.log('error in create session',error);
            throw error
            
        }
    }
}