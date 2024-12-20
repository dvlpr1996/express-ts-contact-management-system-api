import { Request, Response, NextFunction } from 'express';

const notFoundErrorHandlingMiddleware = (_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    status: 'error',
    message: 'Error 404: Not Found',
  });
};
export default notFoundErrorHandlingMiddleware;