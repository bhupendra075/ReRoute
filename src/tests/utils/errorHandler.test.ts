import { describe, it, expect } from '@jest/globals'
import { AppError, safeAsync } from '@/utils/errorHandler'

describe('errorHandler', () => {
  describe('AppError', () => {
    it('creates an error with code and message', () => {
      const error = new AppError('TEST_CODE', 'Test message')
      expect(error.code).toBe('TEST_CODE')
      expect(error.message).toBe('Test message')
      expect(error.name).toBe('AppError')
    })

    it('includes cause and context when provided', () => {
      const cause = new Error('root cause')
      const error = new AppError('TEST_CODE', 'Something went wrong', cause, { userId: '123' })
      expect(error.cause).toBe(cause)
      expect(error.context).toEqual({ userId: '123' })
    })
  })

  describe('safeAsync', () => {
    it('returns result on success', async () => {
      const [result, error] = await safeAsync(() => Promise.resolve(42), 'TEST')
      expect(result).toBe(42)
      expect(error).toBeNull()
    })

    it('returns AppError on failure', async () => {
      const [result, error] = await safeAsync(
        () => Promise.reject(new Error('fail')),
        'TEST_ERROR',
      )
      expect(result).toBeNull()
      expect(error).toBeInstanceOf(AppError)
      expect(error?.code).toBe('TEST_ERROR')
    })
  })
})
