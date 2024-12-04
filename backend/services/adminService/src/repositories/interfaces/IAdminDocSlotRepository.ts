import { SlotDTO } from "../../dto/slotDto";


export interface IAdminDocSlotRepository{
    saveDocSlot(data:SlotDTO) : Promise<void>
}