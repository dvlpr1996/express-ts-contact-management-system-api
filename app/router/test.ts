import { Router } from 'express';

const testRoutes: Router = Router();

testRoutes.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK', message: '/health route' });
});

export default testRoutes;
