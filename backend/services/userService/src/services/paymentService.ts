import { UserPaymentRepository } from "../repositories/implementations/userPaymentRespository";


const userPaymentRepository = new UserPaymentRepository()


export class PaymentService {

    async createPaymentIntent(data:any){
        console.log('entering create payment in the payment service');
        
        const slot=await userPaymentRepository.createPayment(data)
     
    }
}