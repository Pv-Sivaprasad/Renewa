export interface SignUpDto{
    username:string,
    email:string,
    password:string,
    experience:number,
    speciality:number

}

export interface signInDto{
    email:string,
    password:string,
}

export interface RefreshDto{
    token:string
}