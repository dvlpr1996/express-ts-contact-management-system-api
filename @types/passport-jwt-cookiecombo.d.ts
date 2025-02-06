// @types/passport-jwt-cookiecombo.d.ts
declare module 'passport-jwt-cookiecombo' {
  import { Strategy as PassportStrategy } from 'passport-strategy';

  interface JwtCookieComboOptions {
    secretOrPublicKey: string;
    jwtVerifyOptions?: {
      algorithms?: string[];
      audience?: string;
      issuer?: string;
      ignoreExpiration?: boolean;
      ignoreNotBefore?: boolean;
      subject?: string;
      clockTolerance?: number;
    };
    passReqToCallback?: boolean;
    jwtCookieName?: string;  // Added missing cookie name option
    expiresIn?: string;      // Added expiry time option
    jwtFromRequest?: (req: Request) => string | null; // Added jwt extraction function
  }

  interface JwtPayload {
    id: string;
    // If there are other properties, add them here (e.g. `user`, `roles`, etc.)
  }

  type VerifyCallback = (
    payload: JwtPayload,
    done: (error: any, user?: any, info?: any) => void
  ) => void;

  class JwtCookieComboStrategy extends PassportStrategy {
    constructor(options: JwtCookieComboOptions, verify: VerifyCallback);
  }

  export = JwtCookieComboStrategy;
}
