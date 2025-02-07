import { z } from 'zod';

export const loginValidationSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email does not match the required pattern'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(128, 'Password must be no longer than 128 characters')
    // .refine((password) => /[a-z]/.test(password), {
    //   message: 'Password must include at least one lowercase letter',
    // })
    // .refine((password) => /[A-Z]/.test(password), {
    //   message: 'Password must include at least one uppercase letter',
    // })
    // .refine((password) => /[0-9]/.test(password), {
    //   message: 'Password must include at least one number',
    // })
    // .refine((password) => /[^a-zA-Z0-9]/.test(password), {
    //   message: 'Password must include at least one special character',
    // }),
});

export const registerValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters long')
    .max(12, 'First name must be no longer than 12 characters')
    .regex(/^[a-zA-Z]+$/, 'First name must contain only letters'),

  lastName: z
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters long')
    .max(32, 'Last name must be no longer than 32 characters')
    .regex(/^[a-zA-Z]+$/, 'Last name must contain only letters'),

  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email does not match the required pattern'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(128, 'Password must be no longer than 128 characters')
    .regex(/[a-z]/, 'Password must include at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
    .regex(/[0-9]/, 'Password must include at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must include at least one special character'),

  phone: z
    .string()
    .trim()
    .regex(/^09[0-9]{9}$/, 'Phone number must be in international format')
    .min(11, 'Phone number must be at least 11 digits long')
});