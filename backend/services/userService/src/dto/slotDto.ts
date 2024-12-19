
export interface SlotDTO {
    docId: string;
    dates: {
        date: string;
        slots: {
            startTime: string;
            endTime: string;
            isAvailable: boolean;
        }[];
    }[];
}
