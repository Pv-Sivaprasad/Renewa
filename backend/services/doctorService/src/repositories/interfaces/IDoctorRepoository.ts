import { IDoctor } from "../../models/doctorModel";
import { UpdateprofileDto } from "../../dto/docDto";


export interface IDoctorRepository{
    createUser(userData:any) : Promise<any>
    updateProfile(userId: string, updateProfileDto: UpdateprofileDto): Promise<IDoctor | null>;
}