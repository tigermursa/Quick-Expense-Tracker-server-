import mongoose, { Schema } from 'mongoose';
import { ExpenseCategory, IExpense } from './expence.interface';


const ExpenseSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: Object.values(ExpenseCategory), // Restrict to enum values
      required: true,
    },
    amount: { type: Number, required: true, min: 0 }, // Ensure positive amounts
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

export const Expense = mongoose.model<IExpense>('Expense', ExpenseSchema);
