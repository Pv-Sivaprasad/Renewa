import mongoose,{Document,Schema} from "mongoose";

export interface IUserDoctor extends Document{
    docId:string ,
    docName:string,
    speciality:string,
    experience:number,
    image:string,
    
}


const UserDoctorSchema : Schema = new Schema({

    docId:{
        type:String,
        
    },
    docName:{
        type:String,
       
    },
    speciality:{
        type:String
    },
    experience:{
        type:Number
    },
    image:{
        type:String
    }

})


export default mongoose.model<IUserDoctor>('UserDoctor',UserDoctorSchema)