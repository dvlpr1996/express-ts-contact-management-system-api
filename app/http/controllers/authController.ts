import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { loginValidationSchema } from '../validators/authValidator';
import { validationErrorMessageHelper } from '../../utils/utils';
import { User } from '../../models/user';
import { generateJwtToken } from '../../utils/jwtUtils';
import { cookieOptions } from '../../configs/appConfigs';
import { PASSPORT_JWT_SIGNED_COOKIE_NAME } from '../../constants/constants';

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

    const checkUserExists = await User.findOne({ email: validatedFields.email })
      .select({ _id: 1 })
      .lean();

    if (!checkUserExists) {
      res.status(404).json({ success: false, message: 'User Not Found!!' });
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
    res.status(200).json({ status: true, message: 'req from register' });
  }),

  logout: expressAsyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({ status: true, message: 'req from logout' });
  }),
};

export default authController;
