import { CookieOptions } from '../types/types';

export const baseBodyParserConfigs = {
  inflate: true,
  limit: '5KB',
  strict: true,
  type: 'application/json',
};

const PORT = process.env.APP_PORT || 8000;
const APP_URL = process.env.APP_URL || 'localhost';

export const API_BASE_URL: string = `${APP_URL}:${PORT}`;

export const corsConfigs = {
  origin: API_BASE_URL,
  allowedHeaders: ['Content-Type'],
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  optionsSuccessStatus: 200,
};

export const cookieOptions: CookieOptions = {
  // maxAge: 1 * 60 * 60 * 1000,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  signed: true,
  sameSite: 'strict',
  domain: process.env.DOMAIN,
  path: '/', // Ensure the cookie is accessible on all routes
};
