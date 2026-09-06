export class AppError extends Error {
  constructor(code, message, cause, context) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.cause = cause
    this.context = context
  }
}

export async function safeAsync(fn, errorCode, context) {
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
            error,
            context,
          )
    console.error(`[${errorCode}]`, appError)
    return [null, appError]
  }
}