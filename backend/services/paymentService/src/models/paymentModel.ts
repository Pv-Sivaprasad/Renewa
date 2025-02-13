import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  userId: string; 
  doctorId: string;
  startTime:string
  amount: number;
  date:string
  status: 'pending' | 'completed' | 'failed';
  
  createdAt?: Date;
  stripeSessionId?: string; 
  stripePaymentIntentId?: string
}

const paymentSchema: Schema = new Schema({
  userId: { type: String, required: true },
  doctorId: { type: String, required: true },
  // slotId: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  stripeSessionId: { type: String },
  stripePaymentIntentId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);
export default Payment;
