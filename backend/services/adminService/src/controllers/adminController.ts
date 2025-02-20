import { NextFunction, Request,Response } from "express";
import { HttpStatus } from "../enums/HttpStatus";
import {AdminService} from '../services/adminService'
import publishUserStatusUpdate from "../events/publishers/userStatusPublisher";
import PublishDoctorStatusUpdate from "../events/publishers/doctorStatusPublisher";


// const adminService=new AdminService()

class AdminController {

 private adminServiceUse : AdminService
 
    constructor(adminServiceUse: AdminService){
        this.adminServiceUse= adminServiceUse
    }

    
/**
 *  getting user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @memberof AdminController
 */


    async getAllUser(req:Request,res:Response,next:NextFunction) {
       
        try {
            console.log('in here',req.body);
           
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 5;
          
            // const users=await adminService.getAllUsers()
            const users=await this.adminServiceUse.getAllUsers(page,limit)
           console.log('the users controller ******',users);
           
            res.status(HttpStatus.CREATED).json(users)
            return 

        } catch (error) {
          
             res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
             return 
            
        }
        
    }

    /**
     *
     *
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @memberof AdminController
     */
    async getAllDoctor(req:Request,res:Response,next:NextFunction) {
        console.log('entering the get all doctor in admin controller');
        
        try {

            const page=parseInt(req.query.page as string) || 1;
            const limit=parseInt(req.query.limit as string) | 5

            // const doctors=await adminService.getAllDoctors()
            const doctors=await this.adminServiceUse.getAllDoctors(page,limit)
            console.log('the doctors in admin controller',doctors);
            res.status(HttpStatus.CREATED).json(doctors)
            return
            
        } catch (error) {
            console.log('error in the admincontroller get all users',error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
            return 
        }
    }



/**
 *
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @memberof AdminController
 */
async updateUserStatus(req:Request,res:Response,next:NextFunction){
      
        const {id}=req.params
      

        try {
            
            // const response=await adminService.toggleBlockStatus(id)
           const response =await this.adminServiceUse.toggleBlockStatus(id)
            
            
            
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


  

    async updateDoctorStatus(req:Request,res:Response,next:NextFunction) {
       
        const {id}=req.params
      
        try {
            // const response=await adminService.toggleDoctorStatus(id)
            const response=await this.adminServiceUse.toggleDoctorStatus(id)
        
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