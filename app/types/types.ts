export interface CustomError extends Error {
  name: string;
  statusCode?: number;
  message: string;
  stack?: string;
  code?: number | string;
  isOperational?: boolean;
  details?: string | object;
}
