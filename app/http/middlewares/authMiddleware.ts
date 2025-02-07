import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { UserDocument } from '../../types/modelTypes';

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'jwt-cookiecombo',
    { session: false },
    (err: unknown, user: UserDocument | false) => {
      if (err || !user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = user;
      return next();
    }
  )(req, res, next);
};
