import express,{Request,Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectMongoDb from './config/dbConfig'
import authRoute from './routes/authRoute'
import cookieparser from 'cookie-parser'
import { rabbitMqConnect } from './config/rabbitMq'
import { listenForUserStatusUpdate } from './events/consumers/userConsumer'

dotenv.config()


const app=express()
const PORT=process.env.PORT;
app.use(cookieparser())

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true

}))
app.use(express.json())

app.use('/',authRoute)

connectMongoDb();

(async () => {
    const channel = await rabbitMqConnect();
    if (channel) {
        console.log('RabbitMQ connected in admin service');
        await listenForUserStatusUpdate(); // Start consuming messages
        console.log('Admin consumer setup initiated');
    } else {
        console.error('Failed to connect to RabbitMQ');
    }
})();




app.listen(PORT,()=>{console.log(` userService is running on the port http://localhost:${PORT}`)})



