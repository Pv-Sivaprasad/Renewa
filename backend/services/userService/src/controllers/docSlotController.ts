import { NextFunction, Request,Response } from "express"
import { HttpStatus } from "../enums/http.status";
import { DocSlotService } from "../services/docSlotService";



const docSlotService= new DocSlotService()


export class DocSlotController{

    async getDoctorSlotById(req:Request,res:Response,next:NextFunction){
        console.log('req.params',req.params);
        
        const {id}=req.params
        console.log('the doctorId from the params in the doc slot controller is ',id);

        try {
            const slots=await docSlotService.docSlotsById(id)
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