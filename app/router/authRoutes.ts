import express, { Router } from 'express';
import authController from '../http/controllers/authController';
import { authenticateJWT } from '../http/middlewares/authMiddleware';

const authRoutes: Router = express.Router();

authRoutes.post('/login', authController.login);
authRoutes.post('/register', authController.register);
authRoutes.get('/logout', authController.logout);

authRoutes.get('/t', authenticateJWT, (_req, res) => {
  res.status(200).json({ message: 'test for auth' });
});

export default authRoutes;
