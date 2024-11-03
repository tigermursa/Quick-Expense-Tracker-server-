import { NextFunction, Request, Response } from 'express';
import { register, login, createToken } from './auth.service';
import { validationResult } from 'express-validator';
import jwt, { JwtPayload } from 'jsonwebtoken';

import config from '../../config/index';

declare module 'express-serve-static-core' {
  interface Request {
    user?: string | JwtPayload;
  }
}
// Helper to set access token cookie
const setAccessTokenCookie = (res: Response, accessToken: string) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 15 * 60 * 1000, // 15 minutes
    sameSite: 'none',
  });
};

// Register new user
export const registerUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  const { name, email, password } = req.body;
  try {
    const newUser = await register(name, email, password);
    const { accessToken } = createToken(newUser);

    setAccessTokenCookie(res, accessToken);

    return res.status(201).json({
      message: 'User registered successfully',
      data: { name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error registering user',
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
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

    const { accessToken } = createToken(user);

    setAccessTokenCookie(res, accessToken);

    return res.status(200).json({
      message: 'Logged in successfully',
      userId: user._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error logging in',
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
};

// Logout user
export const logoutUser = (req: Request, res: Response): Response => {
  res.clearCookie('accessToken');
  return res.status(200).json({ message: 'Logged out successfully' });
};

// Middleware to check if token is expired
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res
      .status(401)
      .json({ message: 'No token provided, please log in' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret!);
    req.user = decoded; // No more type error here
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: 'Session expired, please log in again' });
  }
};
