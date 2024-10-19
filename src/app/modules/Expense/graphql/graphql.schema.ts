// graphql/schema.ts

import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Expense {
    id: ID!
    name: String!
    category: String!
    amount: Float!
    date: String!
  }

  type Query {
    expenses: [Expense]
    expense(id: ID!): Expense
  }

  type Mutation {
    createExpense(name: String!, category: String!, amount: Float!): Expense
    updateExpense(id: ID!, name: String, category: String, amount: Float): Expense
    deleteExpense(id: ID!): Expense
  }
`;
