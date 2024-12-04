import { Request,Response,NextFunction } from "express";
import { DocSlotDto } from "../dto/slotDto";
import { HttpStatus } from "../enums/HttpStatus";
import { CustomeRequest } from "../middleware/isAuthenticated";
import { JwtPayload } from "jsonwebtoken";
import { SlotService } from "../services/slotService";
import { sendDocSlotData } from "../events/publishers/docSlotPublisher";

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
            await sendDocSlotData(slotDto)
           if(result){
            return res.status(HttpStatus.CREATED).json(result)
           }else{
            return res.status(HttpStatus.BAD_REQUEST).json({message:"Error while creating the slots"})
           }
          } catch (error) {
           console.log('error in the slot controller',error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Internal Server Error'})
          }


    }

    async getDocSlots(req:CustomeRequest,res:Response){
      console.log('eneterd the get slot in the slot controller');
      const doc=req.user as JwtPayload
      const docId=doc.id
      console.log('the dod id in the slot controller is ',docId);
      
      const {date}=req.params
      console.log('the date in controller is',date);
      

      if(!docId){
        return res.status(HttpStatus.FORBIDDEN).json({message:"No Authorization to view this page"})
      }
      try {
      const avialbaleSlots =await slotService.getSlotsByDocId(docId,date)
      console.log('sots in controller is after checking',avialbaleSlots);
      return res.status(HttpStatus.CREATED).json(avialbaleSlots)
      
      } catch (error) {
        console.log('error in the getdoc slots',error);
        
      }
    }




}



export default SlotController