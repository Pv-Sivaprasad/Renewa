import mongoose , {Document,Schema} from "mongoose";

export interface IDoctor extends Document {
    username:string,
    email:string,
    password:string,
    image:string,
    isVerified:string,
    isBlocked:string,
}

