import IOtp from "../../interfaces/Iotp";
import Otp from '../../models/otpModel'
import { BaseRepository } from "../baseRepository";
import IOtpRepository from "../interface/otp.interface";

export class OtpRepository extends BaseRepository<IOtp> implements IOtpRepository{
   
    constructor(){
        super(Otp)
    }

    async createOtp(otpData: IOtp): Promise<IOtp> {
        const newOtp = new this.model(otpData); // Create a new instance using the model
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


    async updateOtpByEmail(email: string, otp: string): Promise<void> {
        await Otp.updateOne({ email }, { otp, createdAt: new Date() });  // Update the OTP and reset creation time
    }
    
    async saveOtp(email: string, otp: string): Promise<void> {
        const newOtp = new Otp({ email, otp });
        await newOtp.save();  // Save the OTP with expiration time
    }

    // In your OtpRepository
async deleteOtpByEmail(email: string): Promise<void> {
    await Otp.deleteOne({ email });  // Correctly find and delete based on email
}


}