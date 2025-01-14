import 'dotenv/config';

export const jWtCookieOptions = {
  httpOnly: true,
  secure: true,
  signed: true,
  sameSite: 'strict',
};
