import { signInDto, SignUpDto } from "../dto/authDto";
import { SignupResult ,SignInResult} from "../types/authTypes";
import { DoctorRepository } from "../repositories/implementations/DoctorRepository";
import { comparePassword, hashPassword } from "../utils/passwordUtil";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtil";
import {sendDoctorData} from '../events/publishers/doctorPublisher'





export class AuthService{

    private doctorRepository: DoctorRepository;

    constructor(){
        this.doctorRepository= new DoctorRepository()
    }

    async docSignUp(signupDto: SignUpDto): Promise<SignupResult> {
        try {
            console.log('Entering the docSignUp');
            console.log(signupDto, 'signupDto');
            
            const { username, email, password } = signupDto;
    
           
            const existingDoc = await this.doctorRepository.findUserByEmail(email);
            console.log(existingDoc, 'existingDoc');
           
            if (existingDoc ) {
                return { success: false, message: "Doctor already exists" };
            }
    

            const hashedPassword=await hashPassword(password)
            console.log('hashedpassword',hashedPassword);
            
            const savedDoc = await this.doctorRepository.createUser({
                ...signupDto,
                password:hashedPassword
            });
            console.log(savedDoc,'the saved doc is');
            
            const userData={
                docId:savedDoc?.id.toString(),
                docname:savedDoc?.username,
                email:savedDoc?.email,
                speciality:savedDoc?.speciality
            }
            await sendDoctorData(userData).then(()=>{
                console.log('successully send the data to admin ');  
            }).catch((err:any)=>{
                console.log('error while sending',err);
                
            })


            return { success: true, message: 'Registration complete' ,};
        } catch (error) {
            console.error('Error during doctor signup:', error);
            return { success: false, message: 'An error occurred during signup' };
        }
    }
    

    async docSignIn(signInDto:signInDto) : Promise <SignInResult>{
        console.log('entering the docsign in in authservice');
        
        const {email,password}=signInDto
        console.log('the email and password',email,password);

        const doc= await this.doctorRepository.findUserByEmail(email)
        console.log('the doc in the authservice',doc);
        
        if(!doc) {
            return {success:false,message:"invalid doctor Credentials"}
        }

        
        if (doc && doc.isBlocked) {
            return { success: false, message: "Account has been blocked" };
        }

        const isValidPassword=await comparePassword(password,doc.password)
        if (!isValidPassword) {
            return { success: false, message: "Invalid password" };
        }


        const accessToken=generateAccessToken({id:doc.id})
        console.log('the accesstoken is',accessToken);
        const refreshToken=generateRefreshToken({id:doc.id})
        console.log('the accesstoken is',refreshToken);

        return {
            success:true,
            message:"Successfully signed in",
            accessToken,
            refreshToken,
            username:doc.username,
            email:doc.email
        }

    }

    async updateDoctorStatus(docId:string,isBlocked:boolean) : Promise<boolean>{
        console.log('entered the doctor status update in doctor auth service');
        console.log(docId,isBlocked,'data from the doctor consumer');

        try {
            const isUpdated=await this.doctorRepository.updateDocStatus(docId,isBlocked)
            if (!isUpdated) {
                console.log(`User ${docId} not found or status update failed.`);
            }
            return isUpdated
        } catch (error) {
            console.error(`Error in AuthService when updating user ${docId} status:`, error);
            throw error;
        }
        
    }

}