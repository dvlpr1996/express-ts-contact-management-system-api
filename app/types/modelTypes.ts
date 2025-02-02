import { Document, Types } from 'mongoose';
import { RoleEnum } from './types';

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: RoleEnum;
  isDeleted: boolean;
  comparePassword(candidatePassword: string): boolean;
  softDelete(): Promise<void>;
}

export interface ContactDocument extends Document {
  user: Types.ObjectId;
  name: string;
  phone: string;
  address?: {
    city: string;
    street: string;
  };
  email?: string;
  description?: string;
}