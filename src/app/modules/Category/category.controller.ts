import { Request, Response } from 'express';
import { categoryService } from './category.services';

// Get all categories
const getAllCategories = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(200).json({
      message: 'Categories fetched successfully',
      data: categories,
    });
  } catch (error) {
    return handleError(res, error, 'Error fetching categories');
  }
};

// Get a category by ID
const getCategoryById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  try {
    const category = await categoryService.getCategoryById(id);
    return category
      ? res.status(200).json({
          message: 'Category fetched successfully',
          data: category,
        })
      : res.status(404).json({ message: 'Category not found' });
  } catch (error) {
    return handleError(res, error, 'Error fetching category by ID');
  }
};

// Update a category by ID
const updateCategory = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const { categoryName, userId } = req.body;

  try {
    const updatedCategory = await categoryService.updateCategory(id, {
      categoryName,
      userId,
    });
    return updatedCategory
      ? res.status(200).json({
          message: 'Category updated successfully',
          data: updatedCategory,
        })
      : res.status(404).json({ message: 'Category not found' });
  } catch (error) {
    return handleError(res, error, 'Error updating category');
  }
};

// Delete a category by ID
const deleteCategory = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  try {
    const deletedCategory = await categoryService.deleteCategory(id);
    return deletedCategory
      ? res.status(200).json({ message: 'Category deleted successfully' })
      : res.status(404).json({ message: 'Category not found' });
  } catch (error) {
    return handleError(res, error, 'Error deleting category');
  }
};

// Helper function for error handling
const handleError = (
  res: Response,
  error: unknown,
  defaultMsg: string,
): Response => {
  if (error instanceof Error) {
    return res.status(500).json({
      message: defaultMsg,
      error: error.message,
    });
  }
  return res.status(500).json({
    message: defaultMsg,
    error: 'Unknown error occurred',
  });
};

// Grouped export
export const categoryController = {
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
