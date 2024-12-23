
export interface SlotDTO {
    docId: string;
    docName:string;
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
