import path from 'path';

import express from 'express';
import morgan from 'morgan';

import { tourRouter } from './routes/tourRouter.js';
import { userRouter } from './routes/userRouter.js';

const app = express();

const __dirname = path.resolve();

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export { app };
