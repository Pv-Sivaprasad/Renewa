import { DocSlotDto } from "../../dto/slotDto";
import Slot from "../../models/slotModel";


export interface ISlotRepository{
  
  //for creating 1 slot
  createSlot(slot: DocSlotDto): Promise<void>; 
  
  // for creating multiple slots
  createSlots(slotDtos: DocSlotDto[]): Promise<any>;
  getAvailableSlots(docId: string, date: string): Promise<any>;
  
  // getAvailableSlots(date: string): Promise<any[]>;
  // updateSlotAvailability(id: string, isAvailable: boolean): Promise<void>;
  // getSlotById(id: string): Promise<void | null>;
}