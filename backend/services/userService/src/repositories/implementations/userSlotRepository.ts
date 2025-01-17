
import { DocSlotDto, SlotDTO } from "../../dto/slotDto";
import { IUserDocSlotRepository } from "../interface/IUserDocSlotRepository";
import DocSlotModel,{ DateSlot, DocSlot } from "../../models/slotModel";
import mongoose from "mongoose";

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
    


}