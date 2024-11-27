import { IDoctorRepository } from "../interface/IDoctorRepository";
import Doctor,{IUserDoctor} from "../../models/doctorModel";




export class DoctorRepository implements IDoctorRepository{

    async findDocById(docId:string) {
        return await Doctor.findOne({docId})
        
    }

    async updateDoctor(docId:string,updateData:any){
        return await Doctor.findOneAndUpdate(
            {docId},
            {$set:updateData},
            {new:true}
        )
    }

    async saveDoctor(doctorData: Partial<IUserDoctor>): Promise<IUserDoctor> {
        return await Doctor.create(doctorData);
    }

    async getAllDoctors() {
        return await Doctor.find()
    }
}