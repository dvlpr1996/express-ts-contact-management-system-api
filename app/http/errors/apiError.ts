export default class ApiError extends Error {
  statusCode: number;
  errors: string[];
  errorCode: string;
  isOperational: boolean;

  constructor(
    message: string = 'An Internal Server Error Occurred',
    statusCode: number = 500,
    errors: string[] = [],
    errorCode: string = 'INTERNAL_ERROR',
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.errorCode = errorCode;
    this.isOperational = isOperational;

    // Ensure the prototype chain is correctly set
    Object.setPrototypeOf(this, ApiError.prototype);

    // Capture stack trace in non-production environments
    if (process.env.NODE_ENV !== 'production') {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toString(): string {
    return `${this.message} (http_status_code: ${this.statusCode})`;
  }

  toJSON(): Record<string, unknown> {
    return {
      success: false,
      statusCode: this.statusCode,
      errorCode: this.errorCode,
      errors: Array.isArray(this.errors) ? this.errors : [this.errors],
      message: this.message,
      timestamp: new Date().toISOString(),
      ...(process.env.NODE_ENV !== 'production' && { stack: this.stack }),
      ...(this.errorCode && { code: this.errorCode }),
    };
  }
}
