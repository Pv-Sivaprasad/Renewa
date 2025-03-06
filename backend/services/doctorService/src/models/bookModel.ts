import mongoose,{Schema,Document} from "mongoose";

export interface IUserBooking{
    
    userId:string,
    userName:string,
    date:string,
    startTime:string
}

export interface IDoctorBooking extends Document{
    docId:string,
    bookings:IUserBooking[]
}


const DoctorBookingSchema = new Schema<IDoctorBooking>(
    {
      docId: 
      { 
        type: String,
         required: true, 
         unique: true 
        },

      bookings: [
        {
          userId: 
          { 
            type: String, 
            required: true 
          },
          userName: 
          { 
            type: String, 
            required: true 
        },

          date: 
          { 
            type: String, 
            required: true 
         },
          startTime: 
          { 
            type: String, 
            required: true 
          },
        },
      ],
    },
    { timestamps: true }
  );

  export const DoctorBookingModel=mongoose.model<IDoctorBooking>('DocBooking',DoctorBookingSchema)