import { IDoctorRepository } from "../interface/IDoctorRepository";
import Doctor,{IUserDoctor} from "../../models/doctorModel";

export class DoctorRepository implements IDoctorRepository{
    async saveDoctor(doctorData: IUserDoctor): Promise<IUserDoctor> {
        return await Doctor.create(doctorData)
        
    }
}