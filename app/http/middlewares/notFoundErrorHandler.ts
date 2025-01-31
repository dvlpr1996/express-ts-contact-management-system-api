import { Request, Response, NextFunction } from "express";

const notFoundErrorHandler = (req: Request, _res: Response, next: NextFunction) => {
  const error = {
    statusCode: 404,
    status: "error",
    message: "Error 404: Not Found",
    path: req.originalUrl,
  };

  next(error);
};

export default notFoundErrorHandler;
