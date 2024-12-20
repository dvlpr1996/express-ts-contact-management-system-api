export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user',
}

export interface CustomError extends Error {
  status?: number;
  code?: number;
}
