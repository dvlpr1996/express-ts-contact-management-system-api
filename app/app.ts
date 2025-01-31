import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import timeout from 'connect-timeout';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import notFoundErrorHandler from './http/middlewares/notFoundErrorHandler';
import globalErrorHandler from './http/middlewares/globalErrorHandler';
import checkEnvVarsMiddleware from './http/middlewares/checkEnvVarsMiddleware';
import { COOKIE_PARSER_SECRET_KEY } from './constants/constants';
import { baseBodyParserConfigs } from './configs/appConfigs';
import ApiError from './http/errors/apiError';

const app: Application = express();

app.use(checkEnvVarsMiddleware);

app.use(timeout('20s'));
app.use((req: Request, _res: Response, next: NextFunction) => {
  if (!req.timedout) next();
});

app.use(cookieParser(COOKIE_PARSER_SECRET_KEY));
app.use(compression());
app.use(helmet());

app.use(bodyParser.json(baseBodyParserConfigs));

app.use(
  bodyParser.urlencoded({
    ...baseBodyParserConfigs,
    parameterLimit: 1,
    type: 'application/x-www-form-urlencoded',
  })
);

app.use(ExpressMongoSanitize({ allowDots: false }));

// app.use(passport.initialize());
// app.use(API_ROUTE_VERSION, authRoutes);

app.all('*', (req: Request, _res: Response, _next: NextFunction) => {
  throw new ApiError(`The Route '${req.originalUrl}' Does Not Exist`, 404, [], 'NOT_FOUND');
});

app.use(notFoundErrorHandler);
app.use(globalErrorHandler);

export default app;
