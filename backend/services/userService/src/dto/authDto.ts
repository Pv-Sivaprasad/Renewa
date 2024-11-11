export interface RegisterDto{
    username:string;
    email:string;
    password:string;
    
}

export interface LoginDto{
    email:string,
    password:string
}

export interface OtpDto{
    email:string,
    otp:string
}

export interface GoogleDto{
    username:string
    email:string,
}

export interface ForgetPasswordDto{
    email:string
}

export interface ResetDto{
    email:string,
    otp:string,
    password:string
}

export interface ResendOtpDto{
    email:string
}

export interface UpdateUser {
    userid:string,
    isBlocked:boolean
}


