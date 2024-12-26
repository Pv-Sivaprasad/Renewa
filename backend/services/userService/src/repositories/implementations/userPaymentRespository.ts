import { PaymentDto,PaymentDataDto } from '../../dto/paymentDto';
import UserPayment from '../../models/paymentModel'
import { UserDocSlotModel } from '../../models/slotModel'
import { IUserPaymentRepository } from '../interface/IUserPaymentRepostitory'
import { SlotDTO } from '../../dto/slotDto';

export class UserPaymentRepository implements IUserPaymentRepository {
    
    async createPayment(paymentData:PaymentDataDto):Promise<any> {
        console.log('inside the create payment in user payment repo',paymentData);
        try {
            
            let bookedData= await UserPayment.create(paymentData)
            console.log('booked data is ',bookedData);
            return bookedData
        } catch (error) {
            console.log('error',error);
            
        }
        
    }
}

