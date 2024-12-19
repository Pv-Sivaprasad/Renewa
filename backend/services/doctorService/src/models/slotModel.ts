import mongoose, { Schema, Document } from 'mongoose'



export interface Slot {
    startTime: string,
    endTime: string,
    isAvailable: boolean
}

export interface DateSlot {
    date: string,
    slots: Slot[];

}

export interface DocSlot extends Document {
    docId: string,
    docName:string
    dates: DateSlot[]
}

const SlotSchema: Schema = new Schema({
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
})

const DateSlotSchema = new Schema<DateSlot>({
    date:
    {
        type: String,
        required: true
    },
    slots:
    {
        type: [SlotSchema],
        required: true
    },
});

const DocSlotSchema = new Schema<DocSlot>({
    docId:
    {
        type: String,
        required: true
    },
    docName:{
        type:String,
        required:true
    },
    dates:
    {
        type: [DateSlotSchema],
        required: true
    },
});


export default mongoose.model<DocSlot>('DocSlot', DocSlotSchema)