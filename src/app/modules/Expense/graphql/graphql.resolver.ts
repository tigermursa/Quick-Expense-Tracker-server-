import { Expense } from '../expense.model';
import * as expenseService from '../expense.service';

export const resolvers = {
  Query: {
    getAllExpenses: async () => await expenseService.getAllExpenses(),
    getExpense: async (_: any, { id }: { id: string }) =>
      await expenseService.getExpenseById(id),
  },
  Mutation: {
    createExpense: async (
      _: any,
      { name, category, price }: { name: string; category: string; price: number },
    ) => {
      try {
        const newExpense = new Expense({ name, category, amount: price });
        return await newExpense.save();
      } catch (error) {
        console.error('Error creating expense:', error);
        throw new Error('Failed to create expense');
      }
    },
    updateExpense: async (
      _: any,
      { id, name, category, price }: { id: string; name?: string; category?: string; price?: number },
    ) => {
      return await expenseService.updateExpense(id, { name, category, amount: price });
    },
    deleteExpense: async (_: any, { id }: { id: string }) => {
      const deletedExpense = await expenseService.deleteExpense(id);
      return deletedExpense ? 'Expense deleted successfully' : 'Expense not found';
    },
  },
};
