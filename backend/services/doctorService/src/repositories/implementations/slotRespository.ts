import { ISlotRepository } from "../interfaces/ISlotRepository";
import { DocSlotDto } from "../../dto/slotDto";
import SlotModel from "../../models/slotModel";


export class SlotRepository implements ISlotRepository{

    async createSlot(slotDto: DocSlotDto): Promise<any> {
        const newSlot=new SlotModel(slotDto)
        return newSlot.save()
    }

}