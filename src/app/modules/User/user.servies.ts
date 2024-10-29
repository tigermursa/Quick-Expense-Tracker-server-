import { IUser } from './user.Interface';
import { User } from './user.model';

// Get all users
const getAllUsers = async (): Promise<{ total: number; users: IUser[] }> => {
  const users = await User.find();
  const total = users.length;
  return { total, users };
};

// Get user by ID
const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

// Update a user by ID
const updateUserById = async (
  id: string,
  updateData: Partial<IUser>,
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

// Delete a user by ID
const deleteUserById = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};

// Grouped export
export const userService = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
