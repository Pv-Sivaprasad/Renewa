import { Request,Response,NextFunction } from "express";
import { DocSlotDto } from "../dto/slotDto";
import { HttpStatus } from "../enums/HttpStatus";
import { CustomeRequest } from "../middleware/isAuthenticated";
import { JwtPayload } from "jsonwebtoken";
import { SlotService } from "../services/slotService";

const slotService= new SlotService()

class SlotController{
   

    async upsertSlots(req:CustomeRequest,res:Response){
        console.log('eneterd the upsert slot in the slot controller');
              const doc=req.user as JwtPayload
              const docId=doc.id
              console.log('the dod id in the slot controller is ',docId);

              const {date,slots}=req.body

                   if (!date || !slots || !Array.isArray(slots)) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid input data' });
          }

          const slotDto={
            docId,
            dates: [
                {
                  date,
                  slots: slots.map((slot) => ({
                    startTime: slot.startTime,
                    endTime: slot.endTime,
                    isAvailable: slot.isSelected ?? true,
                  })),
                },
              ],
          }

          try {
           const result=await slotService.upsertSlots(slotDto)
           console.log('the resilt in the slotcontroller is',result);

           
          } catch (error) {
           console.log('error in the slot controller',error);
            
          }


    }

}



export default SlotController