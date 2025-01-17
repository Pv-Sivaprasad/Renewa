import { NextFunction, Response } from "express";
import { IncomingReques } from "../middleware/auth.middleware";
import { DoctorService } from "../services/doctorService";
import { HttpStatus } from "../enums/http.status";


const doctorService= new DoctorService()

export class DoctorController{

  
    async getAllDoctors(req:IncomingReques,res:Response,next:NextFunction){
    

   try {
     
    const doctors=await doctorService.allDoctorsList()

    return res.status(HttpStatus.CREATED).json(doctors)
   } catch (error) {
    console.log('error in getting doctors in doc ocntroller user side',error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
   }
  

  }
    


}