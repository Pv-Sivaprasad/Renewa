
import { DocSlotDto, SlotDTO } from "../../dto/slotDto";
import { IUserDocSlotRepository } from "../interface/IUserDocSlotRepository";
import DocSlotModel,{ DateSlot, DocSlot } from "../../models/slotModel";
import mongoose from "mongoose";

export class UserDocSlotRepository implements IUserDocSlotRepository {

    
    
    // async saveDocSlot(slotData: SlotDTO): Promise<any> {
    //     const { docId, dates = [], consultationFee } = slotData;
    
    //     if (!Array.isArray(dates)) {
    //         throw new Error(`Invalid dates value. Expected an array, got: ${typeof dates}`);
    //     }
    
       
    //     await UserDocSlotModel.updateOne(
    //         { docId },
    //         { $set: { consultationFee } }, 
    //         { upsert: true }
    //     );
    
    //     for (const dateObj of dates) {
    //         const { date, slots } = dateObj;
    
    //         const existingRecord = await UserDocSlotModel.findOne({
    //             docId,
    //             'dates.date': date,
    //         });
    
    //         if (existingRecord) {
               
    //             await UserDocSlotModel.updateOne(
    //                 { docId, 'dates.date': date },
    //                 {
    //                     $set: {
    //                         'dates.$.slots': slots,
    //                         consultationFee, 
    //                     },
    //                 }
    //             );
    //         } else {
               
    //             await UserDocSlotModel.updateOne(
    //                 { docId },
    //                 {
    //                     $push: {
    //                         dates: { date, slots },
    //                     },
    //                     $set: { consultationFee }, 
    //                 },
    //                 { upsert: true }
    //             );
    //         }
    //     }
    
       
    // }
    
    // async saveDocSlot(slotData: SlotDTO): Promise<any> {
    //     const { docId, dates = [], consultationFee } = slotData;
    
    //     if (!docId) {
    //         throw new Error('docId cannot be null or undefined');
    //     }
    
    //     if (!Array.isArray(dates)) {
    //         throw new Error(`Invalid dates value. Expected an array, got: ${typeof dates}`);
    //     }
    
    //     // Ensure docId and consultationFee are updated or created
    //     await UserDocSlotModel.updateOne(
    //         { docId }, // Match the document by docId
    //         {
    //             $set: { consultationFee }, // Always update consultation fee
    //             $setOnInsert: { docId }, // Prevent null docId if document is created
    //         },
    //         { upsert: true }
    //     );
    
    //     // Process each date and its slots
    //     for (const dateObj of dates) {
    //         const { date, slots } = dateObj;
    
    //         const result = await UserDocSlotModel.updateOne(
    //             { docId, 'dates.date': date }, // Match by docId and date
    //             {
    //                 $set: {
    //                     'dates.$.slots': slots, // Update slots for the existing date
    //                     consultationFee, // Update consultation fee
    //                 },
    //             }
    //         );
    
    //         // If the date doesn't exist, add it
    //         if (result.matchedCount === 0) {
    //             await UserDocSlotModel.updateOne(
    //                 { docId }, // Match by docId
    //                 {
    //                     $push: {
    //                         dates: { date, slots }, // Push a new date object with slots
    //                     },
    //                 },
    //                 { upsert: true }
    //             );
    //         }
    //     }
    // }



    // async saveDocSlot(slotData: SlotDTO): Promise<any> {
    //     const { docId, dates = [], consultationFee } = slotData;
    
    //     if (!Array.isArray(dates)) {
    //         throw new Error(`Invalid dates value. Expected an array, got: ${typeof dates}`);
    //     }
    
       
    //     await UserDocSlotModel.updateOne(
    //         { docId },
    //         { $set: { consultationFee } }, 
    //         { upsert: true }
    //     );
    
    //     for (const dateObj of dates) {
    //         const { date, slots } = dateObj;
    
    //         const existingRecord = await UserDocSlotModel.findOne({
    //             docId,
    //             'dates.date': date,
    //         });
    
    //         if (existingRecord) {
               
    //             await UserDocSlotModel.updateOne(
    //                 { docId, 'dates.date': date },
    //                 {
    //                     $set: {
    //                         'dates.$.slots': slots,
    //                         consultationFee, 
    //                     },
    //                 }
    //             );
    //         } else {
               
    //             await UserDocSlotModel.updateOne(
    //                 { docId },
    //                 {
    //                     $push: {
    //                         dates: { date, slots },
    //                     },
    //                     $set: { consultationFee }, 
    //                 },
    //                 { upsert: true }
    //             );
    //         }
    //     }
    
       
    // }
    

