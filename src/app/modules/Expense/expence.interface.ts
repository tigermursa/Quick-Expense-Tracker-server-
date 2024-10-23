import { Document } from 'mongoose';

export interface IExpense extends Document {
  name: string;
  category: string;
  amount: number;
  date: Date;
}
