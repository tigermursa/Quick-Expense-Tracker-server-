import mongoose, { Schema } from 'mongoose';
import { IExpense } from './expence.interface';

const ExpenseSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const Expense = mongoose.model<IExpense>('Expense', ExpenseSchema);
