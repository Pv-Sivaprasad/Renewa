import Payment,{IPayment} from "../../models/paymentModel";
import { IPaymentRepository } from "../interface/IPaymentRepository";
import { IBaseRepository } from "../interface/IBaseRepository";
import BaseRepository from "./BaseRepository";
import { FilterQuery } from "mongoose";



export class PaymentRepository extends BaseRepository<IPayment> implements IPaymentRepository{
  
    constructor(){
        super(Payment)
    }

    async updatePaymentStatus(sessionId: string): Promise<IPayment | null> {
        try {
            const response = await Payment.findOneAndUpdate(
                { stripeSessionId: sessionId },
                { status: 'success' },
                { new: true }
            );
            // console.log(response,'_+_++++++++++++++_+_+_+_+_+_+_+_+_+_+_');
            
            return response;
        } catch (error) {
            console.log('error updating payment status', error);
            return null;
        }
    }

    // async findData(id: string) :Promise<IPayment[]> {

    //     try {
    //             const response=await Payment.findOne({id})
    //             if(response){

    //                 return response
    //             }
    //     } catch (error) {
    //         console.log('error in findign',error);
            
    //     }
    // }

    async getUserPayments(userId: string): Promise<IPayment[]> {
        return await Payment.find({ userId }).select("date status amount").sort({date:-1});

    }
   
}