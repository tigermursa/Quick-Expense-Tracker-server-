import express, { Application } from "express";
import cors from "cors";
import { graphqlHTTP } from 'express-graphql';  // Import express-graphql
import { typeDefs } from '../src/app/modules/Expense/graphql/graphql.schema';  // Your GraphQL schema
import { resolvers } from '../src/app/modules/Expense/graphql/graphql.resolver';  // Your GraphQL resolvers

const app: Application = express();

// Middleware
app.use(express.json());  // JSON parser middleware
app.use(cors());

// Combine typeDefs and resolvers into a schema (for express-graphql)
import { buildSchema } from 'graphql';
const schema = buildSchema(typeDefs);

// GraphQL HTTP Server
app.use('/graphql', graphqlHTTP({
    schema: schema,  // GraphQL schema
    rootValue: resolvers,  // Resolvers
    graphiql: true,  // Enable the GraphQL playground interface
}));

// Application routes
app.get('/', (req, res) => {
    res.send('Hello World! How are you?');
});

export default app;
