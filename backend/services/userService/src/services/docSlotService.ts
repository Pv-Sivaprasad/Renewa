import { UpdateSlotDto } from "../dto/slotDto";
import { UserDocSlotRepository } from "../repositories/implementations/userSlotRepository";





export class DocSlotService{

    private userDocSlotRepository : UserDocSlotRepository

    constructor(){
        this.userDocSlotRepository = new UserDocSlotRepository()
    }


    async docSlotsById(docId:string){
     
        try {
            let data=await this.userDocSlotRepository.getDocSlotData(docId)
            
            return data
        } catch (error) {
            console.log('error int he doc lot in doc slot service',error);
            
        }
        

    }

    async updateSlot(updateData:UpdateSlotDto){
        console.log('the data to be updated is ',updateData);
        let updation= await this.userDocSlotRepository.updateSlotAvailability(updateData)
        console.log('the update is in docslot service is',updation)
        
    }
}