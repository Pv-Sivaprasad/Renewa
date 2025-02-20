import mongoose, { model,Schema,Document } from "mongoose";

interface ISlot{
    startTime:string,
    endTime:string,
    isAvailable:boolean
}

interface IDates {
    date: string;
    slots: ISlot[];
}

export interface IAdminSlot extends Document {
    docId: string;
    docName:string;
    dates: IDates[];
}

const SlotSchema = new Schema<ISlot>({

    startTime:
     { 
        type: String, 
        required: true 
    },
    endTime: 
    { 
        type: String, 
        required: true 
    },
    isAvailable: 
    { 
        type: Boolean, 
        default: true 
    },
});

const DateSchema = new Schema<IDates>({
    date: { type: String, required: true },
    slots: { type: [SlotSchema], required: true },
});

const AdminSlotSchema = new Schema<IAdminSlot>({
    docId: { type: String, required: true },
    docName:{type:String,required:true},
    dates: { type: [DateSchema], required: true },
});

export const AdminDocSlotModel = model<IAdminSlot>('AdminDocSlot', AdminSlotSchema);


