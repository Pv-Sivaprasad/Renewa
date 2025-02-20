import { IBaseRepository } from "./IBaseRepository";
import { IPayment } from "../../models/paymentModel";
import { FilterQuery } from "mongoose";

export interface IPaymentRepository extends IBaseRepository<IPayment>{

    findOne(id:string): Promise<void>
    // findOneAndUpdate(filter: FilterQuery<IPayment>, data: Partial<IPayment>): Promise<IPayment | null>;
    

}