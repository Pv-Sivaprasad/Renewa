import mongoose, { Schema, Document } from 'mongoose';

export interface IAdminUser extends Document {
    userId: string;
    username: string;
    email: string;
    isBlocked: boolean;
}

const AdminUserSchema: Schema = new Schema({
    userId:
    {
        type: String,
        required: true
    },
    username:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    isBlocked:
    {
        type: Boolean,
        default: false
    },
});

export default mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);
