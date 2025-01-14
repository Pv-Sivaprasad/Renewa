import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { createStream } from 'rotating-file-stream'
import path from 'path'
import cookieParser from 'cookie-parser'
import connectMongoDb from './config/dbConfig'
import chatRoute from './routes/chatRoute'

dotenv.config()

const app=express()
const PORT=process.env.PORT

const accessLogStream=createStream('access.log',{
    interval:'1d',
    path:path.join(__dirname,'logs')
});

app.use(morgan('combined',{stream:accessLogStream}))
app.use(morgan('dev'))

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
}))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


connectMongoDb()


app.use('/',chatRoute)



app.listen(PORT,()=>{console.log(`chat service running on http://localhost:${PORT}`);
})

