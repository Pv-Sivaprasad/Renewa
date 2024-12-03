export type SignupResult={
    success:boolean,
    message:string,
    
}

export type SignInResult={
    success:boolean,
    message:string,
    username?: string;             
    email?: string; 
    accessToken?:string,
    refreshToken?:string
}

export type UploadType={
    fileContent:Buffer,
    fullFileName:string,
    fileType:string
}