import path from 'path';

import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';
import { tourRouter } from './routes/tourRouter.js';
import { userRouter } from './routes/userRouter.js';

const app = express();

const __dirname = path.resolve();

dotenv.config({ path: './config.env' });

// MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server !`, 404));
});

app.use(globalErrorHandler);

export { app };
