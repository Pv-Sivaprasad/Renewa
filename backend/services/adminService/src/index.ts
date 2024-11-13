import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongoDb from './config/dbConfig';
import authRoute from './routes/authRoute';
import adminRoute from './routes/adminRoute'
import { recieveUserData } from './events/consumers/userConsumer';
import { rabbitMqConnect } from './config/rabbitmq';
import { recieveDoctorData } from './events/consumers/doctorConsumer';

dotenv.config();

const app = express();
const PORT = process.env.PORT ;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());


connectMongoDb();


(async () => {
    const channel = await rabbitMqConnect();
    if (channel) {
        console.log('RabbitMQ connected in admin service');
        await recieveUserData(); 
        await recieveDoctorData()
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



// import express,{Request,Response} from 'express'
// import cors from 'cors'
// import dotenv from 'dotenv'
// import adminModel from './models/adminModel'
// import connectMongoDb from './config/dbConfig'
// import authRoute from './routes/authRoute'
// import cokkieparser from 'cookie-parser'
// import { recieveUserData } from './events/userConsumer'
// import { rabbitMqConnect } from './config/rabbitmq'


// dotenv.config()



// const app=express()
// const PORT=process.env.PORT

// app.use(cors({
//     origin:'http://localhost:5173',
//     credentials:true
// }))
// app.use(express.json())


// rabbitMqConnect()


// (async () => {
//     await recieveUserData(); 
//     console.log('Admin consumer setup initiated');
// })();
 


// app.use('/',authRoute)

// connectMongoDb()

// app.use(cors())
// app.use(express.json())





// app.listen(PORT,()=>console.log(`adminService  is running on the port http://localhost:${PORT}`))
