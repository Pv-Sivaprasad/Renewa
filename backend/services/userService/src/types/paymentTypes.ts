import { Types } from 'mongoose';

export interface Payment {
    amount: number;
    slot: Types.ObjectId;
    paymentStatus: 'succeeded' | 'failed' | 'pending';
    paymentIntentId?: string;
    userId: Types.ObjectId;
    docId: Types.ObjectId;
    createdAt?: Date;
}
