import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectMongoDb from './config/dbConfig'
import authRoute from './routes/authRoute'
import { rabbitMqConnect } from './config/rabbitmq'
import {listenForAdminStatusUpdate} from './events/consumers/doctorConsumer'
dotenv.config()

const app=express()
const PORT=process.env.PORT


app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(express.json())

app.use('/',authRoute)
connectMongoDb();



(async ()=>{
    const channel=await rabbitMqConnect()
    if(channel){
        console.log('rabbit mq connected in doctor side');
        await listenForAdminStatusUpdate()
        console.log('doctor consumer setup initiatted');
        
    }else{
        console.log('failed to connect to rabbit mq doc side');
        
    }
})();




app.listen(PORT,()=>{
    console.log(`doctor service running on port http://localhost:${PORT}`)
    
})
