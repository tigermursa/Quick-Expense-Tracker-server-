// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../modules/Auth/auth.service';

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Check if the access token is in cookies or headers
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access token missing' });
    }

    // Verify the token
    const decoded = await verifyToken(token);
    (req as any).user = decoded; // Attach the decoded user info to the request for use in routes

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    const status = (error as any).status || 403;
    res.status(status).json({ error });
  }
};
