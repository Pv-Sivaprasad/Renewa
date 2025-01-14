import mongoose, { Schema, Document } from 'mongoose';

export interface IChat extends Document {
  docId: string;
  docName: string;
  userId: string;
  userName: string;
  messages: { senderId: string; text: string; timestamp: Date }[];
}

const ChatSchema: Schema = new Schema(
  {
    docId: { type: String, required: true },
    docName: { type: String, required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    messages: [
      {
        senderId: { type: String, required: true },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IChat>('Chat', ChatSchema);
