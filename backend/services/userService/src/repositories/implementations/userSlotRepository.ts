
import { DocSlotDto, SlotDTO, UpdateSlotDto } from "../../dto/slotDto";
import { IUserDocSlotRepository } from "../interface/IUserDocSlotRepository";
import DocSlotModel,{ DateSlot, DocSlot } from "../../models/slotModel";
import mongoose from "mongoose";
import UserBookingModel from "../../models/bookingModel";
import doctorModel from "../../models/doctorModel";
import { userBookData } from "../../events/publishers/bookDataToDocPublisher";

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

        // console.log('the update data in the repository is ',updateData);

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
              if (!result) {
                return { success: false, message: "No matching slot found", data: null };
              }
              const bookingUpdate=await UserBookingModel.findOneAndUpdate(
                {userId},
                {
                  $setOnInsert:{userId},
                  $push:{
                    bookings:{
                      docId,
                      date,
                      startTime
                    }
                  }
                },
                {upsert:true,new:true}
              )
              const sendData={
                docId,userId,date,startTime
              }
              // console.log('the data for sending to the docService is ',sendData);
              await userBookData(sendData)
              
              
                return { success: true, message: "Successful", data: bookingUpdate };

             
        } catch (error) {
            console.log('error in the rpos of ',error);
            return { success: false, message: "Error updating slot availability", data: null };
        }
           
        
    }


    async getUserBookings(userId:string){

      try {
        
        const userBooking=await UserBookingModel.findOne({userId})
        // console.log('the userbooking data is',userBooking);

        if(!userBooking){
          return { success: false, message: "No bookings found for this user", data: [] };
        }
        
        const bookingsWithDoctorDetails = await Promise.all(
          userBooking.bookings.map(async (booking) => {
            const doctor = await DocSlotModel.findOne({ docId: booking.docId });
            const docData= await doctorModel.findOne({docId:booking.docId})
            // console.log('the docData in the userSlot is',docData);
            
            // console.log(doctor,'in the repos is /*/*/*/');
            
            let data= {
              docId: booking.docId,  
              doctorName: doctor?.docName || "Unknown Doctor",
              specialization: docData?.speciality || "Not specified",
              image:docData?.image,
              date: booking.date,
              time: booking.startTime,
              amount: doctor?.consultationFee || 0,
              // status: "Completed", 
            };
          // console.log('the *//*/*/*/*/*/*/*/*/*',data);
          
            return data
          })
        );
  // console.log('the booking details with doctor is the',bookingsWithDoctorDetails);
    return bookingsWithDoctorDetails
        
      } catch (error) {
        console.log('error in the booking userslot repo checking ',error);
        
      }

    }


}