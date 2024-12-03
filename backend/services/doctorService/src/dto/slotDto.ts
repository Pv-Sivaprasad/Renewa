export interface Slot{
    startTime:string,
    endTime:string,
    isAvailable:boolean
}

export interface DateSlotDto{
    date:string,
    slots:Slot[]
}

export interface DocSlotDto{
    docId:string,
    dates:DateSlotDto[]
}