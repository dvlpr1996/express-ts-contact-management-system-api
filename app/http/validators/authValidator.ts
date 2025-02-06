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