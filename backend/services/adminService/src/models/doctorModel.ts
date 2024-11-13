import mongoose ,{Schema,Document} from 'mongoose'


export interface IAdminDoctor extends Document {
    docId:string,
    docname:string,
    email:string,
    speciality:string;
    isBlocked:boolean
}


const AdminDoctorSchema : Schema = new Schema({
    
    docId:{
        type:String,
        required:true
    },
    docname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    speciality:{
        type:String,
        required:true
    },
    isBlocked:{
        type:String,
        default:false
    }
})

export default mongoose.model<IAdminDoctor>('AdminDoctor',AdminDoctorSchema)