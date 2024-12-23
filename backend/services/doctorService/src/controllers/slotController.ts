import { Request, Response, NextFunction } from "express";
import { DocSlotDto } from "../dto/slotDto";
import { HttpStatus } from "../enums/HttpStatus";
import { CustomeRequest } from "../middleware/isAuthenticated";
import { JwtPayload } from "jsonwebtoken";
import { SlotService } from "../services/slotService";
import { sendDocSlotData } from "../events/publishers/docSlotPublisher";
import { DoctorService } from "../services/doctorService";

const slotService = new SlotService()
const doctorService = new DoctorService()
class SlotController {



  async upsertSlots(req: CustomeRequest, res: Response) {
    const doc = req.user as JwtPayload
    const docId = doc.id
    const doctorProfile = await doctorService.getProfileData(docId);
    const docName = doctorProfile?.username || 'Unknown Doctor'
    const { date, slots } = req.body
    if (!date || !slots || !Array.isArray(slots)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid input data' });
    }

    const slotDto = {
      docId,
      docName,
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
      const result = await slotService.upsertSlots(slotDto)
      await sendDocSlotData(slotDto)
      if (result) {
        return res.status(HttpStatus.CREATED).json(result)
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: "Error while creating the slots" })
      }
    } catch (error) {
      console.log('error in the slot controller', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
    }


  }


  async getDocSlots(req: CustomeRequest, res: Response) {

    const doc = req.user as JwtPayload
    const docId = doc.id
    const { date } = req.params

    if (!docId) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: "No Authorization to view this page" })
    }
    try {
      const avialbaleSlots = await slotService.getSlotsByDocId(docId, date)
      return res.status(HttpStatus.CREATED).json(avialbaleSlots)

    } catch (error) {
      console.log('error in the getdoc slots', error);

    }
  }

  async editSlots(req: CustomeRequest, res: Response) {
    const doc = req.user as JwtPayload
    const docId = doc.id
    const doctorProfile = await doctorService.getProfileData(docId);
    const docName = doctorProfile?.username || 'Unknown Doctor'
    const { date, slots } = req.body
    if (!date || !slots || !Array.isArray(slots)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid input data' });
    }

    const slotDto = {
      docId,
      docName,
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
      console.log('the data to backend is ',slotDto);
      
      const editedData= await slotService.editSlots(date,slotDto)
      if(editedData){
        return res.status(HttpStatus.CREATED).json(editedData)
      }else{
        return res.status(HttpStatus.BAD_REQUEST).json({ message: "Error while creating the slots" })
      }
    } catch (error) {
      console.log('error in the slot controller of editing doc slots',error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Internal Server Error"})
      
    }



  }



}



export default SlotController