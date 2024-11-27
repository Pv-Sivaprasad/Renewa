import { DocSlotDto } from "../../dto/slotDto";
import Slot from "../../models/slotModel";


export interface ISlotRepository{
  createSlot(slot: DocSlotDto): Promise<void>;
  // getAvailableSlots(date: string): Promise<any[]>;
  // updateSlotAvailability(id: string, isAvailable: boolean): Promise<void>;
  // getSlotById(id: string): Promise<void | null>;
}