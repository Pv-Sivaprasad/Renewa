import { IDoctorRepository } from "../interface/IDoctorRepository";
import Doctor,{IUserDoctor} from "../../models/doctorModel";




export class DoctorRepository implements IDoctorRepository{

    async findDocById(docId:string) {
        let docData= await Doctor.findOne({docId})
        console.log(docData,'+++++++++');
        return docData
        
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
    
    async updateStatus(docId:string,isBlocked:boolean){
        return await Doctor.findOneAndUpdate(
            {docId},
            {isBlocked},
            {new:true}
            
        )
    }
}