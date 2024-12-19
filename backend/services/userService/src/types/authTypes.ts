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
  
}

export type ForgetResult={
    success:boolean,
    message:string
}


export type ResetResult={
    success:boolean,
    message:string
}

export type ResendOtpResult={
    success:boolean,
    message:string
}

export type UploadType={
    fileContent:Buffer,
    fullFileName:string,
    fileType:string
}