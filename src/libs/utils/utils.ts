import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN_TIME, PASSPORT_JWT_SECRET_KEY } from '../../config/constants';

/**
 * Validation Email Address
 * 
 * @param {string} email - The email address to validate.
 * @returns {boolean} Returns `true` if the email is valid, otherwise `false`.
 */
export const isEmail = (email: string): boolean => {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

/**
 * Validation Persian Phone Number
 * 
 * @param {string} phone - The persian phone number to validate.
 * @returns {boolean} Returns `true` if the phone is valid, otherwise `false`.
 */
export const isPhoneNumber = (phone: string): boolean => {
  return /^09[1-9]{9}$/.test(phone);
};

export const tokenExtractionFromSignedCookie = (req: Request): string | null => {
  const accessToken = req?.signedCookies;

  if (!accessToken || !accessToken.PASSPORT_JWT_SIGNED_COOKIE_NAME) {
    throw new Error('You are not signed in');
  }

  return accessToken.PASSPORT_JWT_SIGNED_COOKIE_NAME || null;
};

export const generateToken = (user: { id: number }): string => {
  if (!PASSPORT_JWT_SECRET_KEY || !JWT_EXPIRES_IN_TIME) {
    throw new Error('PASSPORT_JWT_SECRET_KEY or JWT_EXPIRES_IN_TIME is not defined. Check your environment variables.');
  }

  return jwt.sign({ id: user.id }, PASSPORT_JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN_TIME });
};

export const validation_error_message_helper = (validationResult) => {
  return validationResult.error.errors.map((err) => ({
    field: err.path[0],
    message: err.message,
  }));
};
