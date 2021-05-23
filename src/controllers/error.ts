import { ErrorRequestHandler } from 'express';
import HttpRequestError from '@httpRequestError';

interface responseBody {
  error: {
    message: string;
  };
}

const errorHandler: ErrorRequestHandler<{}, responseBody> = (
  error,
  req,
  res,
  next
) => {
  if (error instanceof HttpRequestError) {
    const status = error.statusCode || 500;
    const message = error.message;
    return res.status(status).json({ error: { message } });
  }

  return res.status(500).json({ error: { message: 'Internal server error.' } });
};

export default errorHandler;
