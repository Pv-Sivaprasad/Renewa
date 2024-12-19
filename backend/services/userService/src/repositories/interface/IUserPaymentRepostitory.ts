import { SlotDTO } from "../../dto/slotDto";


export interface IUserPaymentRepository{
     createPayment(data:SlotDTO):Promise<void>
}