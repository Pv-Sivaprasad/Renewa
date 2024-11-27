import { Request,Response,NextFunction } from "express";
import { DocSlotDto } from "../dto/slotDto";
import { HttpStatus } from "../enums/HttpStatus";
import { CustomeRequest } from "../middleware/isAuthenticated";
import { JwtPayload } from "jsonwebtoken";




class SlotController{
   
    async slots(req:CustomeRequest,res:Response){
        console.log('entering the slots of doctore controller');
        console.log('req.body of slots',req.body);
        try {
            const doc=req.user as JwtPayload
            const docId=doc.id
            console.log('the dod id in the slot controller is ',docId);

            // const newSlot=await 
            
        } catch (error) {
            console.log('error in the slots of doc controller',error);
            
        }
    }
}



export default SlotController