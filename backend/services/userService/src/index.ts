import express,{Request,Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectMongoDb from './config/dbConfig'
import authRoute from './routes/authRoute'

dotenv.config()


const app=express()
const PORT=process.env.PORT;


app.use(cors())
app.use(express.json())

app.use('/',authRoute)

connectMongoDb()

app.listen(PORT,()=>{console.log(`http://localhost:${PORT}`)})



