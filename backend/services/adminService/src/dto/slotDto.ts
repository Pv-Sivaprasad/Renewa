
export interface SlotDTO {
    docId: string;
    docName:string;
    dates: {
        date: string;
        slots: {
            startTime: string;
            endTime: string;
            isAvailable: boolean;
        }[];
    }[];
}
