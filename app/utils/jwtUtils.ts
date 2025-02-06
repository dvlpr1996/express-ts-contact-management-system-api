import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN_TIME, PASSPORT_JWT_SECRET_KEY } from '../constants/constants';
import ApiError from '../http/errors/apiError';
import ms from 'ms';

/**
 * Signs a JWT access token for a user.
 *
 * @param user - The user document.
 * @returns A promise that resolves to the signed JWT token.
 */
export const generateJwtToken = (userId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = {
      _id: userId,
    };

    if (typeof JWT_EXPIRES_IN_TIME !== 'string') {
      reject(new ApiError('Invalid expiration time format', 500, [], 'JWT_EXPIRES_IN_ERROR'));
      return;
    }

    if (typeof JWT_EXPIRES_IN_TIME !== 'string' && typeof JWT_EXPIRES_IN_TIME !== 'number') {
      return reject(
        new ApiError('Invalid expiration time format', 500, [], 'JWT_EXPIRES_IN_ERROR')
      );
    }

    const options: jwt.SignOptions = {
      algorithm: 'HS256',
      expiresIn: JWT_EXPIRES_IN_TIME as ms.StringValue,
    };

    try {
      jwt.sign(payload, PASSPORT_JWT_SECRET_KEY, options, (err, token) => {
        if (err) {
          reject(new ApiError('Error signing JWT', 500, [], 'JWT_SIGNING_ERROR'));
        } else if (!token) {
          reject(new ApiError('JWT token is undefined', 500, [], 'JWT_TOKEN_UNDEFINED'));
        } else {
          resolve(token);
        }
      });
    } catch (err) {
      reject(new ApiError('Error signing JWT', 500, [], 'JWT_SIGNING_ERROR'));
    }
  });
};
