import { Request,Response } from "express"
import { HttpStatus } from "../enums/HttpStatus"
import AdminSlotService from "../services/adminSlotService"


const adminSlotService= new AdminSlotService()

class  AdminSlotController{

    async getDocSlotById(req:Request,res:Response){
       

        const {id}=req.params
       
        const slots=await adminSlotService.getDocSlots(id)
      
        
       res.status(HttpStatus.CREATED).json(slots)
       return 
        
    }

}


export default AdminSlotController