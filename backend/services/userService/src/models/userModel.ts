import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  image: string;
  mobile:string
  isVerified: boolean;
  isBlocked: boolean;
  address?: {
    city?: string;
    state?: string;
    pincode?: string;
    nationality?: string;
    landmark?:string
  };
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
  mobile:{
    type:String,
    required:false
  },
  password: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  address: {
    state: {
        type: String,
        required: false,
    },
    pincode: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    nationality: {
      type: String,
      required: false,
  },
  landmark:{
    type:String,
    required:false
  }
},
});

export default mongoose.model<IUser>('User', UserSchema);

