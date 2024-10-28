import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()


const connectMongoDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log(process.env.MONGO_URI!);
        
        console.log('connected to mongodb for adminservice ');
        
    } catch (error) {
        console.log('error in connecting to mongodb');
        
    }
}

export default connectMongoDb