import { DocSlotDto } from "../dto/slotDto";
import { SlotRepository } from "../repositories/implementations/slotRespository";
import slotModel from "../models/slotModel";
import { ISlotRepository } from "../repositories/interfaces/ISlotRepository";


export class SlotService {

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
            console.log('enterd the slot service',docSlotDto);

        let data= await this.slotRepository.upsertSlots(docSlotDto)
        console.log('the data is ','{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}');
        
            return data
            
        } catch (error) {
            console.log('error in upperslots in slotservice',error);
            
        }
    }

    async editSlots(date:string,docSlotDto:DocSlotDto)  {
        console.log('the date ',date,'the docSLotDot',docSlotDto);
        
        try {
            if (!date || !docSlotDto) {
                throw new Error('Date and valid slots array are required');
              }
            console.log('entered the slot service for editing the slots ');
            return await this.slotRepository.editDocSlots(date,docSlotDto)
            
        } catch (error) {
            console.log('error in editing the slot',error);
            
        }
    }

    async updateSlots(docId:string,date:string,updatedSlot:any){
        const result=await this.slotRepository.updatingSlots(docId,date,updatedSlot)
    }

}