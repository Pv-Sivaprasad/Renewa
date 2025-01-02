export interface PaymentDataDto{
    userId:string,
    docId:string,
    slotId:string,
    date:string
}

export interface PaymentServiceDto{
    success:boolean,
    id?:string,
    message:string
}