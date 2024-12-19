import { UpdateprofileDto } from "../dto/docDto";
import { DoctorRepository } from "../repositories/implementations/DoctorRepository";


export class DoctorService{

    private doctorRespository :  DoctorRepository;


    constructor(){
        this.doctorRespository= new DoctorRepository()
    }


    async updateDoctorProfile(userId:string,updateprofileDto:UpdateprofileDto){
        console.log('the userId in the doccservuce is',userId);
        console.log('the upateprodto is ',updateprofileDto);
        
        console.log('going to updateprofile from doc service');
        return await this.doctorRespository.updateProfile(userId,updateprofileDto)   
    }    


    async getProfileData(userId:string){
        return await this.doctorRespository.findUserById(userId)
    }


}