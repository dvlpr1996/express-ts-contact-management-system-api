import passport from 'passport';
import { Request } from 'express';
import { User } from '../models/user';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { isValidObjectIdStrict } from '../utils/utils';
import { Strategy as CookieStrategy } from 'passport-cookie';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { PASSPORT_JWT_SECRET_KEY, PASSPORT_JWT_TOKEN_NAME } from '../constants/constants';

// todo :: fix any

/**
 * Cookie Authentication Strategy
 */
passport.use(
  'jwt-cookie', // Strategy name
  new CookieStrategy(
    {
      cookieName: PASSPORT_JWT_TOKEN_NAME,
      signed: true,
      passReqToCallback: true, // Passes the request to callback
    },
    // our verification logic
    async (_req: Request, token: string, done:any) => {
      try {
        if (!token) {
          return done(null, false, { message: 'No token provided' });
        }

        const payload = jwt.verify(token, PASSPORT_JWT_SECRET_KEY) as JwtPayload;

        if (!payload?.id || !isValidObjectIdStrict(payload.id)) {
          return done(null, false, { message: 'Invalid token data' });
        }

        const user = await User.findById(payload.id).select('-password');

        if (!user) {
          return done(null, false, { message: 'User Not Found' });
        }

        return done(null, user);
      } catch (error) {
        return done(null, false, { message: 'Authentication error' });
      }
    }
  )
);

/**
 * Bearer Token Authentication Strategy
 */
passport.use(
  'bearer',
  new BearerStrategy(async (token, done) => {
    try {
      if (!token) {
        return done(null, false, { message: 'No token provided' });
      }

      const payload = jwt.verify(token, PASSPORT_JWT_SECRET_KEY) as JwtPayload;

      if (!payload?.id || !isValidObjectIdStrict(payload.id)) {
        return done(null, false, { message: 'Invalid token payload' });
      }

      const user = await User.findById(payload.id).select('-password');
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      return done(null, user);
    } catch (error) {
      return done(null, false, { message: 'Authentication error' });
    }
  })
);

export default passport;
