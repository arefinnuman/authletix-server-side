import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middleWares/globalErrorHandler';
import { notFoundHandler } from './app/middleWares/notFoundHandler';
import router from './app/routes';

const app: Application = express();

// middleWares
app.use(cors());
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.get('/', (req, res) => {
  res.send('Welcome to AthletiX API');
});

app.use('/api/v1/', router);

// Error Handler
app.use(globalErrorHandler);

app.use(notFoundHandler);

export default app;
