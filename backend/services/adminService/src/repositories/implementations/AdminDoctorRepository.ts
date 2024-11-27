import { IAdminDoctorRepository } from "../interfaces/IAdminDoctorRepository";
import AdminDoctorModel, { IAdminDoctor } from '../../models/doctorModel'
import { Doctor } from "../../types/User";
import  { updatedDocDto } from '../../dto/authDto'


export class AdminDoctorRepository implements IAdminDoctorRepository {

    async updateDoctor(docId:string,data:updatedDocDto){
        await AdminDoctorModel.findOneAndUpdate({
           docId},
           {$set:data},{new:true}
        )
    }

    async saveDoctor(data: { docId:string;docname:string;email:string;speciality:string }): Promise<void> {
        try {
            const newDoc= await AdminDoctorModel.create(data)
            await newDoc.save()
            console.log('savedDoc',newDoc);
            
        } catch (error) {
            console.error('Error saving doctor to admin database:', error);
            throw new Error('Failed to save user in admin database');
        }
    }

    async getAllDoctors(): Promise<any[]> { 
        console.log('entering the get all users in admin user repository');
        try {
            const users = await AdminDoctorModel.find(); 
            return users; 
        } catch (error) {
            console.error('Error fetching all users from admin DB:', error);
            throw new Error('Failed to fetch users');
        }
    }
   
    async findDoctor(docId:any) : Promise <IAdminDoctor | null>{
        console.log('this is in findoctor',docId);
        let result = await AdminDoctorModel.findOne({docId})
        console.log('result in the ______',result);
        
        return result
    }

    async findDoctorById(docId:string) : Promise <IAdminDoctor | null >{
        console.log('entering the finddoc by id',docId);

        return await AdminDoctorModel.findOne({docId})
        
    }

    async save(docData:Doctor) {
        const updateDoctorStatus=await AdminDoctorModel.findOneAndUpdate(
         {docId:docData.docId},
         {$set:{isBlocked:docData.isBlocked}},
         {new:true}
        )
        return updateDoctorStatus ? (updateDoctorStatus.toObject() as Doctor) : null;
       }

}