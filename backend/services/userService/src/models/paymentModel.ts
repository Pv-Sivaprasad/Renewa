import { Payment } from "../types/paymentTypes";
import { Document, Schema, model, Types } from "mongoose";


export interface PaymentDocument extends Payment, Document { }


const UserPaymentSchema = new Schema<PaymentDocument>({
   amount: {
      type: Number,
      required: true
   },
   slot: {
      type: Schema.Types.ObjectId,
      ref: 'Slot',
      required: true
   },
   paymentStatus: {
      type: String,
      enum: ['succeeded', 'failed', 'pending'],
      default: 'pending',
      required: true
   },
   paymentIntentId: {
      type: String
   },
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   docId: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
});

export default model<PaymentDocument>('UserPayment', UserPaymentSchema);