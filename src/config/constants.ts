import { RoleEnum } from '../libs/types/types';

export const Role = {
  ADMIN: RoleEnum.ADMIN,
  USER: RoleEnum.USER,
} as const;

export const API_ROUTE_VERSION: string = '/api/v1';
