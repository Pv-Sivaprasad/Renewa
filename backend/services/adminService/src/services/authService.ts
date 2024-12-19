import { LoginDto,RefreshDto } from "../dto/authDto";
import { IAdmin } from "../models/adminModel";
import { SignInResult ,RefreshType} from "../types/authTypes";
import { AdminRespository } from "../repositories/implementations/AdminRepository";
import bcrypt from 'bcryptjs'
import { generateAccessToken,generateRefreshToken } from "../utils/tokenutil";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

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

    async checkToken(refreshDto:RefreshDto) {
        console.log(refreshDto,'refreshDtor');
        
        console.log('entered the checktoken in authservice admin');
        
        try {

            const token = refreshDto.token;
            console.log('Token received in checkToken:', token);
            
            const secret=process.env.REFRESH_TOKEN_SECRET
            console.log(secret),'sec in the service';
            
            if(!secret){
                return {success:false,message:'nternal Server Error'}
            }
            const decoded=jwt.verify(token,secret)
            console.log('decoed in the  service',decoded);

            if(typeof decoded === 'object' && decoded !== null && 'id' in decoded){
                const newAccessToken=generateAccessToken({id:decoded.id})
                return {success:true,message:"new token created",accessToken:newAccessToken}
                
            }
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
               return {success:false,message:"Refresh token expired, please log in again"}
                
            }
            console.error("Error verifying refresh token:", error);
        }
    }



}