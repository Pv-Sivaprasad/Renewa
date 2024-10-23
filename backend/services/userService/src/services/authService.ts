import { UserRepository } from "../repositories/implementations/userRespository";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { IUser } from "../models/userModel";
import Otp from "../models/otpModel";
import { RegisterDto, LoginDto } from "../dto/authDto";
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


export class AuthService {

    private userRespository: UserRepository;
    private otpRepository:OtpRepository

    constructor() {
        this.userRespository = new UserRepository()
        this.otpRepository= new OtpRepository()
    }


    async registerUser(registerData: RegisterDto): Promise<IUser> {
        const { username, email, password } = registerData

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
        
        return newUser
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

