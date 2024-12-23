// import { Request, Response, NextFunction } from 'express';
// import { JwtPayload } from 'jsonwebtoken';
// import { DoctorService } from '../services/doctorService';
// import { HttpStatus } from '../enums/HttpStatus';
// import redisClient from '../utils/redisUtil';

// const doctorService = new DoctorService();

// export interface CustomeRequest extends Request {
//     user?: JwtPayload;
//     userId?: string;
// }

// export const checkDocStatus = async (req: CustomeRequest, res: Response, next: NextFunction) => {
//     try {
//         const docId = req.user as JwtPayload;
//         const id = docId.id;

//         console.log(id, 'id from the docId');

//         // Check Redis cache first
//         let docData = await redisClient.get(`doctor:${id}`);
//         console.log('docData', docData);
//         if (docData) {
//             // Parse Redis data
//             docData = JSON.parse(docData);
//             console.log('Doctor data retrieved from Redis');
//         // } else {
//         //     // If not in cache, fetch from database
//         //     docData = await doctorService.getProfileData(id);

//         //     if (!docData) {
//         //         return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Doctor not found' });
//         //     }

//         //     // Store in Redis with a time-to-live (TTL) of 1 hour
//         //     await redisClient.set(`doctor:${id}`, JSON.stringify(docData));
//         //     console.log('Doctor data stored in Redis');
//         // }

//         // // Check the blocked status
//         // if (docData?.isBlocked) {
//         //     res.clearCookie('refrToken');
//         //     return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'No authentication' });
//         } else {
//             next();
//         }
//     } catch (error) {
//         console.error('Error in the check doctor middleware:', error);
//         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Server error' });
//     }
// };


import {Request,Response,NextFunction} from 'express'
import { DoctorRepository } from '../repositories/implementations/DoctorRepository'
import { JwtPayload } from 'jsonwebtoken'
import { DoctorService } from '../services/doctorService'
import { HttpStatus } from '../enums/HttpStatus'
// import redisClient from '../utils/redisUtil'

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

        if (!docData) {
            res.status(HttpStatus.NOT_FOUND).json({ success: false, message: "Doctor not found" });
            return;
        }
        
      

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