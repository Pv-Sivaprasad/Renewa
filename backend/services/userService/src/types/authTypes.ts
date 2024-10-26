export type SignInResult = {
    success: boolean;
    message: string;
    accessToken?: string;         
    refreshToken?: string;         
    username?: string;             
    email?: string;                
};


export type OtpVerfiyResult = {
    success: boolean;
    message: string;
    accessToken?: string;
    refreshToken?: string;
}

export type ForgetResult={
    success:boolean,
    message:string
}


export type ResetResult={
    success:boolean,
    message:string
}