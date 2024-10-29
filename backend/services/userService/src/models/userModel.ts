import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  image: string;
  isVerified: boolean;
  isBlocked:boolean;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false, 
  },
  isBlocked:{
    type:Boolean,
    default:false
  }
});

export default mongoose.model<IUser>('User', UserSchema);
