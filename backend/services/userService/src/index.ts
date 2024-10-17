import express,{Request,Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectMongoDb from './config/dbConfig'
import authRoute from './routes/authRoute'

const app=express()

app.use(cors())
app.use(express.json())

app.use('/',authRoute)


connectMongoDb()


