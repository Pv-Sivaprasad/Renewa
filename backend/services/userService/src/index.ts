import express,{Request,Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectMongoDb from './config/dbConfig'
import authRoute from './routes/authRoute'
import cookieparser from 'cookie-parser'
import { rabbitMqConnect } from './config/rabbitMq'


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

connectMongoDb()

rabbitMqConnect()




app.listen(PORT,()=>{console.log(` userService is running on the port http://localhost:${PORT}`)})



