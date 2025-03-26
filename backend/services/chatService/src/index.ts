import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { createStream } from 'rotating-file-stream';
import path from 'path';
import cookieParser from 'cookie-parser';
import connectMongoDb from './config/dbConfig';
// import chatRoute from './routes/chatRoute';
import http from 'http';
import { Server } from 'socket.io';
import { socketHandler } from './socket/socketHandler'; // Import socketHandler
// import { ChatControllerImpl } from '../controllers/implementation/chatController';
// import { ChatServiceImpl } from './services/implementation/chatService';
// import { ChatRepositoryImpl } from './repositories/implementation/chatRepository';
import { ChatRepositoryImpl } from './repositories/implementations/ChatRepository';
import { ChatServiceImpl } from './services/implementations/ChatService';
import { ChatControllerImpl } from './controllers/implementations/ChatController';

dotenv.config();

const app: Application = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS configuration
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    },
    path: '/socket.io',
});

const PORT = process.env.PORT || 4005;

// Set up rotating logs
const accessLogStream = createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs'),
});

// Middleware setup
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectMongoDb();
// app.use('/', chatRoute);

// Create ChatController instance and pass it to socketHandler
const chatRepository = new ChatRepositoryImpl();
const chatService = new ChatServiceImpl(chatRepository);
const chatController = new ChatControllerImpl(chatService);

// Initialize Socket.IO handler with `io` and `chatController`
socketHandler(io, chatController);

server.listen(PORT, () => {
    console.log(`🚀 Chat service running on http://localhost:${PORT}`);
});























// import express from 'express'
// import dotenv from 'dotenv'
// import cors from 'cors'
// import morgan from 'morgan'
// import { createStream } from 'rotating-file-stream'
// import path from 'path'
// import cookieParser from 'cookie-parser'
// import connectMongoDb from './config/dbConfig'
// import chatRoute from './routes/chatRoute'
// import http from 'http'
// import { Server } from 'socket.io'
// // import socketHandler from './socket/socketHandler'

// dotenv.config()

// const app = express()
// const server = http.createServer(app)  
// const io = new Server(server, {
//     cors: {
//         origin: process.env.FRONTEND_URL,  
//         credentials: true,
//     },
//       path: '/socket.io'
// })

// const PORT = process.env.PORT || 4005 


// const accessLogStream = createStream('access.log', {
//     interval: '1d',
//     path: path.join(__dirname, 'logs')
// });
// app.use(morgan('combined', { stream: accessLogStream }))
// app.use(morgan('dev'))


// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
// }))
// app.use(cookieParser())
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())


// connectMongoDb()


// app.use('/', chatRoute)


// socketHandler(io)

// // ❌ 
// // ✅ 
// server.listen(PORT, () => {
//     console.log(`🚀 Chat service running on http://localhost:${PORT}`)
// })

