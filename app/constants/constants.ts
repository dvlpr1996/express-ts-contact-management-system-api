import { RoleEnum } from '../types/types';

export const Role = {
  ADMIN: RoleEnum.ADMIN,
  USER: RoleEnum.USER,
} as const;

export const API_ROUTE_VERSION: string = '/api/v1';

export const JWT_EXPIRES_IN_TIME: string | number = process.env.EXPIRES_IN!;
export const PASSPORT_JWT_SECRET_KEY: string = process.env.JWT_SECRET!;
export const PASSPORT_JWT_TOKEN_NAME: string = 'token';
export const PASSPORT_JWT_SIGNED_COOKIE_NAME: string = process.env.PASSPORT_JWT_COOKIE_NAME!;
export const COOKIE_PARSER_SECRET_KEY: string = process.env.COOKIE_PARSER_SECRET_KEY!;