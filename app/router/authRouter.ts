import express, { Router } from 'express';
import authController from '../http/controllers/authController';

const authRoutes: Router = express.Router();

authRoutes.post('/login', authController.login);
authRoutes.post('/register', authController.register);
authRoutes.get('/logout', authController.logout);

export default authRoutes;
