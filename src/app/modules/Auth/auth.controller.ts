import { Request, Response } from 'express';
import { register, login, createToken } from './auth.service';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../User/user.model';

// Register new user
export const registerUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: 'Validation failed', errors: errors.array() });
  }

  const { name, email, password } = req.body;
  try {
    const newUser = await register(name, email, password);
    const tokens = createToken(newUser);

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // use secure cookies in production
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      message: 'User registered successfully',
      data: { name: newUser.name, email: newUser.email },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: 'Error registering user', error: error.message });
    }
    return res.status(500).json({
      message: 'Error registering user',
      error: 'An unexpected error occurred',
    });
  }
};

// Login user
export const loginUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const user = await login(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const tokens = createToken(user);

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: 'Logged in successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: 'Error registering user', error: error.message });
    }
    return res.status(500).json({
      message: 'Error registering user',
      error: 'An unexpected error occurred',
    });
  }
};

// Logout user
export const logoutUser = (req: Request, res: Response): Response => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  return res.status(200).json({ message: 'Logged out successfully' });
};

// Refresh token
// Refresh token
export const refreshToken = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET || 'your_jwt_secret',
    ) as jwt.JwtPayload;

    // Fetch user from the database using the ID from the decoded token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Create tokens using the user object
    const tokens = createToken(user);

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({ message: 'Token refreshed successfully' });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};
