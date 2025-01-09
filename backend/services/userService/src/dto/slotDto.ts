
export interface SlotDTO {
    docId: string;
    docName:string
    consultationFee:number;
    dates: {
        date: string;
        slots: {
            _id: any;
            startTime: string;
            endTime: string;
            isAvailable: boolean;
        }[];
    }[];
}

export interface Slot{
    startTime:string,
    endTime:string,
    isAvailable:boolean,
    
  
}

export interface DateSlotDto{
    date:string,
    slots:Slot[]
}

export interface DocSlotDto{
    docId:string,
    docName:string,
    consultationFee: number;
    dates:DateSlotDto[],
}


export interface Slot{
    startTime:string,
    endTime:string,
    isAvailable:boolean,
    
  
}

export interface DateSlotDto{
    date:string,
    slots:Slot[]
}

export interface DocSlotDto{
    docId:string,
    docName:string,
    consultationFee: number;
    dates:DateSlotDto[],
}