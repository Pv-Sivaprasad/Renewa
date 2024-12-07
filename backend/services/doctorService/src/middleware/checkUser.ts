import {Request,Response,NextFunction} from 'express'
import { DoctorRepository } from '../repositories/implementations/DoctorRepository'
import { JwtPayload } from 'jsonwebtoken'
import { DoctorService } from '../services/doctorService'
import { HttpStatus } from '../enums/HttpStatus'


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

        const docData=await doctorService.getProfileData(id)

        if(docData?.isBlocked){
            res.clearCookie('refrToken')
            return res.status(HttpStatus.BAD_REQUEST).json({success:false,message:"No authentication"})
        }else{
            next()
        }

    } catch (error) {
        console.log('error in the check doc middleware',error);
    }

}