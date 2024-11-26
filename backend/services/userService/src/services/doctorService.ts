import { IDoctorRepository } from "../repositories/interface/IDoctorRepository";
import { IUserDoctor } from "../models/doctorModel";


export class DoctorService{

    private doctorRepository : IDoctorRepository

    constructor(doctorRepository:IDoctorRepository){
        this.doctorRepository= doctorRepository
    }


    async saveDoctorDetails(doctorData:Partial<IUserDoctor>): Promise<IUserDoctor>{
        return this.doctorRepository.saveDoctor(doctorData as IUserDoctor)
    }

}