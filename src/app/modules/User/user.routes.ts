import { Router } from 'express';
import { userController } from './user.controller';
import { authenticateToken } from '../../middlewares/authMiddleware';

const router = Router();

// Define routes
router.get('/users', authenticateToken, userController.getAllUsers);
router.get('/users/:id',authenticateToken, userController.getUserById);
router.put('/users/:id', authenticateToken,userController.updateUserById);
router.delete('/users/:id',authenticateToken, userController.deleteUserById);

// Export the router
export default router;
