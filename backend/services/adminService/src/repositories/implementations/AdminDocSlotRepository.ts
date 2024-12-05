import { UserDataDto } from "../../dto/authDto";
import { SlotDTO } from "../../dto/slotDto";
import { IAdminDocSlotRepository } from "../interfaces/IAdminDocSlotRepository";
import { AdminSlotModel } from "../../models/slotModel";



export class AdminDocSlotRepository implements IAdminDocSlotRepository {

    async saveDocSlot(slotData: SlotDTO): Promise<any> {
        
        const {docId,dates}=slotData
        console.log('the slot data is ',slotData);
        console.log('docId,dates',docId,dates);
        
        for(const dateObj of dates){
            console.log('dateObj',dateObj);
            
            const {date,slots}=dateObj

            const exisitingRecord=await AdminSlotModel.findOne({
                docId,
                'dates.date':date
            })
            console.log('ertyui',exisitingRecord);
            if(exisitingRecord){

            }else{
                await AdminSlotModel.updateOne(
                    { docId },
                    { $push: { dates: { date, slots } } },
                    { upsert: true }
                );
            }
        }
        

    }

}