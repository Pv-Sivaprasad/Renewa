import { NextFunction, Request,Response } from "express";
import { HttpStatus } from "../enums/HttpStatus";
import {AdminService} from '../services/adminService'


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



}

export default AdminController