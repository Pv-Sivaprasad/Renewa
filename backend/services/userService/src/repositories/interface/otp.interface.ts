import IOtp from "../../interfaces/Iotp";

export default interface IOtpRepository {

    createOtp(otpData: IOtp): Promise<IOtp>;
    
    findOtpByEmail(email: string): Promise<IOtp | null>;
    
}