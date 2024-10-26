import { Document, ObjectId } from 'mongoose';

export enum ExpenseCategory {
  Food = 'Food',
  Transport = 'Transport',
  Family = 'Family',
  Donate = 'Donate',
  Shopping = 'Shopping',
  Others = 'Others',
}

export interface IExpense extends Document {
  _id: ObjectId;
  name: string;
  category: ExpenseCategory;
  amount: number; 
}
