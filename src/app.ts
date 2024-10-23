import express, { Application } from 'express';
import cors from 'cors';
import expenseRoutes from './app/modules/Expense/expance.routes';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Expense routes
app.use('/api', expenseRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Hello World! Welcome to the Expense Tracker API!');
});

export default app;
