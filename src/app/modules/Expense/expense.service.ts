import { Expense, IExpense } from './expense.model';

// Create a new expense
export const createExpense = async (expenseData: IExpense): Promise<IExpense> => {
  const expense = new Expense(expenseData);
  return await expense.save();
};

// Get all expenses
export const getAllExpenses = async (): Promise<IExpense[]> => {
  return await Expense.find();
};

// Get a single expense by ID
export const getExpenseById = async (id: string): Promise<IExpense | null> => {
  return await Expense.findById(id);
};

// Update an expense
export const updateExpense = async (id: string, updateData: Partial<IExpense>): Promise<IExpense | null> => {
  return await Expense.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete an expense
export const deleteExpense = async (id: string): Promise<IExpense | null> => {
  return await Expense.findByIdAndDelete(id);
};
