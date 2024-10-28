import mongoose,{Document,Schema} from "mongoose";


export interface IAdmin extends Document{
    email:string,
    password:string
}

const AdminSchema :Schema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

export default mongoose.model<IAdmin>('Admin',AdminSchema)