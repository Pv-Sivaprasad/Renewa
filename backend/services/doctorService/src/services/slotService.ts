import { DocSlotDto } from "../dto/slotDto";
import { SlotRepository } from "../repositories/implementations/slotRespository";
import slotModel from "../models/slotModel";


export class SlotService{

    private slotRepository : SlotRepository

    constructor(){
        this.slotRepository= new SlotRepository()
    }


    async upsertSlots(docSlotDto:DocSlotDto){
        try {
            console.log('enterd the slot service');
            return await this.slotRepository.upsertSlots(docSlotDto)
            
        } catch (error) {
            console.log('error in upperslots in slotservice',error);
            
        }
    }

}