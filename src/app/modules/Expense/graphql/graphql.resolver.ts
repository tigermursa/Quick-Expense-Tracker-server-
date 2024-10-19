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
      { name, category, amount }: { name: string; category: string; amount: number },
    ) => {
      const newExpense = new Expense({ name, category, amount });
      return await expenseService.createExpense(newExpense);
    },
    updateExpense: async (
      _: any,
      { id, name, category, amount }: { id: string; name?: string; category?: string; amount?: number },
    ) => {
      return await expenseService.updateExpense(id, { name, category, amount });
    },
    deleteExpense: async (_: any, { id }: { id: string }) => {
      const deletedExpense = await expenseService.deleteExpense(id);
      return deletedExpense ? 'Expense deleted successfully' : 'Expense not found';
    },
  },
};
