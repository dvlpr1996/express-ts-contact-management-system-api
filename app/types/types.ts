import { ZodIssue } from 'zod';

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

export interface ValidationErrorResult {
  error: { errors: ZodIssue[] };
}

export interface CookieOptions {
  maxAge?: number;
  httpOnly: boolean;
  secure: boolean;
  signed: boolean;
  sameSite: 'strict' | 'lax' | 'none';
  domain?: string;
  path: string;
}