import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan'
import path from 'path';
import connectMongoDb from './config/dbConfig';
import authRoute from './routes/authRoute';
import adminRoute from './routes/adminRoute'
import { createStream } from 'rotating-file-stream';
import { recieveUserData } from './events/consumers/userConsumer';
import { rabbitMqConnect } from './config/rabbitmq';
import { recieveDoctorData } from './events/consumers/doctorConsumer';
import cookieParser from 'cookie-parser';
import { recieveDocSlotData } from './events/consumers/docSlotConsumer';

dotenv.config();

const app = express();
const PORT = process.env.PORT ;


const accessLogStream = createStream('access.log', {
    interval: '1d', 
    path: path.join(__dirname, 'logs'),
  });
  
  app.use(morgan('combined', { stream: accessLogStream })); 
  app.use(morgan('dev')); 
  

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

connectMongoDb();


(async () => {
    const channel = await rabbitMqConnect();
    if (channel) {
        console.log('RabbitMQ connected in admin service');
        await recieveUserData(); 
        await recieveDoctorData()
        // await recieveDocSlotData()
        console.log('Admin consumer setup initiated');
    } else {
        console.error('Failed to connect to RabbitMQ');
    }
})();


app.use('/', authRoute);
app.use('/',adminRoute)


app.listen(PORT, () => {
    console.log(`adminService is running on the port http://localhost:${PORT}`);
});


