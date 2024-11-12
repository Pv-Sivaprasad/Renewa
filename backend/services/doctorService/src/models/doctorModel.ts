import mongoose , {Document,Schema} from "mongoose";

export interface IDoctor extends Document {
    username:string,
    email:string,
    password:string,
    image:string,
    experience:number,
    speciality:string,
    isVerified:boolean,
    isBlocked:boolean,
}

const DoctorSchema : Schema= new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    isVerified: {
        type: Boolean,
        default: false, 
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    experience:{
        type:Number,
        
    },
    speciality:{
        type:String
    }

})


export default mongoose.model<IDoctor>('Doctor',DoctorSchema)