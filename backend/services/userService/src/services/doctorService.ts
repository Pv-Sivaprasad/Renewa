// import { IDoctorRepository } from "../repositories/interface/IDoctorRepository";
import { DoctorRepository } from "../repositories/implementations/doctorRepository";
import { IUserDoctor } from "../models/doctorModel";
import { UpdateDocData } from "../dto/userDto";

const userDoctorRepository= new DoctorRepository() 

export class DoctorService{

    async getDoctorByDocId(docId:string){
        return userDoctorRepository.findDocById(docId)
    }

    async updateDoctorDetails(docId:string,updateData:UpdateDocData){
        return await userDoctorRepository.updateDoctor(docId,updateData)
    }

    async saveDoctorDetails(doctorData:Partial<IUserDoctor>): Promise<IUserDoctor>{
        return userDoctorRepository.saveDoctor(doctorData)
    }

    async allDoctorsList(){
        let doctors= await userDoctorRepository.getAllDoctors()
        return   doctors.filter((doctor: any) => !doctor.isBlocked);
       
    }

    async updateDocStatus(docId:string,isBlocked:boolean){
        let data= await userDoctorRepository.updateStatus(docId,isBlocked)
        
      

        
    }
}