import { SlotDTO } from "../../dto/slotDto";
import { DocSlot } from "../../models/slotModel";

export interface IUserDocSlotRepository{
    saveDocSlot(data:SlotDTO): Promise<void>
    getDocSlotData(docId:string):Promise<SlotDTO>
}