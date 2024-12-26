
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
