export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly cause?: Error,
    public readonly context?: Record<string, unknown>,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export async function safeAsync<T>(
  fn: () => Promise<T>,
  errorCode: string,
  context?: Record<string, unknown>,
): Promise<[T | null, AppError | null]> {
  try {
    const result = await fn()
    return [result, null]
  } catch (error) {
    const appError =
      error instanceof AppError
        ? error
        : new AppError(
            errorCode,
            error instanceof Error ? error.message : 'Unknown error',
            error as Error,
            context,
          )
    console.error(`[${errorCode}]`, appError)
    return [null, appError]
  }
}
