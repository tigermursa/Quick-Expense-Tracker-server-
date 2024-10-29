import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from './user.Interface';
import config from '../../config/index';
//user schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving user..
UserSchema.pre<IUser>('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(config.bcryptSaltRounds);
  user.password = await bcrypt.hash(user.password, salt);

  next();
});

// Method to compare password
UserSchema.methods.comparePassword = function (
  password: string,
): Promise<boolean> {
  const user = this as IUser; // Explicitly cast 'this' to IUser
  return bcrypt.compare(password, user.password);
};

export const User = mongoose.model<IUser>('User', UserSchema);
