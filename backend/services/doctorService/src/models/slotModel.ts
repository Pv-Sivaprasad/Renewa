import mongoose, {Schema,Document} from 'mongoose'

export interface DoctorSlot extends Document{
    date:string;
    startTime:string;
    endTime:string,
    isAvailable:boolean
}

const SlotSchema : Schema= new Schema({
    date:{
        type:String,
        required:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    },
    isAvailable:{
        type:Boolean,
        default:true
    }
})


export default mongoose.model<DoctorSlot>('DocSlot',SlotSchema)