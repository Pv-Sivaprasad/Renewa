import express,{Request,Response} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import adminModel from './models/adminModel'
import connectMongoDb from './config/dbConfig'
import authRoute from './routes/authRoute'
import cokkieparser from 'cookie-parser'



dotenv.config()



const app=express()
const PORT=process.env.PORT

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json())




app.use('/',authRoute)

connectMongoDb()


app.use(cors())
app.use(express.json())





app.listen(PORT,()=>console.log(`adminService  is running on the port http://localhost:${PORT}`))
