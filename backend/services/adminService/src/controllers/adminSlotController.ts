import { Request,Response } from "express"
import { HttpStatus } from "../enums/HttpStatus"
import AdminSlotService from "../services/adminSlotService"
import { AdminDocSlotRepository } from "../repositories/implementations/AdminDocSlotRepository"

const adminDocSlotRepository=new AdminDocSlotRepository()
const adminSlotService= new AdminSlotService(adminDocSlotRepository)



/**
 *
 *
 * @class AdminSlotController
 */
class  AdminSlotController{

    

    constructor(){

    }

/**
 *
 *
 * @param {Request} req
 * @param {Response} res
 * @memberof AdminSlotController
 */


async getDocSlotById(req:Request,res:Response){
       

        const {id}=req.params
       
        const slots=await adminSlotService.getDocSlots(id)
      
        
       res.status(HttpStatus.CREATED).json(slots)
       return 
        
    }

}


export default AdminSlotController