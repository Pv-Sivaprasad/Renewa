export interface PaymentDataDto{
    userId:string,
    docId:string,
    startTime:string,
    date:string,
    userName:string
}

export interface PaymentServiceDto{
    success:boolean,
    id?:string,
    message:string
}