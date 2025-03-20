import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { createStream } from 'rotating-file-stream'
import path from 'path'
import cookieParser from 'cookie-parser'
import connectMongoDb from './config/dbConfig'
import chatRoute from './routes/chatRoute'
import http from 'http'
import { Server } from 'socket.io'
import socketHandler from './socket/socketHandler'

dotenv.config()

const app = express()
const server = http.createServer(app)  
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,  
        credentials: true,
    },
      path: '/socket.io'
})

const PORT = process.env.PORT || 4005 


const accessLogStream = createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs')
});
app.use(morgan('combined', { stream: accessLogStream }))
app.use(morgan('dev'))


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


connectMongoDb()


app.use('/', chatRoute)


socketHandler(io)

// ❌ 
// ✅ 
server.listen(PORT, () => {
    console.log(`🚀 Chat service running on http://localhost:${PORT}`)
})



// import express from 'express'
// import dotenv from 'dotenv'
// import cors from 'cors'
// import morgan from 'morgan'
// import { createStream } from 'rotating-file-stream'
// import path from 'path'
// import cookieParser from 'cookie-parser'
// import connectMongoDb from './config/dbConfig'
// import chatRoute from './routes/chatRoute'
// import  http from 'http'
// import {Server} from 'socket.io'
// import socketHandler from './socket/socketHandler'


// dotenv.config()

// const app=express()
// const server=http.createServer(app)
// const io=new Server(server,{cors:{origin:"*"}})
// const PORT=process.env.PORT

// const accessLogStream=createStream('access.log',{
//     interval:'1d',
//     path:path.join(__dirname,'logs')
// });

// app.use(morgan('combined',{stream:accessLogStream}))
// app.use(morgan('dev'))

// app.use(cors({
//     origin:process.env.FRONTEND_URL,
//     credentials:true,
// }))
// app.use(cookieParser())
// app.use(express.urlencoded({extended:true}))
// app.use(express.json())


// connectMongoDb()


// app.use('/',chatRoute)
// socketHandler(io)


// app.listen(PORT,()=>{console.log(`chat service running on http://localhost:${PORT}`);
// })

