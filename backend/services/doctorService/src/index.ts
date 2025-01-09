import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { createStream } from 'rotating-file-stream';
import path from 'path';
import cookieParser from 'cookie-parser';
import connectMongoDb from './config/dbConfig';
import authRoute from './routes/authRoute';
import doctorRoute from './routes/doctorRoute';
import { rabbitMqConnect } from './config/rabbitmq';
import { listenForAdminStatusUpdate } from './events/consumers/doctorConsumer';

dotenv.config();

const app = express();
const PORT = process.env.PORT;


const accessLogStream = createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'logs'),
});

app.use(morgan('combined', { stream: accessLogStream })); 
app.use(morgan('dev')); 


app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', authRoute);
app.use('/', doctorRoute);


connectMongoDb();


(async () => {
  const channel = await rabbitMqConnect();
  if (channel) {
    console.log('✅ RabbitMQ connected in doctor service');
    await listenForAdminStatusUpdate();
    console.log('✅ Doctor consumer setup initiated');
  } else {
    console.log('❌ Failed to connect to RabbitMQ in doctor service');
  }
})();

// 🚀 **Start Server**
app.listen(PORT, () => {
  console.log(`🚀 Doctor service running on http://localhost:${PORT}`);
});


// import express from 'express'
// import fs from 'fs'
// import path from 'path'
// import cors from 'cors'
// import dotenv from 'dotenv'
// import morgan from 'morgan'
// import connectMongoDb from './config/dbConfig'
// import authRoute from './routes/authRoute'
// import doctorRoute from './routes/doctorRoute'
// import { rabbitMqConnect } from './config/rabbitmq'
// import {listenForAdminStatusUpdate} from './events/consumers/doctorConsumer'
// import cookieParser from 'cookie-parser'
// dotenv.config()

// const app=express()
// const PORT=process.env.PORT


// app.use(cors({
//     origin:process.env.FRONTEND_URL,  
//     credentials:true
// }))

// app.use(cookieParser())
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))



// const accessLogStream = fs.createWriteStream(
//     path.join(__dirname, 'logs', 'access.log'),
//     { flags: 'a' } // Append mode
// )

// app.use(morgan('combined', { stream: accessLogStream })) // Logs into access.log
// app.use(morgan('dev')) 


// app.use('/',authRoute)
// app.use('/',doctorRoute)
// connectMongoDb();



// (async ()=>{
//     const channel=await rabbitMqConnect()
//     if(channel){
//         console.log('rabbit mq connected in doctor side');
//         await listenForAdminStatusUpdate()
//         console.log('doctor consumer setup initiatted');
        
//     }else{
//         console.log('failed to connect to rabbit mq doc side');
        
//     }
// })();




// app.listen(PORT,()=>{
//     console.log(`doctor service running on port http://localhost:${PORT}`)
    
// })
