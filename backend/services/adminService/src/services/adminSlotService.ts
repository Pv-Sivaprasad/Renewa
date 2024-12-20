import { AdminDocSlotRepository } from "../repositories/implementations/AdminDocSlotRepository"


class AdminSlotService{

    private adminDocSlotRepository: AdminDocSlotRepository

    constructor(){
        this.adminDocSlotRepository= new AdminDocSlotRepository()
    }

async getDocSlots(id:string){
    return await this.adminDocSlotRepository.getDocSlot(id)
}

}


export default AdminSlotService