import { UserDocSlotRepository } from "../repositories/implementations/userSlotRepository";
import { UserDocSlotModel } from "../models/slotModel";





export class DocSlotService{

    private userDocSlotRepository : UserDocSlotRepository

    constructor(){
        this.userDocSlotRepository = new UserDocSlotRepository()
    }


    async docSlotsById(docId:string){
        console.log('entering the doslot by id in doc slot service');
        try {
            let data=await this.userDocSlotRepository.getDocSlotData(docId)
            console.log('the data in service is',data);
            return data
        } catch (error) {
            console.log('error int he doc lot in doc slot service',error);
            
        }
        

    }
}