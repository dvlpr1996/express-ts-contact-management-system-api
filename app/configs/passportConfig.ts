import passport from 'passport';
import { Request } from 'express';
import { User } from '../models/user';
import { ExtractJwt } from 'passport-jwt';
import { isValidObjectIdStrict } from '../utils/utils';
import JwtCookieComboStrategy from 'passport-jwt-cookiecombo';

import {
  JWT_EXPIRES_IN_TIME,
  PASSPORT_JWT_SECRET_KEY,
  PASSPORT_JWT_TOKEN_NAME,
} from '../constants/constants';
import { JwtPayload } from 'jsonwebtoken';

passport.use(
  new JwtCookieComboStrategy(
    {
      passReqToCallback: false,
      expiresIn: JWT_EXPIRES_IN_TIME,
      jwtCookieName: PASSPORT_JWT_TOKEN_NAME,
      secretOrPublicKey: PASSPORT_JWT_SECRET_KEY,
      jwtVerifyOptions: {
        algorithms: ['HS256'],
        issuer: 'express-ts-contact-management-system',
      },
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.signedCookies['PASSPORT_JWT_TOKEN_NAME'] || null,
      ]),
    },
    // our verification logic
    async (payload: JwtPayload, done) => {
      try {
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

export default passport;
