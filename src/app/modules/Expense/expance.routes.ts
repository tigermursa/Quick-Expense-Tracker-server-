import { Router } from 'express';
import { expenseController } from './expance.controller';
import { authenticateToken } from '../../middlewares/authMiddleware';

const router = Router();

// Define routes
router.post('/expenses', expenseController.createExpense);
router.get('/expenses', authenticateToken, expenseController.getAllExpenses);
router.get(
  '/expenses/:id',
  authenticateToken,
  expenseController.getExpenseById,
);
router.put('/expenses/:id', authenticateToken, expenseController.updateExpense);
router.delete(
  '/expenses/:id',
  authenticateToken,
  expenseController.deleteExpense,
);
//all the expanse of user
router.get(
  '/users/:userId',
  authenticateToken,
  expenseController.getExpensesByUserId,
);
router.get(
  '/expenses/home/summary/:userId',
  authenticateToken,
  expenseController.getExpenseSummaryByUserId,
);
router.post(
  '/expenses/user/date-range',
  authenticateToken,
  expenseController.getExpensesByDateRange,
);

router.post('/expenses/calendar/user/:userId/date', expenseController.getExpensesByDate);
// Export the router
export default router;
