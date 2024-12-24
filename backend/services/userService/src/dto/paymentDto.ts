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
    docId:string,
    slotId:string,
    amount:number,
    paymentIntent:string,
    paymentStatus:string,
}