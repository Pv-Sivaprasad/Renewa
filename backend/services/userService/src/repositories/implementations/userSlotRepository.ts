
import { SlotDTO } from "../../dto/slotDto";
import { IUserDocSlotRepository } from "../interface/IUserDocSlotRepository";
import { UserDocSlotModel } from "../../models/slotModel";

export class UserDocSlotRepository implements IUserDocSlotRepository {

    
    // async saveDocSlot(slotData: SlotDTO): Promise<any> {
    //     const docId = slotData.docId;
    //     const dates = slotData.dates || []; 
    //     const consultationFee=slotData.consultationFee
    //     // console.log('The slot data is:', JSON.stringify(slotData, null, 2));
    //     // console.log('docId:', docId, 'dates:', dates);
    
    //     if (!Array.isArray(dates)) {
    //         throw new Error(`Invalid dates value. Expected an array, got: ${typeof dates}`);
    //     }
    
    //     for (const dateObj of dates) {
    //         // console.log('Processing dateObj:', dateObj);
    
    //         const { date, slots } = dateObj;
    
    //         const existingRecord = await UserDocSlotModel.findOne({
    //             docId,
    //             'dates.date': date,
    //         });
    
    //         if (existingRecord) {
    //             // Update the specific date's slots if the record exists
    //             // console.log('Updating existing record for date:', date);
                
    //             await UserDocSlotModel.updateOne(
    //                 { docId, 'dates.date': date },
    //                 { $set: { 'dates.$.slots': slots } } // Update the slots for the matched date
    //             );
    //         } else {
    //             // Push a new date and slots if no matching record exists
    //             console.log('No record found for date:', date, '- Creating a new one.');
    //             await UserDocSlotModel.updateOne(
    //                 { docId },
    //                 { $push: { dates: { date, slots } } },
    //                 { upsert: true } // Create doc if it doesn't exist
    //             );
    //         }
    //     }
    //     console.log('SaveDocSlot completed successfully.');
    // }
    async saveDocSlot(slotData: SlotDTO): Promise<any> {
        const { docId, dates = [], consultationFee } = slotData;
    
        if (!Array.isArray(dates)) {
            throw new Error(`Invalid dates value. Expected an array, got: ${typeof dates}`);
        }
    
       
        await UserDocSlotModel.updateOne(
            { docId },
            { $set: { consultationFee } }, 
            { upsert: true }
        );
    
        for (const dateObj of dates) {
            const { date, slots } = dateObj;
    
            const existingRecord = await UserDocSlotModel.findOne({
                docId,
                'dates.date': date,
            });
    
            if (existingRecord) {
               
                await UserDocSlotModel.updateOne(
                    { docId, 'dates.date': date },
                    {
                        $set: {
                            'dates.$.slots': slots,
                            consultationFee, 
                        },
                    }
                );
            } else {
               
                await UserDocSlotModel.updateOne(
                    { docId },
                    {
                        $push: {
                            dates: { date, slots },
                        },
                        $set: { consultationFee }, 
                    },
                    { upsert: true }
                );
            }
        }
    
        console.log('SaveDocSlot completed successfully with consultationFee:', consultationFee);
    }
    
    async getDocSlotData(docId:string):Promise<any>{
       return  await UserDocSlotModel.findOne({docId})
    }
    


}