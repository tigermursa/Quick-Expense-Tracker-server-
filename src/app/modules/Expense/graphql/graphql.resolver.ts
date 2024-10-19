import { Expense } from '../expense.modle';

export const resolvers = {
  Query: {
    expenses: async () => await Expense.find(),
    expense: async (_: any, { id }: { id: string }) =>
      await Expense.findById(id),
  },
  Mutation: {
    createExpense: async (
      _: any,
      {
        name,
        category,
        amount,
      }: { name: string; category: string; amount: number },
    ) => {
      const newExpense = new Expense({ name, category, amount });
      return await newExpense.save();
    },
    updateExpense: async (
      _: any,
      {
        id,
        name,
        category,
        amount,
      }: { id: string; name?: string; category?: string; amount?: number },
    ) => {
      const updatedExpense = await Expense.findByIdAndUpdate(
        id,
        { $set: { name, category, amount } },
        { new: true },
      );
      return updatedExpense;
    },
    deleteExpense: async (_: any, { id }: { id: string }) => {
      const deletedExpense = await Expense.findByIdAndDelete(id);
      return deletedExpense;
    },
  },
};
