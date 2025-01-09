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
    docName:string,
    consultationFee: number;
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
    consultationFee:{
        type:Number
    }
});


export default mongoose.model<DocSlot>('DocSlot', DocSlotSchema)

// import mongoose, { model, Schema, Document } from "mongoose";

// // Interfaces
// export interface ISlot {
//     _id: mongoose.Types.ObjectId; // Store the original ObjectId
//     startTime: string;
//     endTime: string;
//     isAvailable: boolean;
// }

// export interface IDates {
//     _id: mongoose.Types.ObjectId;
//     date: string;
//     slots: ISlot[];
// }

// export interface IUserDocSlot extends Document {
//     docId: string;
//     consultationFee: number;
//     dates: IDates[];
// }

// // Schemas
// const SlotSchema = new Schema<ISlot>({
//     _id: { type: Schema.Types.ObjectId }, // Allow passing existing ObjectId
//     startTime: {
//         type: String,
//         required: true
//     },
//     endTime: {
//         type: String,
//         required: true
//     },
//     isAvailable: {
//         type: Boolean,
//         default: true
//     },
// }, { _id: false }); // Disable auto-generation of _id

// const DateSchema = new Schema<IDates>({
//     _id: { type: Schema.Types.ObjectId }, // Allow passing existing ObjectId
//     date: { type: String, required: true },
//     slots: { type: [SlotSchema], required: true },
// }, { _id: false }); // Disable auto-generation of _id

// const UserDocSlotSchema = new Schema<IUserDocSlot>({
//     docId: { type: String, required: true },
//     dates: { type: [DateSchema], required: true },
//     consultationFee: { type: Number }
// });

// export const UserDocSlotModel = model<IUserDocSlot>('UserDocSlot', UserDocSlotSchema);


// // import mongoose, { model,Schema,Document } from "mongoose";

// // export interface ISlot{
// //     slotId:string
// //     startTime:string,
// //     endTime:string,
// //     isAvailable:boolean
// // }

// // export interface IDates {
// //     date: string;
// //     slots: ISlot[];
// // }

// // export interface IUserDocSlot extends Document {
// //     docId: string;
// //     consultationFee:number
// //     dates: IDates[];
// // }

// // const SlotSchema = new Schema<ISlot>({
// //     slotId: { 
// //         type: String, 
// //         required: true 
// //       },
// //     startTime:
// //      { 
// //         type: String, 
// //         required: true 
// //     },
// //     endTime: 
// //     { 
// //         type: String, 
// //         required: true 
// //     },
// //     isAvailable: 
// //     { 
// //         type: Boolean, 
// //         default: true 
// //     },
    
// // });

// // const DateSchema = new Schema<IDates>({
// //     date: { type: String, required: true },
// //     slots: { type: [SlotSchema], required: true },
// // });

// // const UserDocSlotSchema = new Schema<IUserDocSlot>({
// //     docId: { type: String, required: true },
// //     dates: { type: [DateSchema], required: true },
// //     consultationFee:{type:Number }
// // });

// // export const UserDocSlotModel = model<IUserDocSlot>('UserDocSlot', UserDocSlotSchema);


