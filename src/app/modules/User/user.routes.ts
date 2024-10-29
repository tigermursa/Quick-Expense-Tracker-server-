import { Router } from 'express';
import { userController } from './user.controller';

const router = Router();

// Define routes
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);

// Export the router
export default router;
