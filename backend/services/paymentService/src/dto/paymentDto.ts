export interface PaymentDataDto{
    docId:string,
    slotId:string
}

export interface PaymentServiceDto{
    success:boolean,
    id?:string,
    message:string
}