import { IDocSlot } from "../../models/slotModel";


export interface IDocSlotService {
    
  
    upsertSlot(slotData: IDocSlot): Promise<IDocSlot>;
    findSlotByDocId(docId: string): Promise<IDocSlot | null>;
}