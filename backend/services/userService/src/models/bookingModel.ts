import mongoose,{Schema,Document} from "mongoose";

interface Booking{
    docId:string,
    date:string,
    startTime:string
}


export interface IUserBooking extends Document{
    userId:string,
    bookings:Booking[]
}

const BookingSchema = new Schema<Booking>({
    docId:
     { 
        type: String, 
        required: true 
    },
    date: 
    { type: String, 
        required: true 
    },
    startTime: 
    { type: String, 
        required: true 
    },
  });
  
  const UserBookingSchema = new Schema<IUserBooking>({
    userId:
     { 
        type: String, 
        required: true, 
        unique: true 
    },
    bookings: [BookingSchema], 
  });
  
  const UserBookingModel = mongoose.model<IUserBooking>("UserBooking", UserBookingSchema);
  
  export default UserBookingModel;