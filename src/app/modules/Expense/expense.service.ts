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

// Get all expenses by userId
const getExpensesByUserId = async (userId: string): Promise<IExpense[]> => {
  return await Expense.find({ userId }).sort({ createdAt: -1 });
};

//get all byt date range
const getExpensesByDateRange = async (
  userId: string,
  startDate: Date,
  endDate: Date,
) => {
  // Check if userId exists in the database first
  const userExists = await Expense.exists({ userId });
  if (!userExists) {
    throw new Error('Invalid user ID');
  }

  // Adjust endDate to include the entire day (23:59:59)
  const endOfDay = new Date(endDate);
  endOfDay.setUTCHours(23, 59, 59, 999); // Set end time to 23:59:59.999

  // Find expenses for the given user within the date range and calculate the sum
  const expenses = await Expense.find({
    userId,
    createdAt: { $gte: startDate, $lte: endOfDay }, // Use the adjusted end date
  }).sort({ createdAt: -1 });

  // Calculate total sum of amounts
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return { total, expenses };
};

export const expenseService = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpensesByUserId,
  getExpensesByDateRange,
};
