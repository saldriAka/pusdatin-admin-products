export class AppError extends Error {
  constructor(
    message: string,
    public statusCode = 500,
    public isOperational = true,
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export function handleApiError(error: unknown): string {
  if (error instanceof AppError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return "An unexpected error occurred"
}

export function createApiError(message: string, statusCode = 500): AppError {
  return new AppError(message, statusCode)
}
