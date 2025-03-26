import mongoose, { Schema, Document } from 'mongoose';


export interface Message {
  senderId: string;
  text: string;
  timeStamp: Date;
}

export interface Participant {
  id: string;
  name: string;
  role: 'user' | 'doctor';
}


export interface ChatDocument extends Document {
  participants: Participant[];
  messages: Message[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}


const chatSchema = new Schema<ChatDocument>(
  {
    participants: [{ id: String, name: String, role: String }],
    messages: [
      {
        senderId: String,
        text: String,
        timeStamp: { type: Date, default: Date.now },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Chat = mongoose.model<ChatDocument>('Chat', chatSchema);







// import mongoose, { Schema, Document } from 'mongoose';

// export interface IChat extends Document {
//   docId: string;
//   docName: string;
//   userId: string;
//   userName: string;
//   messages: { senderId: string; text: string; timestamp: Date }[];
// }

// const ChatSchema: Schema = new Schema(
//   {
//     docId: { type: String, required: true },
//     docName: { type: String, required: true },
//     userId: { type: String, required: true },
//     userName: { type: String, required: true },
//     messages: [
//       {
//         senderId: { type: String, required: true },
//         text: { type: String, required: true },
//         timestamp: { type: Date, default: Date.now },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// export default mongoose.model<IChat>('Chat', ChatSchema);
