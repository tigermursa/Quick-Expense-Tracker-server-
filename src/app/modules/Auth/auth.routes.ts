import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
} from './auth.controller';
import { body } from 'express-validator';
import rateLimit from 'express-rate-limit';

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Too many requests, please try again later.' },
});

router.post(
  '/auth/register',
  authLimiter,
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  registerUser,
);

router.post(
  '/auth/login',
  authLimiter,
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').not().isEmpty().withMessage('Password is required'),
  ],
  loginUser,
);

router.post('/auth/logout', logoutUser);


export default router;
