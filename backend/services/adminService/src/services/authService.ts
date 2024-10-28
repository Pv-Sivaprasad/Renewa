import { LoginDto } from "../dto/authDto";
import { IAdmin } from "../models/adminModel";
import { SignInResult } from "../types/authTypes";
import { AdminRespository } from "../repositories/implementations/AdminRepository";
import bcrypt from 'bcryptjs'
import { generateAccessToken,generateRefreshToken } from "../utils/tokenutil";


const adminRepository=new AdminRespository()

export class AuthService{

    private adminRepository:AdminRespository


    constructor(){
        this.adminRepository=new AdminRespository()
    }

    async loginAdmin(loginDto:LoginDto) : Promise<SignInResult|string>{

        console.log('entering the loginadmin in authservice of admin');
        const email=loginDto.email
        const password=loginDto.password
        console.log('the email and password in auth service of admin',email,password);
        

        try {
            const admin=await adminRepository.findByEmail(email)
            console.log('the admin from db in authservice',admin);
            
            if(!admin){
                return {success:false,message:"This admin data is not enabled"}
            }

            const isValidPassword=await bcrypt.compare(password,admin.password)
            if(!isValidPassword){
                return {success:false,message:'Invalid Credentials'}
            }

            const accessToken=generateAccessToken({id:admin.id})
            console.log('the accesstoken is',accessToken);
            const refreshToken=generateRefreshToken({id:admin.id})
            console.log('the accesstoken is',refreshToken);
            
            console.log('it is going to  frontend ');
            

            return {success:true,message:"login Successfull",accessToken,refreshToken}


        } catch (error) {
                console.log('error in the auth sevice',error);
                
        }
        


        return {success:true,message:'successfully logged in'}
    }



}