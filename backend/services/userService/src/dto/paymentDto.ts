export interface PaymentDto{
    docId:string,
    date:string,
    amount:number,
    slot: {
        slotId: string;
        startTime: string;
        endTime: string;
    };
    userId:string,
}

export interface PaymentDataDto{
    userId:string,
    doctorId:string,
    slotId:string,
    amount:number,
    paymentIntentId:string,
    paymentStatus:string,
}