export interface CustomError extends Error {
  name: string;
  statusCode?: number;
  message: string;
  stack?: string;
  errors?: string[]; // For validation errors or custom error details
  code?: string | number; // Custom error code
  isOperational?: boolean;
  details?: string | object; // Optional additional details
}

export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user',
}
