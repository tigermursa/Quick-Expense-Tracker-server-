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

  // Adjust endDate to include the entire day (23:59:59.999)
  const endOfDay = new Date(endDate);
  endOfDay.setUTCHours(23, 59, 59, 999);

  // Find expenses within the date range for the given user
  const expenses = await Expense.find({
    userId,
    createdAt: { $gte: startDate, $lte: endOfDay },
  }).sort({ createdAt: -1 });

  // Calculate the total sum of amounts
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return { total, expenses };
};

// Get expense summary by userId with totals for all-time, last 7 days, and last 30 days
const getExpenseSummaryByUserId = async (userId: string) => {
  const today = new Date();
  const last7Days = new Date(today);
  last7Days.setDate(today.getDate() - 7);

  const last30Days = new Date(today);
  last30Days.setDate(today.getDate() - 30);

  // Check if userId exists in the database first
  const userExists = await Expense.exists({ userId });
  if (!userExists) {
    throw new Error('Invalid user ID');
  }

  // Aggregation pipeline to fetch and group expenses by date range
  const [allTimeTotal, last7DaysTotal, last30DaysTotal, uniqueDays] = await Promise.all([
    Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Expense.aggregate([
      { $match: { userId, createdAt: { $gte: last7Days } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Expense.aggregate([
      { $match: { userId, createdAt: { $gte: last30Days } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } } },
      { $count: "daysData" },
    ]),
  ]);

  return {
    allTimeTotal: allTimeTotal[0]?.total || 0,
    last7DaysTotal: last7DaysTotal[0]?.total || 0,
    last30DaysTotal: last30DaysTotal[0]?.total || 0,
    daysData: uniqueDays[0]?.daysData || 0, // Number of unique days with expenses
  };
};

export const expenseService = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpensesByUserId,
  getExpensesByDateRange,
  getExpenseSummaryByUserId,
};
