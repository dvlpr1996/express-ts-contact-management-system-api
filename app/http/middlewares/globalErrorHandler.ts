import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { CustomError } from '../../types/types';

const globalErrorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('Error stack:', err.stack);
  }

  // set default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // handling mongoose Error
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = 'Validation Error';
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = 'Invalid ID Format';
  } else if (err.name === 'MongoNetworkError') {
    statusCode = 503;
    message = 'Database Connection Error';
  } else if (err.code === 11000) {
    statusCode = 409;
    message = 'Duplicate Key Error';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default globalErrorHandler;
