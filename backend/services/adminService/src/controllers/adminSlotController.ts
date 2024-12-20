import { Request,Response } from "express"
import { HttpStatus } from "../enums/HttpStatus"
import AdminSlotService from "../services/adminSlotService"


const adminSlotService= new AdminSlotService()

class  AdminSlotController{

    async getDocSlotById(req:Request,res:Response){
        console.log('entering the getDocSlotById in the admin Slot Controller');

        const {id}=req.params
        console.log('the id in params is',id);
        const slots=await adminSlotService.getDocSlots(id)
        console.log('the slot of the doctor with all details is ',slots);
        
       res.status(HttpStatus.CREATED).json(slots)
       return 
        
    }

}


export default AdminSlotController