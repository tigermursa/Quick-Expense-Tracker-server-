import { Request, Response } from 'express';
import { userService } from './user.servies';

// Get all users
const getAllUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const { total, users } = await userService.getAllUsers();
    return res.status(200).json({
      message: 'Users fetched successfully',
      totalUsers: total,
      data: users,
    });
  } catch (error) {
    return handleError(res, error, 'Error fetching users');
  }
};

// Get user by ID
const getUserById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    return user
      ? res.status(200).json({
          message: 'User fetched successfully',
          data: user,
          status:"200"
        })
      : res.status(404).json({ message: 'User not found',status:"404" });
  } catch (error) {
    return handleError(res, error, 'Error fetching user by ID');
  }
};

// Update a user by ID
const updateUserById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const updatedUser = await userService.updateUserById(id, {
      name,
      email,
      password,
    });
    return updatedUser
      ? res.status(200).json({
          message: 'User updated successfully',
          data: updatedUser,
        })
      : res.status(404).json({ message: 'User not found' });
  } catch (error) {
    return handleError(res, error, 'Error updating user');
  }
};

// Delete a user by ID
const deleteUserById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  try {
    const deletedUser = await userService.deleteUserById(id);
    return deletedUser
      ? res.status(200).json({ message: 'User deleted successfully' })
      : res.status(404).json({ message: 'User not found' });
  } catch (error) {
    return handleError(res, error, 'Error deleting user');
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
export const userController = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
