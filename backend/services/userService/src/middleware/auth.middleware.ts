import jwt,{JwtPayload} from 'jsonwebtoken'
import  {Request,Response,NextFunction} from 'express'
import { HttpStatus } from '../enums/http.status'
import dotenv from 'dotenv'

dotenv.config()

interface IncomingReques extends Request{
    user?:string | JwtPayload
}


export const isAuthenticated=(req:IncomingReques,res:Response,next:NextFunction)=>{
    try {
        const authheader=req.headers['Authorization']
        if(!authheader){
            console.log('error in reding the token in middleware');
            res.status(HttpStatus.UNAUTHORIZED).json({message:"no authorization to view the page"})
        }

        if(typeof authheader==='string'){
            const token=authheader.split(' ')[1]

            if(!token){
               return res.status(HttpStatus.UNAUTHORIZED).json({message:"no authorization to view the page"})
            }
            const SECRET_KEY=process.env.JWT_SECRET

            if(!SECRET_KEY){
                return res.status(HttpStatus.NO_CONTENT).json({message:"not secret available"})
            }

            const decoded=jwt.verify(token,SECRET_KEY,(err,decoded)=>{
                if(err){
                    return res.status(HttpStatus.UNAUTHORIZED).json({message:"Inavalid token"})
                }
                req.user=decoded as JwtPayload
                next()
            })

        }
    } catch (error) {
        console.log('error in the middleware',error);
        
    }
}