import { Router } from 'express';
import { categoryController } from './category.controller';

const router = Router();

// Define routes
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

// Export the router
export default router;
