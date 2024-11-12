import { IDoctorRepository } from "../interfaces/IDoctorRepoository";
import Doctor, { IDoctor } from "../../models/doctorModel";



export class DoctorRepository implements IDoctorRepository{

    async createUser(data: Partial<{ username: string; email: string; password: string }>) : Promise  <IDoctor | null> {
        
        return await Doctor.create(data)
    }

    async findUserByEmail (email:string) : Promise<IDoctor | null> {
        return await Doctor.findOne({email})

    }

}