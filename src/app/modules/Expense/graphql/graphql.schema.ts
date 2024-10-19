// graphql/schema.ts

import { gql } from 'apollo-server-express';

export const typeDefs = `
  type Expense {
    id: ID!
    name: String!
    category: String!
    price: Float!
    date: String!
  }

  type Query {
    getAllExpenses: [Expense]
    getExpense(id: ID!): Expense
  }

  type Mutation {
    createExpense(name: String!, category: String!, price: Float!): Expense
    updateExpense(id: ID!, name: String, category: String, price: Float): Expense
    deleteExpense(id: ID!): String
  }
`;
