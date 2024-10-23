import { IExpense } from './expence.interface';
import { Expense } from './expense.model';

// Create a new expense
const createExpense = async (expenseData: IExpense): Promise<IExpense> => {
  const expense = new Expense(expenseData);
  return await expense.save();
};

// Get all expenses
const getAllExpenses = async (): Promise<IExpense[]> => {
  return await Expense.find();
};

// Get a single expense by ID
const getExpenseById = async (id: string): Promise<IExpense | null> => {
  return await Expense.findById(id);
};

// Update an expense
const updateExpense = async (
  id: string,
  updateData: Partial<IExpense>,
): Promise<IExpense | null> => {
  return await Expense.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete an expense
const deleteExpense = async (id: string): Promise<IExpense | null> => {
  return await Expense.findByIdAndDelete(id);
};

// Grouped export
export const expenseService = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
