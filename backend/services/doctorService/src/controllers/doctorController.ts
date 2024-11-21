import { Request,Response,NextFunction } from "express";
import { HttpStatus } from "../enums/HttpStatus";
import { DoctorService } from "../services/doctorService";
import {CustomeRequest} from '../middleware/isAuthenticated'
import { UpdateprofileDto } from "../dto/docDto";
import { JwtPayload } from "jsonwebtoken";
import { uploadFile } from "../utils/uploadUtil";


const   doctorService= new DoctorService()


class DoctorController {

async getProfile(req:CustomeRequest,res:Response){
    console.log('entering the get profile in doctor controller');

    try {
        const doc=req.user as JwtPayload
        console.log(doc,'the doc  from the middleware is');
        const docId=doc.id
        console.log(docId,'the doc id from the middleware is');

        const data=await doctorService.getProfileData(docId)
        console.log('data from the controller is',data);
        
        const response={
            username:data?.username,
            email:data?.email,
            speciality:data?.speciality,
            address:data?.address,
            experience:data?.experience,
            image:data?.image
        }
        return res.status(HttpStatus.CREATED).json(response)
    } catch (error) {
        
    }
    
}


async updateProfile(req:CustomeRequest,res:Response){
    console.log('entering the profile in the doctor controller');

    try {
        const doc=req.user as JwtPayload
      
        const docId=doc.id
       
        let imageUrl: string | undefined;

        if (req.file) {
            const file = req.file;
            const fullFileName = file.originalname;
            const fileNameWithoutExtension = fullFileName.split('.').slice(0, -1).join('.');
            const fileType = file.mimetype;
        
            const fileContent = file.buffer;

            const dataForUpload={
                fileContent:fileContent,
                fullFileName:fullFileName,
                fileType:fileType
            }

            const imageUpload = await uploadFile(dataForUpload);
            imageUrl=imageUpload.signedUrl
        }
        

        
        const updateData : UpdateprofileDto={
            ...req.body,
            image:imageUrl
        }
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