import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { UserDocument } from '../../types/modelTypes';

export const bearerAuthenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'bearer', // Only use bearer authentication
    { session: false },
    (err: Error | null, user: UserDocument | false) => {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req.user = user;
      return next();
    }
  )(req, res, next);
};

export const cookieAuthenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'cookie', // Only use cookie authentication
    { session: false },
    (err: Error | null, user: UserDocument | false) => {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req.user = user;
      return next();
    }
  )(req, res, next);
};

// router.get('/profile', authenticateJWT, (req, res) => {
//   res.json({ user: req.user });
// });