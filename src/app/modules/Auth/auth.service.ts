import jwt from 'jsonwebtoken';
import { IUser } from '../User/user.Interface';
import { User } from '../User/user.model';
import config from '../../config/index';

// Create JWT tokens
export const createToken = (user: IUser) => {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    config.jwtSecret!,
    { expiresIn: config.jwtExpiresIn },
  );

  const refreshToken = jwt.sign({ id: user._id }, config.jwtSecret!, {
    expiresIn: config.jwtRefreshExpiresIn,
  });

  return { accessToken, refreshToken };
};

// Register user
export const register = async (
  name: string,
  email: string,
  password: string,
): Promise<IUser> => {
  const user = new User({ name, email, password });
  return await user.save();
};

// Login user
export const login = async (
  email: string,
  password: string,
): Promise<IUser | null> => {
  const user = await User.findOne({ email });
  if (!user) return null;
  const isMatch = await user.comparePassword(password);
  return isMatch ? user : null;
};

// Verify token
export const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtSecret!, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          reject({ error: 'Token expired', status: 401 });
        } else {
          reject({ error: 'Token invalid', status: 403 });
        }
      }
      resolve(decoded);
    });
  });
};
