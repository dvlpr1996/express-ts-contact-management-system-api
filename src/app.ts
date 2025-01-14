import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import timeout from 'connect-timeout';
import compression from 'compression';
import helmet from 'helmet';
import notFoundErrorHandlingMiddleware from './middlewares/notFoundErrorHandlingMiddleware';
import globalErrorHandlingMiddleware from './middlewares/globalErrorHandlingMiddleware';
import checkEnvVarsMiddleware from './middlewares/checkEnvVarsMiddleware';
import { API_ROUTE_VERSION } from './config/constants';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import { COOKIE_PARSER_SECRET_KEY } from './config/constants';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import passport from './middlewares/passportMiddleware';

// todo :: order of mw calls and fix other mw options.
// todo :: add comments.
// todo :: add cors mw.
// todo :: add hpp mw.
// todo :: add xss mw.

const app: Application = express();

app.use(checkEnvVarsMiddleware);

app.use(timeout('20s'));
app.use((req: Request, _res: Response, next: NextFunction) => {
  if (!req.timedout) next();
});

app.use(cookieParser(COOKIE_PARSER_SECRET_KEY));
app.use(compression());
app.use(helmet());

app.use(
  bodyParser.json({
    inflate: true,
    limit: '2KB',
    strict: true,
    type: 'application/json',
  })
);

app.use(
  bodyParser.urlencoded({
    inflate: true,
    extended: false,
    limit: '2KB',
    parameterLimit: 1,
    type: 'application/x-www-form-urlencoded',
  })
);

app.use(ExpressMongoSanitize({ allowDots: false }));

app.use(passport.initialize());
app.use(API_ROUTE_VERSION, authRoutes);

app.all('*', (req: Request, _res: Response, _next: NextFunction) => {
  throw new Error(`The Route '${req.originalUrl}' Does Not Exists`);
});

app.use(notFoundErrorHandlingMiddleware);
app.use(globalErrorHandlingMiddleware);

export default app;
