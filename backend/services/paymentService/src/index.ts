import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectMongoDb from './config/dbConfig'
import { rabbitMqConnect } from './config/rabbitmq'
import paymentRoute from './routes/paymentRoute'
import { errorHandler } from './middleware/errorHandler'
// import receiveDocSlotData from './events/consumers/docSlotConsumer'


dotenv.config()

const app=express()
const PORT=process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use('/',paymentRoute)
app.use(errorHandler);

connectMongoDb();
(async()=>{
    const channel=await rabbitMqConnect()
    if(channel){
        // await receiveDocSlotData()
    }
})()


app.listen(PORT,()=>{console.log('PaymentService running on http://localhost:4004');
})