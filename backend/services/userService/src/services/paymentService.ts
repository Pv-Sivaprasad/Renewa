import { UserPaymentRepository } from "../repositories/implementations/userPaymentRespository";
import { PaymentDto } from "../dto/paymentDto";
import stripe from "../utils/stripeUtil";


const userPaymentRepository = new UserPaymentRepository()


export class PaymentService {

    async createPaymentIntent(paymentDto:PaymentDto){
        console.log('entering create payment in the payment service');
        console.log('the data in the service is',paymentDto);
        const amount=paymentDto.amount
        const slotId=paymentDto.slot.slotId
        const docId=paymentDto.docId
        const userId=paymentDto.userId
        const paymentIntent=await stripe.paymentIntents.create({
            amount:amount,
            currency:'usd',
            metadata:{userId,docId,slotId}
        })

        const paymentData={
            userId,
            doctorId:docId,
            slotId,
            amount,
            paymentIntentId:paymentIntent.id,
            paymentStatus:'pending'
        }
        const payment=await userPaymentRepository.createPayment(paymentData)

        return { clientSecret: paymentIntent.client_secret, payment };
    }
}