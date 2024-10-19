import * as expenseController from '../expance.controller';

export const resolvers = {
  Query: {
    getAllExpenses: async () => await expenseController.getAllExpenses(),
    getExpense: async (_: any, { id }: { id: string }) => await expenseController.getExpenseById(id),
  },
  Mutation: {
    createExpense: async (_: any, { name, category, amount }: { name: string; category: string; amount: number }) => {
      return await expenseController.createExpense(name, category, amount);
    },
    updateExpense: async (_: any, { id, name, category, amount }: { id: string; name?: string; category?: string; amount?: number }) => {
      return await expenseController.updateExpense(id, name, category, amount);
    },
    deleteExpense: async (_: any, { id }: { id: string }) => {
      return await expenseController.deleteExpense(id);
    },
  },
};
