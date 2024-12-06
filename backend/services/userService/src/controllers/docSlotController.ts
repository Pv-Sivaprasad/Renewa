import { NextFunction, Request,Response } from "express"
import { HttpStatus } from "../enums/http.status";
import { DocSlotService } from "../services/docSlotService";



const docSlotService= new DocSlotService()


export class DocSlotController{

    async getDoctorSlotById(req:Request,res:Response,next:NextFunction){
        
        const {doctorId}=req.params
        console.log('the doctorId from the params in the doc slot controller is ',doctorId);

        try {
            const slots=await docSlotService.docSlotsById(doctorId)
            console.log('the doc slot controller',slots);
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

}