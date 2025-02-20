import { PaymentDataDto } from "../../dto/paymentDto";


export interface IUserPaymentRepository{
     createPayment(data:PaymentDataDto):Promise<void>
}