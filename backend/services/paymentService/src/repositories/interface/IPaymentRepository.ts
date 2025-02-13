import { IBaseRepository } from "./IBaseRepository";
import { IPayment } from "../../models/paymentModel";
import { FilterQuery } from "mongoose";

export interface IPaymentRepository extends IBaseRepository<IPayment>{

    // findOne(id:string): Promise<void>
    // findData(id:string):Promise<IPayment[]>
    getUserPayments(userId: string): Promise<IPayment[]>;
    // findOneAndUpdate(filter: FilterQuery<IPayment>, data: Partial<IPayment>): Promise<IPayment | null>;
    updatePaymentStatus(sessionId: string): Promise<IPayment | null>;

}