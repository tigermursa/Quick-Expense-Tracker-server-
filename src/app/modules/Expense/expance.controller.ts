import { Expense, IExpense } from './expense.model';
import * as expenseService from './expense.service';

export const createExpense = async (name: string, category: string, amount: number): Promise<IExpense> => {
  try {
    const expenseData: IExpense = { name, category, amount, date: new Date() } as IExpense;
    const newExpense = await expenseService.createExpense(expenseData);
    return newExpense;
  } catch (error) {
    throw new Error(`Error creating expense:`);
  }
};

export const getAllExpenses = async (): Promise<IExpense[]> => {
  try {
    return await expenseService.getAllExpenses();
  } catch (error) {
    throw new Error(`Error fetching expenses:`);
  }
};

export const getExpenseById = async (id: string): Promise<IExpense | null> => {
  try {
    return await expenseService.getExpenseById(id);
  } catch (error) {
    throw new Error(`Error fetching expense by ID:`);
  }
};

export const updateExpense = async (
  id: string,
  name?: string,
  category?: string,
  amount?: number,
): Promise<IExpense | null> => {
  try {
    const updateData: Partial<IExpense> = { name, category, amount };
    return await expenseService.updateExpense(id, updateData);
  } catch (error) {
    throw new Error(`Error updating expense:`);
  }
};

export const deleteExpense = async (id: string): Promise<string> => {
  try {
    const deletedExpense = await expenseService.deleteExpense(id);
    return deletedExpense ? 'Expense deleted successfully' : 'Expense not found';
  } catch (error) {
    throw new Error(`Error deleting expense:`);
  }
};
