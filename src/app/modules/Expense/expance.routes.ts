import { Router } from 'express';
import { expenseController } from './expance.controller';

const router = Router();

// Define routes
router.post('/expenses', expenseController.createExpense);
router.get('/expenses', expenseController.getAllExpenses);
router.get('/expenses/:id', expenseController.getExpenseById);
router.put('/expenses/:id', expenseController.updateExpense);
router.delete('/expenses/:id', expenseController.deleteExpense);
router.get('/users/:userId', expenseController.getExpensesByUserId);
router.post(
  '/expenses/user/date-range',
  expenseController.getExpensesByDateRange,
);
// Export the router
export default router;
