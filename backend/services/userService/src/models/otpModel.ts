import mongoose,{Document,Schema} from "mongoose";
import IOtp from "../interfaces/Iotp";


const OtpSchema: Schema = new Schema({
    email: { 
        type: String,
         required: true
    },
    otp: { 
        type: String,
         required: true
    },
    createdAt: {
         type: Date,
          default: Date.now,
           expires: '2m'
    } 
});

const Otp=mongoose.model<IOtp>('Otp',OtpSchema)
export default Otp