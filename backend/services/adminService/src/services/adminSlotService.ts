import { AdminDocSlotRepository } from "../repositories/implementations/AdminDocSlotRepository"
import { IAdminDocSlotRepository } from "../repositories/interfaces/IAdminDocSlotRepository"

class AdminSlotService{

    private adminDocSlotRepository: IAdminDocSlotRepository

    constructor(adminDocSlotRepository:IAdminDocSlotRepository){
        this.adminDocSlotRepository =adminDocSlotRepository
    }

async getDocSlots(id:string){
    return await this.adminDocSlotRepository.getDocSlot(id)
}

}


export default AdminSlotService