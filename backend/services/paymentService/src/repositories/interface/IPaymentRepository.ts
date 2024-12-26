import { IBaseRepository } from "./IBaseRepository";
import { IPayment } from "../../models/paymentModel";


export interface IPaymentRepository extends IBaseRepository<IPayment>{

    findOne(id:string): Promise<void>

}