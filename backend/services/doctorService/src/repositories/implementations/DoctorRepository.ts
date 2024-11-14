import { IDoctorRepository } from "../interfaces/IDoctorRepoository";
import Doctor, { IDoctor } from "../../models/doctorModel";
import { UpdateprofileDto } from "../../dto/docDto";



export class DoctorRepository implements IDoctorRepository{

    async createUser(data: any) : Promise  <IDoctor | null> {
        
        return await Doctor.create(data)
    }

    async findUserById(docId:string) : Promise<IDoctor | null>{
        return await Doctor.findById(docId)
    }

    async findUserByEmail (email:string) : Promise<IDoctor | null> {
        return await Doctor.findOne({email})

    }

    async updateDocStatus(docId:string,isBlocked:boolean) : Promise<boolean>{
        try {
            console.log(docId,'userId to find in db');
            console.log(isBlocked,'for changing to');

            const result = await Doctor.findOneAndUpdate(
                { _id:docId },               
                { isBlocked },            
                { new: true }            
            );
            if (result) {
                console.log(`User ${docId} status updated to isBlocked: ${isBlocked}`);
                return true;
            } else {
                console.log(`User with userId ${docId} not found.`);
                return false;
            }

        } catch (error) {
            console.error(`Error in updating user status for ${docId}:`, error);
            throw new Error('Failed to update user status');
        }
    }

    async updateProfile(userId:string,updateprofileDto:UpdateprofileDto) : Promise<IDoctor | null> {
        return await Doctor.findByIdAndUpdate(
            userId,
            {$set:updateprofileDto},
            {new:true}
        )
    }
}