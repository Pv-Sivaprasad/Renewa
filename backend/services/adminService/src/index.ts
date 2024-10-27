import express,{Request,Response} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

console.log('in the page');

const app=express()
const PORT=process.env.PORT

app.use(cors())
app.use(express.json())


// app.use('/admin',)


app.listen(PORT,()=>console.log(`server is running on the port http://localhost:${PORT}`))
