import { UserDataDto } from "../../dto/authDto";
import { IDoctorWithSlots, SlotDTO } from "../../dto/slotDto";
import { IAdminDocSlotRepository } from "../interfaces/IAdminDocSlotRepository";
import { AdminDocSlotModel } from "../../models/slotModel";
import mongoose from "mongoose";


export class AdminDocSlotRepository implements IAdminDocSlotRepository {
   
   

    async saveDocSlot(slotData: SlotDTO): Promise<void> {
        
        
        const docId = slotData.docId;
        const dates = slotData.dates || []; 
        const docName=slotData.docName
        const consultationFee=slotData.consultationFee
        // console.log('The slot data is:', JSON.stringify(slotData, null, 2));
        // console.log('docId:', docId, 'dates:', dates);
        // console.log('docName',docName);
         // console.log('fee',consultationFee);
        
        
        
        if (!Array.isArray(dates)) {
            throw new Error(`Invalid dates value. Expected an array, got: ${typeof dates}`);
        }
    

        for(const dateObj of dates){
            
            // console.log('Processing dateObj:', dateObj);
            
            const {date,slots}=dateObj

            const exisitingRecord=await AdminDocSlotModel.findOne({
                docId,
                'dates.date':date
            })
            // console.log('ertyui',exisitingRecord);
            if (exisitingRecord) {
                
                // console.log('Updating existing record for date:', date);
                await AdminDocSlotModel.updateOne(
                    { docId,'dates.date': date },
                    { 
                        $set: { 
                            docName,
                            'dates.$.slots': slots 
                        } 
                    } 
                );
            } else {
             
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