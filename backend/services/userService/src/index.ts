import express,{Request,Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import connectMongoDb from './config/dbConfig'
import authRoute from './routes/authRoute'
import userRoute from './routes/userRoute'
import cookieparser from 'cookie-parser'
import { createStream } from 'rotating-file-stream'
import { rabbitMqConnect } from './config/rabbitMq'
import { listenForUserStatusUpdate } from './events/consumers/userConsumer'
import { listenForDocDetails } from './events/consumers/doctorConsumer'
import { recieveDocSlotData } from './events/consumers/docSlotConsumer'
import { listenForDocStatusUpdate } from './events/consumers/docStatusConsumer'
import { getPaymentData } from './events/consumers/paymentStatusConsumer'
import ratingRoute from './routes/ratingRoute'

dotenv.config()


const app=express()
const PORT=process.env.PORT;
app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


const accessLogStream = createStream('access.log', {
    interval: '1d', 
    path: path.join(__dirname, 'logs'),
  });
  
  app.use(morgan('combined', { stream: accessLogStream })); 
  app.use(morgan('dev')); 

app.use(cors({
    origin:process.env.CLIENT_URI,
    credentials:true

}))

app.use('/',authRoute)
app.use('/',userRoute)
app.use('/',ratingRoute)

connectMongoDb();

(async () => {
    const channel = await rabbitMqConnect();
    if (channel) {
        console.log('RabbitMQ connected in User service');
        await listenForUserStatusUpdate(); 
        await listenForDocDetails(); 
        await recieveDocSlotData()
        await listenForDocStatusUpdate()
        await getPaymentData()
        console.log('User consumer setup initiated');
    } else {
        console.error('Failed to connect to RabbitMQ');
    }
})();




app.listen(PORT,()=>{console.log(` userService is running on the port http://localhost:${PORT}`)})



