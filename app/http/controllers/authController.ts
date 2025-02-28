import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { loginValidationSchema, registerValidationSchema } from '../validators/authValidator';
import { validationErrorMessageHelper } from '../../utils/utils';
import { User } from '../../models/user';
import { generateJwtToken } from '../../utils/jwtUtils';
import { cookieOptions } from '../../configs/appConfigs';
import { PASSPORT_JWT_SIGNED_COOKIE_NAME } from '../../constants/constants';
import { UserDocument } from '../../types/modelTypes';

// todo :: import createHttpError from "http-errors";

const authController = {
  login: expressAsyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;

    const validationFields = loginValidationSchema.safeParse({ email, password });

    if (!validationFields.success) {
      res.status(400).json({
        error: true,
        statusCode: 400,
        message: 'Validation error',
        errors: validationErrorMessageHelper(validationFields),
      });
      return;
    }

    const validatedFields = validationFields.data;

    const checkUserExists = await User.findOne({ email: validatedFields.email }).select({
      _id: 1,
      password: 1,
    });

    if (!checkUserExists) {
      res.status(401).json({ success: false, message: 'User Not Found!!' });
      return;
    }

    const isPasswordValid = await checkUserExists.comparePassword(validatedFields.password);

    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    await generateJwtToken(checkUserExists.id)
      .then((token) => {
        res.cookie(PASSPORT_JWT_SIGNED_COOKIE_NAME, token, cookieOptions);
        res.status(200).json({ status: 200, message: 'login successfully' });
      })
      .catch((err) => {
        throw err;
      });
  }),

  register: expressAsyncHandler(async (req: Request, res: Response) => {
    const { firstName, lastName, phone, email, password } = req.body;

    const validationFields = registerValidationSchema.safeParse({
      firstName,
      lastName,
      phone,
      email,
      password,
    });

    if (!validationFields.success) {
      res.status(400).json({
        error: true,
        statusCode: 400,
        message: 'Validation error',
        errors: validationErrorMessageHelper(validationFields),
      });
      return;
    }

    const validatedFields = validationFields.data;

    const checkUserExists = await User.findOne({ email: validatedFields.email })
      .select({ _id: 1 })
      .lean();

    if (checkUserExists) {
      res.status(409).json({ success: false, message: 'Account Already Exists' });
      return;
    }

    const newUser: UserDocument = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
    });

    if (!newUser) {
      res.status(500).json({
        success: false,
        message: 'Failed to create user. Please try again.',
      });
      return;
    }

    const token = await generateJwtToken(newUser.id);
    res.cookie(PASSPORT_JWT_SIGNED_COOKIE_NAME, token, cookieOptions);
    res.status(200).json({ status: 200, message: 'register successfully' });
  }),

  logout: expressAsyncHandler(async (_req: Request, res: Response) => {
    res.clearCookie(PASSPORT_JWT_SIGNED_COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      signed: true,
      sameSite: 'strict',
      domain: process.env.DOMAIN,
      path: '/',
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  }),
};

export default authController;
