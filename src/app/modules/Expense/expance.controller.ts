import { Request, Response } from 'express';
import { expenseService } from './expense.service';
import { IExpense } from './expence.interface';

// Create a new expense
const createExpense = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const expenseData: IExpense = req.body;

    const newExpense = await expenseService.createExpense(expenseData);

    return res.status(201).json({
      message: 'Expense created successfully',
      data: newExpense,
    });
  } catch (error) {
    return handleError(res, error, 'Failed to create expense');
  }
};

// Get all expenses
const getAllExpenses = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const expenses = await expenseService.getAllExpenses();
    return res
      .status(200)
      .json({ message: 'Expenses fetched successfully', data: expenses });
  } catch (error) {
    return handleError(res, error, 'Error fetching expenses');
  }
};

// Get a single expense by ID
const getExpenseById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  try {
    const expense = await expenseService.getExpenseById(id);
    return expense
      ? res
          .status(200)
          .json({ message: 'Expense fetched successfully', data: expense })
      : res.status(404).json({ message: 'Expense not found' });
  } catch (error) {
    return handleError(res, error, 'Error fetching expense by ID');
  }
};

// Update an expense
const updateExpense = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const { name, category, amount } = req.body;

  try {
    const updatedExpense = await expenseService.updateExpense(id, {
      name,
      category,
      amount,
    });
    return updatedExpense
      ? res.status(200).json({
          message: 'Expense updated successfully',
          data: updatedExpense,
        })
      : res.status(404).json({ message: 'Expense not found' });
  } catch (error) {
    return handleError(res, error, 'Error updating expense');
  }
};

// Delete an expense
const deleteExpense = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  try {
    const deletedExpense = await expenseService.deleteExpense(id);
    return deletedExpense
      ? res.status(200).json({ message: 'Expense deleted successfully' })
      : res.status(404).json({ message: 'Expense not found' });
  } catch (error) {
    return handleError(res, error, 'Error deleting expense');
  }
};

// Helper function for error handling
const handleError = (
  res: Response,
  error: unknown,
  defaultMsg: string,
): Response => {
  if (error instanceof Error) {
    return res.status(500).json({
      message: defaultMsg,
      error: error.message,
    });
  }
  return res.status(500).json({
    message: defaultMsg,
    error: 'Unknown error occurred',
  });
};

// specific uer total expense
const getExpensesByUserId = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { userId } = req.params; // Get userId from the request parameters

  try {
    // Fetch expenses for the specified userId
    const expenses = await expenseService.getExpensesByUserId(userId);

    // Calculate total amount by summing the 'amount' field of each expense
    const totalAmount = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );

    return res.status(200).json({
      message: 'Expenses fetched successfully',
      totalAmount,
      data: expenses,
    });
  } catch (error) {
    return handleError(res, error, 'Error fetching expenses by userId');
  }
};

// Get expenses by userId and date range
const getExpensesByDateRange = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { userId, startDate, endDate } = req.body;

  // Check if all required fields are provided
  if (!userId || !startDate || !endDate) {
    return res.status(400).json({
      message: 'Missing required fields: userId, startDate, or endDate',
    });
  }

  // Parse dates
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();

  // Check if parsed dates are valid
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({ message: 'Invalid date format' });
  }

  // Check if startDate is after endDate
  if (start > end) {
    return res.status(400).json({
      message: 'Start date must be on or before the end date',
    });
  }

  // Handle future date ranges
  if (start > today) {
    return res.status(200).json({
      message: 'The selected date range is in the future',
      total: 0,
      data: [],
    });
  }

  // Ensure endDate is not after today if querying up to the current date
  const adjustedEndDate = end > today ? today : end;

  try {
    const result = await expenseService.getExpensesByDateRange(
      userId,
      start,
      adjustedEndDate,
    );

    if (result.expenses.length === 0) {
      return res.status(200).json({
        message: 'No expenses found for the selected date range',
        total: 0,
        data: [],
      });
    }

    return res.status(200).json({
      message: 'Expenses fetched successfully',
      total: result.total,
      data: result.expenses,
    });
  } catch (error) {
    console.error('Error in getExpensesByDateRange:', error);
    return handleError(
      res,
      error,
      'Error fetching expenses by userId and date range',
    );
  }
};

// Get expense summary for all-time, last 7 days, and last 30 days by userId
const getExpenseSummaryByUserId = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { userId } = req.params;

  try {
    const summary = await expenseService.getExpenseSummaryByUserId(userId);

    return res.status(200).json({
      message: 'Expense summary fetched successfully',
      data: summary,
    });
  } catch (error) {
    return handleError(res, error, 'Error fetching expense summary');
  }
};

// Grouped export
export const expenseController = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpensesByUserId,
  getExpensesByDateRange,
  getExpenseSummaryByUserId,
};
