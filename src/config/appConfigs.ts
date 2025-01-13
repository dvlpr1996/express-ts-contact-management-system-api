import 'dotenv/config';

export const JWT_EXPIRES_IN_TIME = process.env.EXPIRES_IN;
export const PASSPORT_JWT_SECRET_KEY = process.env.JWT_SECRET;
export const PASSPORT_JWT_SIGNED_COOKIE_NAME = process.env.PASSPORT_JWT_COOKIE_NAME;
export const COOKIE_PARSER_SECRET_KEY = process.env.COOKIE_PARSER_SECRET_KEY;


