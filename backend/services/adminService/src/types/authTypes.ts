export type SignInResult={
    success:boolean,
    message:string,
    accessToken?:string,
    refreshToken?:string
}

export type RefreshType={
    success:boolean,
    message:string,
    accessToken?:string,
    refreshToken?:string

}
