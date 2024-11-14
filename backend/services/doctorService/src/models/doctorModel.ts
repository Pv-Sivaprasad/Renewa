import mongoose, { Document, Schema } from "mongoose";

export interface IDoctor extends Document {
    username: string;
    email: string;
    password: string;
    image: string;
    experience: number;
    speciality: string;
    isVerified: boolean;
    isBlocked: boolean;
    isCompleted: boolean;
    address?: {
        state?: string;
        pincode?: string;
        city?: string;
        landmark?: string;
    };
}

const DoctorSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    experience: {
        type: Number,
        required: true,
    },
    speciality: {
        type: String,
        required: true,
    },
    address: {
        state: {
            type: String,
            required: false,
        },
        pincode: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        landmark: {
            type: String,
            required: false,
        },
    },
});

export default mongoose.model<IDoctor>("Doctor", DoctorSchema);


// import mongoose , {Document,Schema} from "mongoose";

// export interface IDoctor extends Document {
//     username:string,
//     email:string,
//     password:string,
//     image:string,
//     experience:number,
//     speciality:string,
//     isVerified:boolean,
//     isBlocked:boolean,
//     isCompleted:boolean
// }

// const DoctorSchema : Schema= new Schema({
//     username:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         unique:true,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true,
//     },
//     isVerified: {
//         type: Boolean,
//         default: false, 
//     },
//     isBlocked:{
//         type:Boolean,
//         default:false
//     },
//     isCompleted :{
//         type:Boolean,
//         default:false
//     },
//     experience:{
//         type:Number,
//         required:true
       
        
//     },
//     speciality:{
//         type:String,
//         required:true
        
//     }

// })


// export default mongoose.model<IDoctor>('Doctor',DoctorSchema)