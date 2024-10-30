import { Document, ObjectId } from 'mongoose';

export interface IExpense extends Document {
  _id: ObjectId;
  name: string;
  category: string;
  amount: number;
  userId: string;
  createdAt?: Date;
}
