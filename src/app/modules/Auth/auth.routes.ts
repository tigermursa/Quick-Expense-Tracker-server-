import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
} from './auth.controller';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/auth/register',
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
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').not().isEmpty().withMessage('Password is required'),
  ],
  loginUser,
);

router.post('/auth/logout', logoutUser);
router.post('/auth/refresh-token', refreshToken);

export default router;
