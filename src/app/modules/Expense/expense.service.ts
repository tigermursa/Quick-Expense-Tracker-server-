import { IExpense } from './expence.interface';
import { Expense } from './expense.model';

const createExpense = async (expenseData: IExpense): Promise<IExpense> => {
  const expense = new Expense(expenseData);
  return await expense.save();
};

const getAllExpenses = async (): Promise<IExpense[]> => {
  return await Expense.find().sort({ date: -1 }); // Return sorted expenses by date
};

const getExpenseById = async (id: string): Promise<IExpense | null> => {
  return await Expense.findById(id);
};

const updateExpense = async (
  id: string,
  updateData: Partial<IExpense>,
): Promise<IExpense | null> => {
  return await Expense.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

const deleteExpense = async (id: string): Promise<IExpense | null> => {
  return await Expense.findByIdAndDelete(id);
};

export const expenseService = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
