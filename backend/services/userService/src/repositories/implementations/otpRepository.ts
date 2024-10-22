import IOtp from "../../interfaces/IOtp";
import Otp from "../../models/otpModel";
import { BaseRepository } from "../baseRepository";
import IOtpRepository from "../interface/otp.interface";


export class OtpRepostitory extends BaseRepository<IOtp> implements IOtpRepository {


    constructor(){
        super(Otp)
    }

    async findOtpByEmail (email:string): Promise<IOtp |null>{
        try {
            const otp=await Otp.findOne({email})
            return otp
        } catch (error) {
            console.log('error in finding the otp by email',error);
            return null
        }
    }

}