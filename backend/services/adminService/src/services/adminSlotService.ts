import { AdminDocSlotRepository } from "../repositories/implementations/AdminDocSlotRepository"
import { IAdminDocSlotRepository } from "../repositories/interfaces/IAdminDocSlotRepository"
import { SlotDTO } from "../dto/slotDto"



class AdminSlotService implements IAdminDocSlotRepository {

    private adminDocSlotRepository: IAdminDocSlotRepository

    constructor(adminDocSlotRepository: IAdminDocSlotRepository) {
        this.adminDocSlotRepository = adminDocSlotRepository
    }
    saveDocSlot(data: SlotDTO): Promise<void> {
        throw new Error("Method not implemented.")
    }
    getDocSlot(docId: string): Promise<void> {
        throw new Error("Method not implemented.")
    }

    async getDocSlots(id: string) {
        return await this.adminDocSlotRepository.getDocSlot(id)
    }


    upsertSlot=async(slotData:SlotDTO)=>{
        // console.log('reached the upsertSlot in the adminService');

        await this.adminDocSlotRepository.saveDocSlot(slotData)
        
    }

}


export default AdminSlotService