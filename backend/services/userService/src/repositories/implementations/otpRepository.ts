import IOtp from "../../interfaces/IOtp";
import Otp from '../../models/otpModel'
import { BaseRepository } from "../baseRepository";
import IOtpRepository from "../interface/otp.interface";

export class OtpRepository extends BaseRepository<IOtp> implements IOtpRepository{
   
    constructor(){
        super(Otp)
    }

    async createOtp(otpData: IOtp): Promise<IOtp> {
        const newOtp = new this.model(otpData); 
        return await newOtp.save(); 
    }

    async findOtpByEmail(email: string): Promise<IOtp | null> {
        try {
            return await this.model.findOne({ email }); 
        } catch (error) {
            console.error('Error in finding the OTP by email:', error);
            return null; 
        }
    }

}