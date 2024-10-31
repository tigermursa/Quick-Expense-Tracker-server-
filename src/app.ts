import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet'; // Security headers
//import rateLimit from 'express-rate-limit'; // Rate limiter for basic DDoS protection
import morgan from 'morgan'; // Logging
import dotenv from 'dotenv'; // Environment variables
import ExpenseRoutes from './app/modules/Expense/expance.routes';
import CategoryRoutes from './app/modules/Category/category.routes';
import AuthRoutes from './app/modules/Auth/auth.routes';
import UsersRoutes from './app/modules/User/user.routes';
import cookieParser from 'cookie-parser';
// Initialize environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(helmet()); // Set security-related HTTP headers
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow only this origin
    credentials: true, // If you are sending cookies or authentication data
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  }),
);
app.use(morgan('dev')); // Request logging
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // Limit each IP to 100 requests per windowMs
//   }),
// );
app.use(cookieParser());
// Global Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: 'Internal Server Error', error: err.message });
});

// API Routes
app.use('/api/v1', ExpenseRoutes);
app.use('/api/v2', CategoryRoutes);
app.use('/api/v3/', AuthRoutes);
app.use('/api/v4', UsersRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('The Qucik Expense tracker server running 827');
});

export default app;
