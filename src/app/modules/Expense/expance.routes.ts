import { Router } from 'express';
import { expenseController } from './expance.controller';

const router = Router();

router.post('/expenses', expenseController.createExpense); // Correct import usage
router.get('/expenses', expenseController.getAllExpenses);
router.get('/expenses/:id', expenseController.getExpenseById);
router.put('/expenses/:id', expenseController.updateExpense);
router.delete('/expenses/:id', expenseController.deleteExpense);

export const ExpenseRoutes = router;
