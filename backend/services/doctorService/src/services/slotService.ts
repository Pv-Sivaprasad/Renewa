import { DocSlotDto } from "../dto/slotDto";
import { SlotRepository } from "../repositories/implementations/slotRespository";
import slotModel from "../models/slotModel";


export class SlotService{

    private slotRepository : SlotRepository

    constructor(){
        this.slotRepository= new SlotRepository()
    }

    async getSlotsByDocId(docId:string,date:string){
        console.log('entering the get slots of doc in the slot service');
        
        try {

            let slots= await this.slotRepository.getSlotsByDoctorId(docId,date)
            console.log('the slots of doc is',slots);
            return slots
        } catch (error) {
           console.log('error in the getslotsbydocid',error);
            
        }
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