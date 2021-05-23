import { Document, Schema, model } from 'mongoose';

export type UserDocument = Document & {
  firstname: string;
  lastname: string;
};

const userSchema = new Schema<UserDocument>({
  firstname: { type: String, required: true },
  lastname: String,
});

export const User = model<UserDocument>('User', userSchema);
