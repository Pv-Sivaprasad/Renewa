import {Request,Response,NextFunction} from 'express'
import { DoctorRepository } from '../repositories/implementations/DoctorRepository'
import { JwtPayload } from 'jsonwebtoken'
import { DoctorService } from '../services/doctorService'
import { HttpStatus } from '../enums/HttpStatus'
import redisClient from '../utils/redisUtil'

const doctorService= new DoctorService()

export interface CustomeRequest extends Request{
    user?:  JwtPayload
    userId?: string;
}


export const checkDocStatus= async(req:CustomeRequest,res:Response,next:NextFunction)=>{

    
    try {
        const docId=req.user as JwtPayload
      

        const id=docId.id
        console.log(id,'idfrom the docId')


        // const cachedStatus=await redisClient.get(`doctor:${docId}:isBlocked`)

        // if(cachedStatus!==null){
        //     if(cachedStatus==='true'){
        //         res.clearCookie('refrToken');
        //         res.status(HttpStatus.FORBIDDEN).json({success:false,message:"No Authorization"})
        //         return
        //     }
        //     next()
        //     return
        // }

        const docData=await doctorService.getProfileData(id)

        if (!docData) {
            res.status(HttpStatus.NOT_FOUND).json({ success: false, message: "Doctor not found" });
            return;
        }
        
        // await redisClient.set(`doctor:${docId}:isBlocked`,docData.isBlocked.toString(), 'EX', 3600)

        if(docData.isBlocked){
            res.clearCookie('refrToken')
            return res.status(HttpStatus.BAD_REQUEST).json({success:false,message:"No authentication"})
        }else{
            next()
        }

    } catch (error) {
        console.log('error in the check doc middleware',error);
    }

}