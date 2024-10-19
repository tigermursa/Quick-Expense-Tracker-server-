import mongoose, { Schema, Document } from 'mongoose';

interface IExpense extends Document {
  name: string;
  category: string;
  amount: number;
  date: Date;
}

const ExpenseSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const Expense = mongoose.model<IExpense>('Expense', ExpenseSchema);
