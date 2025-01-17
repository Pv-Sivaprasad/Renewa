import mongoose, { model, Schema, Document } from "mongoose";


interface ISlot {
    _id: any;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
    isBlocked:boolean;
}


interface IDates {
    date: string;
    slots: ISlot[];
}


export interface IDocSlot extends Document {
    docId: string;
    consultationFee: number;
    dates: IDates[];
}


const SlotSchema = new Schema<ISlot>({
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    isBlocked:{type:Boolean,default:false}
});


const DateSchema = new Schema<IDates>({
    date: { type: String, required: true },
    slots: { type: [SlotSchema], required: true }
});


const DocSlotSchema = new Schema<IDocSlot>({
    docId: { type: String, required: true },
    consultationFee: { type: Number, required: true, default: 300 }, 
    dates: { type: [DateSchema], required: true }
});


export const DocSlotModel = model<IDocSlot>('DocSlot', DocSlotSchema);
