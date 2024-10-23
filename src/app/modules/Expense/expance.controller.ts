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
      ? res
          .status(200)
          .json({
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

// Grouped export
export const expenseController = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
