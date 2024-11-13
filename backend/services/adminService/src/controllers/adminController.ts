import { NextFunction, Request,Response } from "express";
import { HttpStatus } from "../enums/HttpStatus";
import {AdminService} from '../services/adminService'
import publishUserStatusUpdate from "../events/publishers/userStatusPublisher";


const adminService=new AdminService()

class AdminController {

    async getAllUser(req:Request,res:Response,next:NextFunction) {
        console.log('entering get all users in admin controller');
        try {
            const users=await adminService.getAllUsers()

            console.log('users in the admin controller ',users);

            res.status(HttpStatus.CREATED).json(users)
            return 

        } catch (error) {
            console.log('error in the admincontroller get all users',error);
             res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
             return 
            
        }
        
    }

    async updateUserStatus(req:Request,res:Response,next:NextFunction){
        console.log('enterinf the updateUserStatus in admin controller');
        const {id}=req.params
        console.log('the id in params is ',id);

        try {
            
            const response=await adminService.toggleBlockStatus(id)
            
            
            if(response){

                const message={
                    userId:response.userId,
                    isBlocked:response.isBlocked
                }
                console.log('the message for the publisher',message);
                
                await publishUserStatusUpdate(message)

              res.status(HttpStatus.CREATED).json({response})
              return
            }else{
                res.status(HttpStatus.BAD_REQUEST).json({message:"User not found"})
                return
            }

        } catch (error) {
            console.log('error in the updateuser status',error);
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
        console.log('entering the update doctor in admin controller');
        const {id}=req.params
        console.log('the id in params is ',id);
        try {
            const response=await adminService.toggleDoctorStatus(id)
            res.status(HttpStatus.CREATED).json({response}) 
        } catch (error) {
             console.log('error in the admincontroller get all users',error);
              res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
              return
        }
        
    }


}

export default AdminController