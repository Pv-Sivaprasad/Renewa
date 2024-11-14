import { UpdateprofileDto } from "../dto/docDto";
import { DoctorRepository } from "../repositories/implementations/DoctorRepository";


export class DoctorService{

    private doctorRespository :  DoctorRepository;


    constructor(){
        this.doctorRespository= new DoctorRepository()
    }


    async updateDoctorProfile(userId:string,updateprofileDto:UpdateprofileDto){
        return await this.doctorRespository.updateProfile(userId,updateprofileDto)   
    }    



}