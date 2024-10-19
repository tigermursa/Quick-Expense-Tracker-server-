import { Expense } from './expense.model';
import * as expenseService from './expense.service';

export const resolvers = {
  Query: {
    getAllExpenses: async () => await expenseService.getAllExpenses(),
    getExpense: async (_: any, { id }: { id: string }) =>
      await expenseService.getExpenseById(id),
  },
  Mutation: {
    createExpense: async (
      _: any,
      {
        name,
        category,
        price,
      }: { name: string; category: string; price: number },
    ) => {
      const newExpense = new Expense({ name, category, amount: price });
      return await expenseService.createExpense(newExpense);
    },
    updateExpense: async (
      _: any,
      {
        id,
        name,
        category,
        price,
      }: { id: string; name?: string; category?: string; price?: number },
    ) => {
      const updatedExpense = await expenseService.updateExpense(id, {
        name,
        category,
        amount: price,
      });
      return updatedExpense;
    },
    deleteExpense: async (_: any, { id }: { id: string }) => {
      const deletedExpense = await expenseService.deleteExpense(id);
      return deletedExpense
        ? 'Expense deleted successfully'
        : 'Expense not found';
    },
  },
};
