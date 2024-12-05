import { SlotDTO } from "../../dto/slotDto";

export interface IUserDocSlotRepository{
    saveDocSlot(data:SlotDTO): Promise<void>
    getDocSlotData(docId:string):Promise<void>
}