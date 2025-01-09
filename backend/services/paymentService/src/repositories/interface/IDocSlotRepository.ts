import { UpdateSlotDto } from "../../dto/slotDto";
import {  IDocSlot } from "../../models/slotModel";


export interface IDocSlotRepository{
   
    getSlotByDocId(docId: string): Promise<IDocSlot | null>;
    upsert(slotData: IDocSlot): Promise<IDocSlot>;
    findSlot(slotId:string):Promise<IDocSlot | null>
    updateSlotAvailability(updateData:UpdateSlotDto):Promise<void>
}