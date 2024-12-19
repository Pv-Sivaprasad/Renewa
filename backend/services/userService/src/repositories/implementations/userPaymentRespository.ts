import { SlotDTO } from '../../dto/slotDto'
import UserPayment from '../../models/paymentModel'
import { UserDocSlotModel } from '../../models/slotModel'
import { IUserPaymentRepository } from '../interface/IUserPaymentRepostitory'


export class UserPaymentRepository implements IUserPaymentRepository {
    
    async createPayment(paymentData:SlotDTO):Promise<any> {
        console.log('inside the create payment in user payment repo');
        
        let bookedData= await UserPayment.create(paymentData)
        console.log('booked data is ',bookedData);
        return bookedData
        
    }
}

