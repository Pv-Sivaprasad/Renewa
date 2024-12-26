import {  IDocSlot } from "../../models/slotModel";


export interface IDocSlotRepository{
   
    getSlotByDocId(docId: string): Promise<IDocSlot | null>;
    upsert(slotData: IDocSlot): Promise<IDocSlot>;
}