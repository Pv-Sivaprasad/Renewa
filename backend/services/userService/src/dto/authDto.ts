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
    otp:string,
    email:string,
    password:string
}