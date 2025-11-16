import { Request, Response, NextFunction } from 'express';
import Log from '../models/Log';

interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  name: string;
  errors?: any;
}

const errorHandler = async (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  let error: CustomError = { ...err, name: err.name, message: err.message } as CustomError;

  try {
    await Log.create({
      level: 'error',
      message: err.message,
      stack: err.stack,
      user: (req as any).user?.id || undefined,
      endpoint: req.originalUrl,
      method: req.method,
      timestamp: new Date(),
    });
  } catch (logError) {
    // If logging fails, don't crash the app
    console.error('Failed to log error:', logError);
  }

  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { name: 'CastError', message, statusCode: 404 } as CustomError;
  }

  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { name: 'DuplicateKey', message, statusCode: 400 } as CustomError;
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors || {})
      .map((val: any) => val.message)
      .join(', ');
    error = { name: 'ValidationError', message, statusCode: 400 } as CustomError;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
  });
};

export default errorHandler;
