import { SignUpDto } from "../dto/authDto";
import { SignupResult } from "../types/authTypes";
import { DoctorRepository } from "../repositories/implementations/DoctorRepository";






export class AuthService{

    private doctorRepository: DoctorRepository;

    constructor(){
        this.doctorRepository= new DoctorRepository()
    }


    async docSignUp (sigupDto:SignUpDto) : Promise<SignupResult> {

        console.log('entering the docsignup ');
        

        console.log(sigupDto,'signupDto');
        
        const {username,email,password}=sigupDto

        const existingDoc=await  this.doctorRepository.findUserByEmail(email)
        console.log(existingDoc,'existing');
        
        if(existingDoc && !existingDoc.isVerified  ){
            return {success:false,message:"Doctor already exist"}
        }
        if(!existingDoc?.isCompleted){
            return {success:false,message:"Certification not completed"}
        }

        const saveDoc=await this.doctorRepository.createUser(sigupDto)

        return {success:true,message:'Registeration complete'}

    }

}