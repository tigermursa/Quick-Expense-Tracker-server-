import { ICategory } from './category.interface';
import { Category } from './category.model';

// Get all categories
const getAllCategories = async (): Promise<ICategory[]> => {
  return await Category.find().sort({ categoryName: 1 }); // Return sorted categories by name
};

// Get category by ID
const getCategoryById = async (id: string): Promise<ICategory | null> => {
  return await Category.findById(id);
};

// Update a category by ID
const updateCategory = async (
  id: string,
  updateData: Partial<ICategory>,
): Promise<ICategory | null> => {
  return await Category.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

// Delete a category by ID
const deleteCategory = async (id: string): Promise<ICategory | null> => {
  return await Category.findByIdAndDelete(id);
};

// Grouped export
export const categoryService = {
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
