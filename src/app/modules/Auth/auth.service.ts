import { IUser, User } from './user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = '15m'; // Access token expiry
const JWT_REFRESH_EXPIRES_IN = '7d'; // Refresh token expiry

// Create JWT tokens
const createToken = (user: IUser) => {
  const accessToken = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
  return { accessToken, refreshToken };
};

// Register user
export const register = async (name: string, email: string, password: string): Promise<IUser> => {
  const user = new User({ name, email, password });
  return await user.save();
};

// Login user
export const login = async (email: string, password: string): Promise<IUser | null> => {
  const user = await User.findOne({ email });
  if (!user) return null;
  const isMatch = await user.comparePassword(password);
  return isMatch ? user : null;
};

// Verify token
export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET);
