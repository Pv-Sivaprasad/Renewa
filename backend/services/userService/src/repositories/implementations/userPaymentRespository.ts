import { PaymentDto,PaymentDataDto } from '../../dto/paymentDto';
import UserPayment from '../../models/paymentModel'
// import { UserDocSlotModel } from '../../models/slotModel'
import { IUserPaymentRepository } from '../interface/IUserPaymentRepostitory'
import { SlotDTO } from '../../dto/slotDto';

export class UserPaymentRepository implements IUserPaymentRepository {
    
    async createPayment(paymentData:PaymentDataDto):Promise<any> {
        try {
            
            let bookedData= await UserPayment.create(paymentData)
            return bookedData
        } catch (error) {
            console.log('error',error);
            
        }
        
    }
}

