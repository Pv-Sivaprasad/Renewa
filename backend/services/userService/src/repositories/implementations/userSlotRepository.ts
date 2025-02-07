
import { DocSlotDto, SlotDTO, UpdateSlotDto } from "../../dto/slotDto";
import { IUserDocSlotRepository } from "../interface/IUserDocSlotRepository";
import DocSlotModel,{ DateSlot, DocSlot } from "../../models/slotModel";
import mongoose from "mongoose";

// import { UpdateDocData } from "../../dto/userDto";

export class UserDocSlotRepository implements IUserDocSlotRepository {


    async saveDocSlot(slotData: SlotDTO): Promise<void> {
        
        
      const docId = slotData.docId;
      const dates = slotData.dates || []; 
      const docName=slotData.docName
      const consultationFee=slotData.consultationFee
    
    //   console.log('The slot data is:', JSON.stringify(slotData, null, 2));
    //   console.log('docId:', docId, 'dates:', dates);
    //   console.log('docName',docName);
    //    console.log('fee',consultationFee);
      
      
      
      if (!Array.isArray(dates)) {
          throw new Error(`Invalid dates value. Expected an array, got: ${typeof dates}`);
      }
  

      for(const dateObj of dates){
          
          // console.log('Processing dateObj:', dateObj);
          
          const {date,slots}=dateObj

          const exisitingRecord=await DocSlotModel.findOne({
              docId,
              'dates.date':date
          })
          // console.log('ertyui',exisitingRecord);
          if (exisitingRecord) {
              
            //   console.log('Updating existing record for date:', date);
              await DocSlotModel.updateOne(
                  { docId,'dates.date': date },
                  { 
                      $set: { 
                          docName,
                          consultationFee,
                          'dates.$.slots': slots 
                      } 
                  } 
              );
          } else {
           
              await DocSlotModel.updateOne(
                  { docId },
                  {
                      $set: { docName,consultationFee }, 
                      $push: { dates: { date, slots } },
                  },
                  { upsert: true }
              );
          }
      }
      console.log('SaveDocSlot completed successfully.');

  }

    async getDocSlotData(docId:string):Promise<SlotDTO>{
        let result=  await DocSlotModel.findOne({docId})
      
        if (!result) {
            throw new Error(`DocSlot data not found for docId: ${docId}`);
        }
        const slotData: SlotDTO = {
            docId: result.docId,
            docName: result.docName,
            consultationFee: result.consultationFee,
            dates: result.dates.map(date => ({
                date: date.date,
                slots: date.slots.map(slot => ({
                    _id: slot._id,
                    startTime: slot.startTime,
                    endTime: slot.endTime,
                    isAvailable: slot.isAvailable,
                })),
            })),
        };
    
        return slotData;
    }
    
    async updateSlotAvailability(updateData:UpdateSlotDto):Promise<{ success: boolean; message: string; data?: any }>{
        const userId=updateData.userId
        const docId=updateData.docId
        const date=updateData.date
        const startTime=updateData.startTime
        const isAvailable=updateData.isAvailable

        console.log('the update data in the repository is ',updateData);

        try {
            const result = await DocSlotModel.findOneAndUpdate(
                {
                  docId,
                  "dates.date": date,
                  "dates.slots.startTime": startTime,
                },
                {
                  $set: {
                    "dates.$.slots.$[slot].isAvailable": false,
                  },
                },
                {
                  arrayFilters: [{ "slot.startTime": startTime }],
                  new: true,
                }
              );
              if (result) {
                return { success: true, message: "Successful", data: result };
              } else {
                return { success: false, message: "No matching slot found", data: null };
              }
        } catch (error) {
            console.log('error in the rpos of ',error);
            return { success: false, message: "Error updating slot availability", data: null };
        }
           
        
    }


}