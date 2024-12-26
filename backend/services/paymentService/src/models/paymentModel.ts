import mongoose, { Schema, Document } from 'mongoose';

interface PaymentDocument extends Document {
  userId: string; 
  doctorId: string;
  slotId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentIntentId: string; 
  paymentMethod: string;
  createdAt: Date;
}

const PaymentSchema: Schema = new Schema({
  userId: { type: String, required: true },
  doctorId: { type: String, required: true },
  slotId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  paymentIntentId: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model<PaymentDocument>('Payment', PaymentSchema);
export default Payment;
