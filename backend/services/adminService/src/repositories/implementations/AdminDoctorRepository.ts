import { IAdminDoctorRepository } from "../interfaces/IAdminDoctorRepository";
import AdminDoctorModel from '../../models/doctorModel'
import { Doctor } from "../../types/User";



export class AdminDoctorRepository implements IAdminDoctorRepository {

    async saveDoctor(data: { docId:string;docname:string;email:string;speciality:string }): Promise<void> {
        try {
            const newDoc= await AdminDoctorModel.create(data)
            await newDoc.save()
            console.log('savedDoc',newDoc);
            
        } catch (error) {
            console.error('Error saving user to admin database:', error);
            throw new Error('Failed to save user in admin database');
        }
    }

}