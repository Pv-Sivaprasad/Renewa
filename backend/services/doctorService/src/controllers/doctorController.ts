import { Request,Response,NextFunction } from "express";
import { HttpStatus } from "../enums/HttpStatus";
import { DoctorService } from "../services/doctorService";
import {CustomeRequest} from '../middleware/isAuthenticated'
import { UpdateprofileDto } from "../dto/docDto";
import { JwtPayload } from "jsonwebtoken";


const   doctorService= new DoctorService()


class DoctorController {

async updateProfile(req:CustomeRequest,res:Response){
    console.log('entering the profile in the doctor controller');

    try {
        const doc=req.user as JwtPayload
        console.log(doc,'the doc  from the middleware is');
        const docId=doc.id
        console.log(docId,'the doc id from the middleware is');

        const updateData : UpdateprofileDto=req.body
        console.log('the updates  in doc controller ',updateData);
        
        const updatedData=await doctorService.updateDoctorProfile(docId,updateData)
        console.log('the updated doc data is ',updateData);
        
        const data={
            username:updateData.username,
            address:updateData.address,
            speciality:updateData.speciality,
            experience:updateData.experience,
            image:updateData.image
        }
        console.log('the data is',data);
        

        return res.status(HttpStatus.CREATED).json(data)
    } catch (error) {
            console.log('error in the profile doctor controller',error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
        
    }

}




}



export default DoctorController