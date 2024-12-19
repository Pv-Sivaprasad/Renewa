export interface LoginDto{
    email:string,
    password:string
}

export interface RefreshDto{
    token:string
}

export interface updatedDocDto{
    docId?:string,
    docname?:string,
    experience?:string,
    speciality?:string,
}

export interface UserDataDto{
    userId?:string,
    username?:string,
    email?:string
}