    // async saveDocSlot(slotData: SlotDTO): Promise<any> {
    //     const { docId, dates = [], consultationFee } = slotData;
    
    //     if (!Array.isArray(dates)) {
    //         throw new Error(`Invalid dates value. Expected an array, got: ${typeof dates}`);
    //     }
    
    //     // Create the base document with docId and consultationFee
    //     const baseUpdate = {
    //         docId,
    //         consultationFee
    //     };
    
    //     for (const dateObj of dates) {
    //         const { date, slots } = dateObj;
    
    //         // Transform slots to include their _id if present
    //         const transformedSlots = slots.map(slot => {
    //             const { _id, startTime, endTime, isAvailable } = slot;
    //             return {
    //                 _id: _id || new mongoose.Types.ObjectId(), // Use existing _id or create new
    //                 startTime,
    //                 endTime,
    //                 isAvailable
    //             };
    //         });
    
    //         const existingRecord = await UserDocSlotModel.findOne({
    //             docId,
    //             'dates.date': date
    //         });
    
    //         if (existingRecord) {
    //             // Update existing date entry
    //             await UserDocSlotModel.updateOne(
    //                 { docId, 'dates.date': date },
    //                 {
    //                     $set: {
    //                         'dates.$.slots': transformedSlots,
    //                         consultationFee
    //                     }
    //                 }
    //             );
    //         } else {
    //             // Add new date entry
    //             await UserDocSlotModel.updateOne(
    //                 { docId },
    //                 {
    //                     $push: {
    //                         dates: {
    //                             date,
    //                             slots: transformedSlots
    //                         }
    //                     },
    //                     $set: { consultationFee }
    //                 },
    //                 { upsert: true }
    //             );
    //         }
    //     }
    
    //     // Return the updated document
    //     return await UserDocSlotModel.findOne({ docId });
    // }

    // async  saveDocSlot(slotData: any): Promise<any> {
    //     const { docId, dates = [], consultationFee } = slotData;
    
    //     if (!docId) {
    //         throw new Error('docId cannot be null or undefined');
    //     }
    
    //     if (!Array.isArray(dates)) {
    //         throw new Error(`Invalid dates value. Expected an array, got: ${typeof dates}`);
    //     }
    
    //     // Preserve original IDs while updating
    //     const processedDates = dates.map(dateObj => ({
    //         ...dateObj,
    //         _id: dateObj._id, // Preserve date _id
    //         slots: dateObj.slots.map((slot: { _id: any; }) => ({
    //             ...slot,
    //             _id: slot._id // Preserve slot _id
    //         }))
    //     }));
    
    //     // Update or insert the document
    //     return await UserDocSlotModel.findOneAndUpdate(
    //         { docId },
    //         {
    //             $set: {
    //                 consultationFee,
    //                 dates: processedDates
    //             }
    //         },
    //         {
    //             upsert: true,
    //             new: true,
    //             runValidators: true
    //         }
    //     );
    // }
    
    async saveDocSlot(docSlotDto: DocSlotDto): Promise<DocSlot> {
        try {
           
          console.log('save doc slot,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
          
          const { docId, dates, docName, consultationFee } = docSlotDto;
          console.log(
            `docId: ${docId}, dates: ${JSON.stringify(
              dates
            )}, docName: ${docName}, consultationFee: ${consultationFee}`
          );
      
          const exisit=await DocSlotModel.findOne({docId})
          if(exisit){
            
          }
          // Update doctor document
          const updatedDoc = await DocSlotModel.findOneAndUpdate(
            { docId },
            {
              $set: { docName, consultationFee }, // Ensure consultationFee is included
              $setOnInsert: { docId },
            },
            { upsert: true, new: true }
          );
      
          for (const dateSlot of dates) {
            const existingDate = updatedDoc.dates.find(
              (d: DateSlot) => d.date === dateSlot.date
            );
      
            if (existingDate) {
              // Add new slots without duplicating
              const newSlots = dateSlot.slots.filter(
                (newSlot) =>
                  !existingDate.slots.some(
                    (existingSlot: { startTime: string; endTime: string; }) =>
                      existingSlot.startTime === newSlot.startTime &&
                      existingSlot.endTime === newSlot.endTime
                  )
              );
              existingDate.slots.push(...newSlots);
            } else {
              // Add new dateSlot entry
              updatedDoc.dates.push(dateSlot);
            }
          }
      
          await updatedDoc.save();
          console.log('Updated Doc:', updatedDoc);
          return updatedDoc;
        } catch (error) {
          console.error('Error upserting slots:', error);
          throw error;
        }
      }
    async getDocSlotData(docId:string):Promise<any>{
       return  await DocSlotModel.findOne({docId})
    }
    


}