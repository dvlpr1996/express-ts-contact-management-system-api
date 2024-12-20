import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import timeout from 'connect-timeout';
import compression from 'compression';
import helmet from 'helmet';
import notFoundErrorHandlingMiddleware from './middlewares/notFoundErrorHandlingMiddleware';

const app: Application = express();

// todo :: env mw
app.use(timeout('20s'));
app.use((req: Request, _res: Response, next: NextFunction) => {
  if (!req.timedout) next();
});

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

// app.use(rateLimitConfig);

app.all('*', (req: Request, _res: Response, _next: NextFunction) => {
  throw new Error(`The Route '${req.originalUrl}' Does Not Exists`);
});

app.use(notFoundErrorHandlingMiddleware);
// app.use(globalErrorHandling);

export default app;
