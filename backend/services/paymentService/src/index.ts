import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectMongoDb from './config/dbConfig'
import { rabbitMqConnect } from './config/rabbitmq'
import paymentRoute from './routes/paymentRoute'
import { errorHandler } from './middleware/errorHandler'
import receiveDocSlotData from './events/consumers/docSlotConsumer'
import webhookRoute from './routes/webHookRoute'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import path = require('path')
import { createStream } from 'rotating-file-stream'
dotenv.config()
import WebHookController from './controllers/implementations/webHookController'

import { IWebHookServices } from './services/interface/IWebHookService'
import { WebHookService } from './services/implementation/webHookService'
import { recieveUserData } from './events/consumers/userToPaymentConsumer'
const app=express()
const PORT=process.env.PORT
const webHook=new WebHookService()
const webHookController=new WebHookController()

app.post('/webhook',bodyParser.raw({ type: 'application/json' }),webHookController.webHookHandle);

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const accessLogStream = createStream('access.log', {
    interval: '1d', 
    path: path.join(__dirname, 'logs'),
  });
  
  app.use(morgan('combined', { stream: accessLogStream })); 
  app.use(morgan('dev')); 
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
        await receiveDocSlotData()
        await recieveUserData()
    }
})()


app.listen(PORT,()=>{console.log('PaymentService running on http://localhost:4004')})