import { NextFunction, Request, Response } from 'express';
import MissingEnvVarsError from '../errors/MissingEnvVarsError';

const requiredEnvVars = [
  'DOMAIN',
  'APP_URL',
  'APP_NAME',
  'APP_PORT',
  'NODE_ENV',
  'JWT_SECRET',
  'CSRF_SECRET',
  'ENCRYPT_KEY',
  'MONGO_DB_URL',
  'RATE_LIMIT_WINDOW_MS',
  'RATE_LIMIT_MAX_REQUESTS',
  'COOKIE_PARSER_SECRET_KEY',
  'PASSPORT_JWT_COOKIE_NAME',
];

const checkEnvVarsMiddleware = (_req: Request, _res: Response, _next: NextFunction) => {
  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
  if (missingEnvVars.length > 0) {
    throw new MissingEnvVarsError(missingEnvVars);
  }
};

export default checkEnvVarsMiddleware;
