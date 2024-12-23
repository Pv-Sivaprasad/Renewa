import { NextFunction, Request,Response } from "express";
import { HttpStatus } from "../enums/HttpStatus";
import {AdminService} from '../services/adminService'
import publishUserStatusUpdate from "../events/publishers/userStatusPublisher";
import PublishDoctorStatusUpdate from "../events/publishers/doctorStatusPublisher";


const adminService=new AdminService()

class AdminController {

    async getAllUser(req:Request,res:Response,next:NextFunction) {
       
        try {
            const users=await adminService.getAllUsers()

           
            res.status(HttpStatus.CREATED).json(users)
            return 

        } catch (error) {
          
             res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
             return 
            
        }
        
    }

    async updateUserStatus(req:Request,res:Response,next:NextFunction){
      
        const {id}=req.params
      

        try {
            
            const response=await adminService.toggleBlockStatus(id)
           
            
            
            if(response){

                const message={
                    userId:response.userId,
                    isBlocked:response.isBlocked
                }
             
                
                await publishUserStatusUpdate(message)

              res.status(HttpStatus.CREATED).json({response})
              return
            }else{
                res.status(HttpStatus.BAD_REQUEST).json({message:"User not found"})
                return
            }

        } catch (error) {
          
             res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Internal server error"})
             return
        }
        
    }


    async getAllDoctor(req:Request,res:Response,next:NextFunction) {
        console.log('entering the get all doctor in admin controller');
        
        try {
            const doctors=await adminService.getAllDoctors()
            console.log('the doctors in admin controller',doctors);
            res.status(HttpStatus.CREATED).json(doctors)
            return
            
        } catch (error) {
            console.log('error in the admincontroller get all users',error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
            return 
        }
    }

    async updateDoctorStatus(req:Request,res:Response,next:NextFunction) {
       
        const {id}=req.params
      
        try {
            const response=await adminService.toggleDoctorStatus(id)
        
            if(response){
                const message={
                    docId:response.docId,
                    isBlocked:response.isBlocked,
                    email:response.email
                    
                }
             
                
                await PublishDoctorStatusUpdate(message)

                res.status(HttpStatus.CREATED).json({response}) 
                return
            }
        } catch (error) {
         
              res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
              return
        }
        
    }


}

export default AdminController