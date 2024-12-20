import { NextFunction, Request, Response } from 'express';

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
];

const checkEnvVarsMiddleware = (_req: Request, _res: Response, next: NextFunction) => {
  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
  if (missingEnvVars.length > 0) {
    throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
  }

  next();
};

export default checkEnvVarsMiddleware;
