import { UserRepository } from "../repositories/implementations/userRespository";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { IUser } from "../models/userModel";
import Otp from "../models/otpModel";
import { RegisterDto, LoginDto, OtpDto, GoogleDto } from "../dto/authDto";
import { OtpRepository } from "../repositories/implementations/otpRepository";
import { generateAccessToken, generateRefreshToken } from '../utils/token.util'
import { generateOtp } from "../utils/otp.util";
import { MailService } from "../utils/email.util";
import IOtp from "../interfaces/Iotp";
import { hashPassword, randomPassword } from "../utils/password.util";


const mailService = new MailService()



type SignInResult = {
    success: boolean;
    message: string;
    accessToken?: string;
    refreshToken?: string;
}

type otpVerfiyResult = {
    success: boolean;
    message: string;
    accessToken?: string;
    refreshToken?: string;
}

export class AuthService {

    private userRespository: UserRepository;
    private otpRepository: OtpRepository

    constructor() {
        this.userRespository = new UserRepository()
        this.otpRepository = new OtpRepository()
    }
    async registerUser(registerData: RegisterDto): Promise<{ success: boolean; message: string }> {
        console.log('Reached register user in the authService');

        const { username, email, password } = registerData;
        console.log(registerData);


        const existingUser = await this.userRespository.findUserByEmail(email);


        if (existingUser && existingUser.isVerified) {
            return { success: false, message: 'User already registered and verified. Please login.' };
        }


        if (existingUser && !existingUser.isVerified) {

            const getOtp = await this.otpRepository.findOtpByEmail(email);

            if (getOtp) {

                const currentTime = new Date().getTime();
                const expirationTime = new Date(getOtp.createdAt).getTime() + 5 * 60 * 1000;


                if (currentTime < expirationTime) {
                    return { success: false, message: 'OTP is still valid. Please verify using the same OTP.' };
                } else {

                    const newOtp = generateOtp();
                    await this.otpRepository.updateOtpByEmail(email, newOtp);
                    await mailService.sendOtpEmail(email, newOtp);
                    return { success: false, message: 'OTP expired. A new OTP has been sent to your email.' };
                }
            } else {

                const newOtp = generateOtp();
                await this.otpRepository.create({ email, otp: newOtp } as IOtp);
                await mailService.sendOtpEmail(email, newOtp);
                return { success: false, message: 'No OTP found. A new OTP has been sent to your email.' };
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userRespository.createUser({
            username,
            email,
            password: hashedPassword,
        } as IUser);


        const otp = generateOtp();
        console.log('OTP generated in registerUser authService:', otp);
        await mailService.sendOtpEmail(email, otp);
        await this.otpRepository.create({ email, otp } as IOtp);
        return { success: true, message: 'Email with OTP has been sent.' };
    }



    async verifyOtpUser(otpData: OtpDto): Promise<otpVerfiyResult | string> {

        const email = otpData.email

        const validuser = await this.userRespository.findUserByEmail(email)
        console.log(validuser, 'the valid user in verifyOtpuser in authservice');

        if (!validuser) return { success: false, message: "Email is not yet registered" }

        const getOtp = await this.otpRepository.findOtpByEmail(email)
        console.log(getOtp, 'the get otp from the email and db');

        if (!getOtp) return { success: false, message: "No otp for this email" }

        if (getOtp.otp === otpData.otp) {
            await this.userRespository.verifyUser(email, true)
            await this.otpRepository.deleteOtpByEmail(email)

            const accessToken = generateAccessToken({ id: validuser.id.toString() })
            const refreshToken = generateRefreshToken({ id: validuser.id.toString() })
            console.log(accessToken, 'the token created for the user');
            console.log(refreshToken, 'the refresh token created for the user');
            return { success: true, message: "Verification complete", accessToken, refreshToken }
        } else {
            return { success: false, message: "the otp verfication failed" }
        }

    }


    async loginUser(loginData: LoginDto): Promise<SignInResult | string> {

        const { email, password } = loginData
        console.log(email, password, 'in the loginUser in authService');

        const user = await this.userRespository.findUserByEmail(email)
        console.log(user, 'this is the user that found from database in user from authService');

        if (!user) {
            throw new Error('Invalid Credentials')
        }

        const isValidPassword = await bcrypt.compare(password, user.password)
        console.log(isValidPassword, 'the password');

        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }



        const accessToken = generateAccessToken({ id: user.id.toString() })
        const refreshToken = generateRefreshToken({ id: user.id.toString() })
        console.log(accessToken, 'the token created for the user');
        console.log(refreshToken, 'the refresh token created for the user');



        return { success: true, message: "sign in successfully completed", accessToken, refreshToken }
    }


    async SignInWithGoogle(googleDto: GoogleDto): Promise<SignInResult | string> {

        const email = googleDto.email
        console.log(googleDto,'googleDto');
        const username=googleDto.username
        console.log(username,'username');
        

        try {
            let userData = await this.userRespository.findUserByEmail(email)
            console.log(userData,'userData in try');
            
            if (userData) {
                const accessToken = generateAccessToken({ id: userData.id.toString() })
                const refreshToken = generateRefreshToken({ id: userData.id.toString() })
                console.log(accessToken, 'the token created for the user with google sign in');
                console.log(refreshToken, 'the refresh token created for the user google sign in');
                return { success: true, message: "successfully signed with google" ,accessToken,refreshToken}
            }

            const password=randomPassword
            console.log('random password is ',password);

            const hashedPassword=await hashPassword(password)
            console.log(hashedPassword,'hashedPassword');
            

            let newUser=await this.userRespository.createUser({
                username:username,
                email:email,
                password:hashedPassword,
                isVerified:true
            }as IUser)

            console.log(newUser,'the new user that was created');
            
            const accessToken = generateAccessToken({ id: newUser.id.toString() })
                const refreshToken = generateRefreshToken({ id: newUser.id.toString() })
                console.log(accessToken, 'the token created for the  newuser with google sign in');
                console.log(refreshToken, 'the refresh token created for the newuser google sign in');
                return { success: true, message: "successfully signed with google" ,accessToken,refreshToken}

        } catch (error) {
            console.log('error with sign in ',error);
            
            return { success: false, message: "error while signing with google" }
        }



    }




}

