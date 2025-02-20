import Payment,{IPayment} from "../../models/paymentModel";
import { IPaymentRepository } from "../interface/IPaymentRepository";
import { IBaseRepository } from "../interface/IBaseRepository";
import BaseRepository from "./BaseRepository";
import { FilterQuery } from "mongoose";



export class PaymentRepository extends BaseRepository<IPayment> implements IPaymentRepository{

    async findOne(id: string): Promise<void> {

        try {
                const response=await Payment.findOne({id})
                 response
        } catch (error) {
            console.log('error in findign',error);
            
        }
    }

    async findOneAndUpdate(){

    }
}