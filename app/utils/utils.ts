import { ZodIssue } from 'zod';
import { ValidationErrorResult } from '../types/types';
import mongoose from 'mongoose';

export const isEmail = (email: string): boolean => {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

export const isPhoneNumber = (phone: string): boolean => {
  return /^09[0-9]{9}$/.test(phone);
};

export const uniquePhoneNumberFaker = (fakePhoneNumbers: Array<string>) => {
  if (fakePhoneNumbers.length === 0) {
    throw new Error('Not enough unique phone numbers available.');
  }
  // Remove and get a unique phone number
  const phoneIndex = Math.floor(Math.random() * fakePhoneNumbers.length);
  return fakePhoneNumbers.splice(phoneIndex, 1)[0];
};


/**
 * Transforms validation errors into a structured object where each field
 * contains an array of associated error messages.
 *
 * @param {ValidationErrorResult} validationResult - The validation result containing errors.
 * @returns {Record<string, string[]>} - An object mapping field names to arrays of error messages.
 */
export const validationErrorMessageHelper = (
  validationResult: ValidationErrorResult
): Record<string, string[]> => {
  return validationResult.error.errors.reduce(
    (acc: Record<string, string[]>, err: ZodIssue) => {
      const field = err.path[0];

      if (!acc[field]) {
        acc[field] = [];
      }
      acc[field].push(err.message);

      return acc;
    },
    {}
  );
};

/**
 * Checks if the provided value is a valid MongoDB ObjectId represented as a 24-character hexadecimal string.
 *
 * @param id - The value to validate.
 * @returns `true` if `id` is a string that is a valid ObjectId; otherwise, `false`.
 */
export function isValidObjectIdStrict(id: unknown): boolean {
  if (typeof id !== 'string') return false;
  return mongoose.Types.ObjectId.isValid(id) && /^[0-9a-fA-F]{24}$/.test(id);
}
