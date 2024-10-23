import { Request, Response } from 'express';
import { expenseService } from './expense.service';
import { IExpense } from './expence.interface';

// Create a new expense
const createExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const expenseData: IExpense = req.body;

    // Call the service to create the expense
    const newExpense = await expenseService.createExpense(expenseData);

    // Send success response
    res.status(201).json({
      message: 'Expense created successfully',
      data: newExpense,
    });
  } catch (error) {
    // Type-checking the error
    if (error instanceof Error) {
      res.status(500).json({
        message: 'Failed to create expense',
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: 'Failed to create expense',
        error: 'Unknown error occurred',
      });
    }
  }
};

// Get all expenses
const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await expenseService.getAllExpenses();
    return res.status(200).json(expenses);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching expenses' });
  }
};

// Get a single expense by ID
const getExpenseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const expense = await expenseService.getExpenseById(id);
    return expense
      ? res.status(200).json(expense)
      : res.status(404).json({ error: 'Expense not found' });
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching expense by ID' });
  }
};

// Update an expense
const updateExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, category, amount } = req.body;
  try {
    const updatedExpense = await expenseService.updateExpense(id, {
      name,
      category,
      amount,
    });
    return updatedExpense
      ? res.status(200).json(updatedExpense)
      : res.status(404).json({ error: 'Expense not found' });
  } catch (error) {
    return res.status(500).json({ error: 'Error updating expense' });
  }
};

// Delete an expense
const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedExpense = await expenseService.deleteExpense(id);
    return deletedExpense
      ? res.status(200).json({ message: 'Expense deleted' })
      : res.status(404).json({ error: 'Expense not found' });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting expense' });
  }
};

// Grouped export
export const expenseController = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
