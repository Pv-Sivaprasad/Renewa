export interface PaymentDataDto{
    userId:string,
    docId:string,
    startTime:string,
    date:string
}

export interface PaymentServiceDto{
    success:boolean,
    id?:string,
    message:string
}