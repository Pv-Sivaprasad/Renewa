import { UserRepository } from "../repositories/implementations/userRespository";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { IUser } from "../models/userModel";
import Otp from "../models/otpModel";
import { RegisterDto, LoginDto, OtpDto, GoogleDto, ForgetPasswordDto, ResetDto, ResendOtpDto,UpdateUser } from "../dto/authDto";
import { OtpRepository } from "../repositories/implementations/otpRepository";
import { generateAccessToken, generateRefreshToken } from '../utils/token.util'
import { generateOtp } from "../utils/otp.util";
import { MailService } from "../utils/email.util";
import IOtp from "../interfaces/Iotp";
import { hashPassword, randomPassword } from "../utils/password.util";
import { SignInResult, OtpVerfiyResult, ForgetResult, ResetResult, ResendOtpResult } from "../types/authTypes";
import { addMinutes, isAfter } from 'date-fns';
import { sendUserData } from "../events/rabbitmq/userPublisher";

const mailService = new MailService()



export class AuthService {

    private userRespository: UserRepository;
    private otpRepository: OtpRepository

    constructor() {
        this.userRespository = new UserRepository()
        this.otpRepository = new OtpRepository()
    }



    async registerUser(registerData: RegisterDto): Promise<{ success: boolean; message: string }> {
       

        const { username, email, password } = registerData;
        console.log(registerData);


        const existingUser = await this.userRespository.findUserByEmail(email);


        if (existingUser && existingUser.isVerified) {
            return { success: false, message: 'User already registered with this email . Please login.' };
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
        console.log('the new user in the authservice is ',newUser);
        
        
        const userData = {
            userId: newUser.id.toString(),  
            username: newUser.username,
            email: newUser.email,
        };
        await sendUserData(userData).then(()=>{   
        }).catch((err)=>{
            console.log('not send',err);
            
        })


        const otp = generateOtp();
        await mailService.sendOtpEmail(email, otp);
        await this.otpRepository.create({ email, otp } as IOtp);
        return { success: true, message: 'Email with OTP has been sent.' };
    }


    async verifyOtpUser(otpData: OtpDto): Promise<OtpVerfiyResult | string> {

        const email = otpData.email
        const otp=otpData.otp
        console.log(otp);
        
        const validuser = await this.userRespository.findUserByEmail(email)
        console.log(validuser, 'the valid user in verifyOtpuser in authservice');

        if (!validuser) return { success: false, message: "Email is not yet registered" }

        const getOtp = await this.otpRepository.findOtpByEmail(email)
        console.log(getOtp, 'the get otp from the email and db');

        if (!getOtp) return { success: false, message: "No otp for this email" }

        if (getOtp.otp === otpData.otp) {
            console.log('reached here');
            
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


    async resendTheOtp (resendOtpData:ResendOtpDto) : Promise<ResendOtpResult|string> {
        console.log('entering the resendotp service');
        
      try {
        const email=resendOtpData.email

        const otp=generateOtp()
        const existingOtp=await this.otpRepository.findOneByEmail(email)

        if(existingOtp){
            await this.otpRepository.updateOtpByEmail(email,otp)
            console.log('new otp updated ',otp,email);
            
        }else{
            await this.otpRepository.create({email,otp} as IOtp)
            console.log('new otp created ',otp);
            
        }

        await mailService.sendOtpEmail(email,otp)

        return { success: true, message: 'A new OTP has been sent to your email.' };
      } catch (error) {
        console.log('error in resend otp',error);
        return {success:false,message:'error occured while resending otp'}
        
      }
    }

    async loginUser(loginData: LoginDto): Promise<SignInResult | string> {

        const { email, password } = loginData
        console.log(email, password, 'in the loginUser in authService');

        const user = await this.userRespository.findUserByEmail(email)
        console.log(user, 'this is the user that found from database in user from authService');

        if (!user) {
            return { success: false, message: 'Invalid Credentials' }
        }

        const isValidPassword = await bcrypt.compare(password, user.password)
        console.log(isValidPassword, 'the password');

        if (!isValidPassword) {
            return { success: false, message: 'Invalid Credentials' }
        }

        if(user.isBlocked){
            return {success:false,message:"Account issues please contact admin team"}
        }



        const accessToken = generateAccessToken({ id: user.id.toString() })
        const refreshToken = generateRefreshToken({ id: user.id.toString() })
        console.log(accessToken, 'the token created for the user');
        console.log(refreshToken, 'the refresh token created for the user');


        return {
            success: true,
            message: "Sign in successfully completed",
            accessToken,
            refreshToken,
            username: user.username,
            email: user.email
        };

    }


    async SignInWithGoogle(googleDto: GoogleDto): Promise<SignInResult | string> {

        const email = googleDto.email
        console.log(googleDto, 'googleDto');
        const username = googleDto.username
        console.log(username, 'username');


        try {
            let userData = await this.userRespository.findUserByEmail(email)
            console.log(userData, 'userData in try');

            if (userData) {
                const accessToken = generateAccessToken({ id: userData.id.toString() })
                const refreshToken = generateRefreshToken({ id: userData.id.toString() })
                console.log(accessToken, 'the token created for the user with google sign in');
                console.log(refreshToken, 'the refresh token created for the user google sign in');
                console.log('the userData exist in authservice is ',userData);
                return { success: true,
                     message: "successfully signed with google",
                      accessToken, 
                      refreshToken, 
                    username:userData.username,
                    email:userData.email
                }
            }
            

            const password = randomPassword
            console.log('random password is ', password);

            const hashedPassword = await hashPassword(password)
            console.log(hashedPassword, 'hashedPassword');


            let newUser = await this.userRespository.createUser({
                username: username,
                email: email,
                password: hashedPassword,
                isVerified: true
            } as IUser)

            console.log(newUser, 'the new user that was created');

            const accessToken = generateAccessToken({ id: newUser.id.toString() })
            const refreshToken = generateRefreshToken({ id: newUser.id.toString() })
            console.log(accessToken, 'the token created for the  newuser with google sign in');
            console.log(refreshToken, 'the refresh token created for the newuser google sign in');

            return {
                success: true,
                message: "successfully signed with google",
                accessToken,
                refreshToken,
                username:newUser.username,
                email:newUser.email 
            }

        } catch (error) {
            console.log('error with sign in ', error);

            return { success: false, message: "error while signing with google" }
        }



    }


    async forgetPassword(forgetDto: ForgetPasswordDto): Promise<ForgetResult | string> {
        const email = forgetDto.email;

        const user = await this.userRespository.findUserByEmail(email);
        if (!user) {
            return { success: false, message: "Invalid Email Id" };
        }

        const otp = generateOtp();
        console.log('The OTP generated for forget password:', otp);

        
        const existingOtpRecord = await this.otpRepository.findOneByEmail(email);

        const isExpired = existingOtpRecord && isAfter(new Date(), addMinutes(existingOtpRecord.createdAt, 5));

        if (existingOtpRecord && !isExpired) {
          
            await this.otpRepository.updateOtpByEmail(email, otp);
        } else {
           
            await this.otpRepository.create({ email, otp } as IOtp);
        }

       
        await mailService.sendOtpEmail(email, otp);

        return { success: true, message: "OTP sent for changing password" };
    }

    async resetPassword(resetDto: ResetDto): Promise<ResetResult | string> {

        console.log(resetDto, 'the reset dto');

        const email = resetDto.email
        const password = resetDto.password

        const user = await this.userRespository.findUserByEmail(email)
        console.log('the user from db in resetpassword', user);

        if (!user) return { success: false, message: "Invalide User details" }

        const getOtp = await this.otpRepository.findOtpByEmail(email)
        console.log('the otp for the user from the db', getOtp);

        if (!getOtp) return { success: false, message: "No valid otp found please try again later" }


        const storedOtp = getOtp.otp.trim();
        if (storedOtp !== resetDto.otp.trim()) {
            return { success: false, message: "Invalid OTP. Please try again." };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('the hashed password', hashedPassword);

        const changedPassword = await this.userRespository.UpdatePassword(email, 'password', hashedPassword)
        console.log('the changed password is ', changedPassword);


        if (!changedPassword) {
            return { success: false, message: "failed to update the password" }
        }

        return { success: true, message: "password successfully changed" }



    }

    async updateUserStatus(userId:string,isBlocked:boolean) : Promise <boolean> {

        console.log('this is the updateuserstatus in auth service of user');
        console.log(userId,isBlocked,'this is from the userocnsumer in the service');
    
        try {
            const isUpdated=await this.userRespository.updateUserStatus(userId,isBlocked)
            if (!isUpdated) {
                console.log(`User ${userId} not found or status update failed.`);
            }

            return isUpdated;
        } catch (error) {
            console.error(`Error in AuthService when updating user ${userId} status:`, error);
            throw error;
        }

    }

}

