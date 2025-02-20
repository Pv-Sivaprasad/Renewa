import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  slotId: mongoose.Types.ObjectId;
  amount: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentIntentId: string;
  createdAt: Date;
}

const PaymentSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: 'UserDoctor', required: true },
  slotId: { type: Schema.Types.ObjectId, ref: 'UserDocSlot', required: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  paymentIntentId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPayment>('Payment', PaymentSchema);


// import { Payment } from "../types/paymentTypes";
// import { Document, Schema, model, Types } from "mongoose";


// export interface PaymentDocument extends Payment, Document { }


// const UserPaymentSchema = new Schema<PaymentDocument>({
//    amount: {
//       type: Number,
//       required: true
//    },
//    slot: {
//       type: Schema.Types.ObjectId,
//       ref: 'UserDocSlot',
//       required: true
//    },
//    paymentStatus: {
//       type: String,
//       enum: ['succeeded', 'failed', 'pending'],
//       default: 'pending',
//       required: true
//    },
//    paymentIntentId: {
//       type: String
//    },
//    userId: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//    },
//    docId: {
//       type: Schema.Types.ObjectId,
//       ref: 'UserDoctor',
//       required: true
//    },
//    createdAt: {
//       type: Date,
//       default: Date.now
//    },
// });

// export default model<PaymentDocument>('UserPayment', UserPaymentSchema);