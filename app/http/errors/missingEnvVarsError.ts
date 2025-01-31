import ApiError from './apiError';

export default class MissingEnvVarsError extends ApiError {
  constructor(missingVars: string[]) {
    super(`Missing environment variables: ${missingVars.join(', ')}`, 400, missingVars, 'ERR_MISSING_ENV_VARS', true);

    // Set the custom name for this error
    this.name = 'MissingEnvVarsError';

    // Ensure the prototype chain is correctly set
    Object.setPrototypeOf(this, MissingEnvVarsError.prototype);

    // Capture stack trace in non-production environments
    if (process.env.NODE_ENV !== 'production') {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
