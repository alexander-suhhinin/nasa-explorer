import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import apodRouter from './routes/apod.routes';
import marsRouter from './routes/mars.routes';
import neowsRouter from './routes/neows.routes';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Health endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/apod', apodRouter);
app.use('/api/mars', marsRouter);
app.use('/api/neows', neowsRouter);

export default app;