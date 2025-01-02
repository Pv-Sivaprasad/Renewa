import express,{Request,Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectMongoDb from './config/dbConfig'
import authRoute from './routes/authRoute'
import userRoute from './routes/userRoute'
import cookieparser from 'cookie-parser'
import { rabbitMqConnect } from './config/rabbitMq'
import { listenForUserStatusUpdate } from './events/consumers/userConsumer'
import { listenForDocDetails } from './events/consumers/doctorConsumer'
import { recieveDocSlotData } from './events/consumers/docSlotConsumer'
import { listenForDocStatusUpdate } from './events/consumers/docStatusConsumer'

dotenv.config()


const app=express()
const PORT=process.env.PORT;
app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:process.env.CLIENT_URI,
    credentials:true

}))

app.use('/',authRoute)
app.use('/',userRoute)

connectMongoDb();

(async () => {
    const channel = await rabbitMqConnect();
    if (channel) {
        console.log('RabbitMQ connected in User service');
        await listenForUserStatusUpdate(); 
        await listenForDocDetails(); 
        await recieveDocSlotData()
        await listenForDocStatusUpdate()
        console.log('User consumer setup initiated');
    } else {
        console.error('Failed to connect to RabbitMQ');
    }
})();




app.listen(PORT,()=>{console.log(` userService is running on the port http://localhost:${PORT}`)})



