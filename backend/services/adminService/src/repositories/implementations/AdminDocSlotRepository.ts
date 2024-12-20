import { UserDataDto } from "../../dto/authDto";
import { SlotDTO } from "../../dto/slotDto";
import { IAdminDocSlotRepository } from "../interfaces/IAdminDocSlotRepository";
import { AdminDocSlotModel } from "../../models/slotModel";



export class AdminDocSlotRepository implements IAdminDocSlotRepository {

    async saveDocSlot(slotData: SlotDTO): Promise<any> {
        console.log('the slot dto in the doc slot admin side is',slotData);
        
        const docId = slotData.docId;
        const dates = slotData.dates || []; 
        const docName=slotData.docName
    
        console.log('The slot data is:', JSON.stringify(slotData, null, 2));
        console.log('docId:', docId, 'dates:', dates);
        console.log('docName',docName);
        
        
        
        if (!Array.isArray(dates)) {
            throw new Error(`Invalid dates value. Expected an array, got: ${typeof dates}`);
        }
    

        for(const dateObj of dates){
            
            console.log('Processing dateObj:', dateObj);
            
            const {date,slots}=dateObj

            const exisitingRecord=await AdminDocSlotModel.findOne({
                docId,
                'dates.date':date
            })
            console.log('ertyui',exisitingRecord);
            if (exisitingRecord) {
                
                console.log('Updating existing record for date:', date);
                await AdminDocSlotModel.updateOne(
                    { docId, 'dates.date': date },
                    { 
                        $set: { 
                            docName,
                            'dates.$.slots': slots 
                        } 
                    } 
                );
            } else {
              
                console.log('No record found for date:', date, '- Creating a new one.');
                // await AdminDocSlotModel.updateOne(
                //     { docId },
                //     { $push: { dates: { date, slots } } },
                //     { upsert: true } 
                // );
                await AdminDocSlotModel.updateOne(
                    { docId },
                    {
                        $set: { docName }, 
                        $push: { dates: { date, slots } },
                    },
                    { upsert: true }
                );
            }
        }
        console.log('SaveDocSlot completed successfully.');

    }

    async getDocSlot(docId: string): Promise<any> {
        console.log('entering the getDocslot in repo for checking');
        
        let result= await AdminDocSlotModel.findOne({docId})
        console.log('the result is',result);
        return result
        
    }

}