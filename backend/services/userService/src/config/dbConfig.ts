import mongoose from 'mongoose'
import dotenv from 'dotenv'


dotenv.config()

const connectMongoDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log('connected to mongo db for userService');
        
    } catch (error) {
        console.log('error in connecting to db');
        
    }
}

export default connectMongoDb