export const typeDefs = `
  type Expense {
    id: ID!
    name: String!
    category: String!
    amount: Float!
    date: String!
  }

  type Query {
    getAllExpenses: [Expense]
    getExpense(id: ID!): Expense
  }

  type Mutation {
  createExpense(name: String!, category: String!, amount: Float!): Expense
  updateExpense(id: ID!, name: String, category: String, amount: Float): Expense
}
`;
