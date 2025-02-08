import { NextFunction, Request,Response } from "express"
import { HttpStatus } from "../enums/http.status";
import { DocSlotService } from "../services/docSlotService";
import { JwtPayload } from "jsonwebtoken";
import { IncomingReques } from "../middleware/auth.middleware";


const docSlotService= new DocSlotService()


export class DocSlotController{

    async getDoctorSlotById(req:Request,res:Response,next:NextFunction){
       
        
        const {id}=req.params
      
        try {
            const slots=await docSlotService.docSlotsById(id)
            // console.log('the doc slot controller',slots);
            if(slots){
                return res.status(HttpStatus.CREATED).json(slots)
            }else{
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json("internal server Error")
            }
            
        } catch (error) {
            console.log('error in the doc slot con of ger doc by id',error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json('Internal Server Error')
            
        }
        

    }

    async getBookedData(req:IncomingReques,res:Response,next:NextFunction){

        const user = req.user as JwtPayload
        const userId = user.id
        console.log('the User id is',userId);
       
        
        
        const response=await docSlotService.getBookingData(userId)
                    
    }

}