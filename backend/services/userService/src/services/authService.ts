import { UserRepository } from "../repositories/implementations/userRespository";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { IUser } from "../models/userModel";
import Otp from "../models/otpModel";
import { RegisterDto, LoginDto ,OtpDto} from "../dto/authDto";
import { OtpRepository } from "../repositories/implementations/otpRepository";
import {generateAccessToken,generateRefreshToken} from '../utils/token.util'
import { generateOtp } from "../utils/otp.util";
import { MailService } from "../utils/email.util";
import IOtp from "../interfaces/IOtp";


const mailService= new MailService()



 type SignInResult={
    success:boolean;
    message:string;
    accessToken?:string;
    refreshToken?:string;
}

type otpVerfiyResult={
    success:boolean;
    message:string;
    accessToken?:string;
    refreshToken?:string;
}

export class AuthService {

    private userRespository: UserRepository;
    private otpRepository:OtpRepository

    constructor() {
        this.userRespository = new UserRepository()
        this.otpRepository= new OtpRepository()
    }


    async registerUser(registerData: RegisterDto): Promise<{ success: boolean; message: string }> {
        console.log('reached register user in the authService');
        
        const { username, email, password } = registerData
        console.log(registerData);
        
        const exsistingUser = await this.userRespository.findUserByEmail(email)

        if (exsistingUser) throw new Error('User already exists')

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await this.userRespository.createUser({
            username,
            email,
            password: hashedPassword
        } as IUser)

        const otp=generateOtp()
        console.log('otp generated in registerUser authsrvice',otp);
        await mailService.sendOtpEmail(email,otp)
        await this.otpRepository.create({email,otp} as IOtp)
        
        return {success:true,message:"Email with otp has forwarded"}
    }


    async verifyOtpUser(otpData:OtpDto) : Promise<otpVerfiyResult| string> {

        const email=otpData.email

        const validuser=await this.userRespository.findUserByEmail(email)
        console.log(validuser,'the valid user in verifyOtpuser in authservice');
         
        if(!validuser) return {success:false,message:"Email is not yet registered"}

        const getOtp=await this.otpRepository.findOtpByEmail(email)
        console.log(getOtp,'the get otp from the email and db');
        
        if(!getOtp)  return {success:false,message:"No otp for this email"}

        if(getOtp.otp===otpData.otp){
            await this.userRespository.verifyUser(email,true)
            await this.otpRepository.deleteOtpByEmail(email)

            const accessToken=generateAccessToken({id: validuser.id.toString()})
            const refreshToken=generateRefreshToken({id:validuser.id.toString()})
            console.log(accessToken,'the token created for the user');
            console.log(refreshToken,'the refresh token created for the user');
            return {success:true,message:"Verification complete",accessToken,refreshToken}
        }else{
            return {success:false,message:"the otp verfication failed"}
        }
        
    }


    async loginUser(loginData: LoginDto): Promise< SignInResult | string> {

        const { email, password } = loginData
        console.log(email,password,'in the loginUser in authService');
        
        const user = await this.userRespository.findUserByEmail(email)
        console.log(user,'this is the user that found from database in user from authService');
        
        if (!user) {
            throw new Error('Invalid Credentials')
        }
        
        const isValidPassword = await bcrypt.compare(password, user.password)
        console.log(isValidPassword,'the password');
        
        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }

       
        
        const accessToken=generateAccessToken({id: user.id.toString()})
        const refreshToken=generateRefreshToken({id:user.id.toString()})
        console.log(accessToken,'the token created for the user');
        console.log(refreshToken,'the refresh token created for the user');
        


        return {success:true,message:"sign in successfully completed",accessToken,refreshToken}
    }

}

