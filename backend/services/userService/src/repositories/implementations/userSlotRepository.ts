
import { SlotDTO } from "../../dto/slotDto";
import { IUserDocSlotRepository } from "../interface/IUserDocSlotRepository";
import { UserDocSlotModel } from "../../models/slotModel";

export class UserDocSlotRepository implements IUserDocSlotRepository {

    async saveDocSlot(slotData: SlotDTO): Promise<any> {
        
        const {docId,dates}=slotData
        console.log('the slot data is ',slotData);
        console.log('docId,dates',docId,dates);
        
        for(const dateObj of dates){
            console.log('dateObj',dateObj);
            
            const {date,slots}=dateObj

            const exisitingRecord=await UserDocSlotModel.findOne({
                docId,
                'dates.date':date
            })
            console.log('ertyui',exisitingRecord);
            if(exisitingRecord){

            }else{
                await UserDocSlotModel.updateOne(
                    { docId },
                    { $push: { dates: { date, slots } } },
                    { upsert: true }
                );
            }
        }
        

    }

}