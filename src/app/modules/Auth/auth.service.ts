import jwt from 'jsonwebtoken';
import { IUser } from '../User/user.Interface';
import { User } from '../User/user.model';
import config from '../../config/index';

// Create JWT tokens
export const createToken = (user: IUser) => {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    config.jwtSecret!, // Assert that jwtSecret is defined
    { expiresIn: config.jwtExpiresIn }, // Ensure this is also set
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    config.jwtSecret!, // Assert that jwtSecret is defined
    { expiresIn: config.jwtRefreshExpiresIn },
  );

  return { accessToken, refreshToken };
};
// Register user
export const register = async (
  name: string,
  email: string,
  password: string,
): Promise<IUser> => {
  const user = new User({ name, email, password });
  return await user.save(); // Consider adding error handling here
};

// Login user
export const login = async (
  email: string,
  password: string,
): Promise<IUser | null> => {
  const user = await User.findOne({ email });
  if (!user) return null; // User not found
  const isMatch = await user.comparePassword(password);
  return isMatch ? user : null; // Return user if password matches
};

// Verify token
export const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtSecret!, (err, decoded) => {
      if (err) return reject(err); // Reject if token verification fails
      resolve(decoded); // Resolve with decoded payload
    });
  });
};
