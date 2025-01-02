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

export type PaginateType={
    users:object,
    total:number
    page:number
    limit:number
    totalPages: number
}