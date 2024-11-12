import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectMongoDb from './config/dbConfig'
import authRoute from './routes/authRoute'

dotenv.config()

const app=express()
const PORT=process.env.PORT


app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(express.json())
connectMongoDb()



app.use('/',authRoute)

app.listen(PORT,()=>{
    console.log(`doctor service running on port http://localhost:${PORT}`)
    
})
