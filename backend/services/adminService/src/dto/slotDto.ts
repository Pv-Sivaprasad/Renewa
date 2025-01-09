
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

export interface IDoctorSlot {
    date: string;
    slots: string[]; 
    _id: string; 
  }
  
  export interface IDoctorWithSlots {
    _id: string; 
    docId: string; 
    docName: string;
    dates: IDoctorSlot[]; 
    __v: number; 
  }
 