
export interface SlotDTO {
    docId: string;
    consultationFee:number;
    dates: {
        date: string;
        slots: {
            startTime: string;
            endTime: string;
            isAvailable: boolean;
        }[];
    }[];
}

export interface UpdateSlotDto{
    docId:string,
    date:String,
    slotId:string,
    isAvailable:boolean
}
