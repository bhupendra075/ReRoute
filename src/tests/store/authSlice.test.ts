import { describe, it, expect } from '@jest/globals'
import authReducer, { setUser, setLoading, setError, clearError } from '@/store/authSlice'
import type { User } from '@/types'

const mockUser: User = {
  id: 'user-1',
  email: 'test@example.com',
  fullName: 'Test User',
  role: 'patient',
}

describe('authSlice', () => {
  it('returns initial state', () => {
    const state = authReducer(undefined, { type: 'unknown' })
    expect(state.user).toBeNull()
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  })

  describe('setUser', () => {
    it('sets the user and clears loading', () => {
      const state = authReducer(undefined, setUser(mockUser))
      expect(state.user).toEqual(mockUser)
      expect(state.loading).toBe(false)
    })

    it('clears the user when null', () => {
      const withUser = authReducer(undefined, setUser(mockUser))
      const state = authReducer(withUser, setUser(null))
      expect(state.user).toBeNull()
      expect(state.loading).toBe(false)
    })
  })

  describe('setLoading', () => {
    it('sets loading to true', () => {
      const state = authReducer(undefined, setLoading(true))
      expect(state.loading).toBe(true)
    })

    it('sets loading to false', () => {
      const state = authReducer(undefined, setLoading(false))
      expect(state.loading).toBe(false)
    })
  })

  describe('setError', () => {
    it('sets error message', () => {
      const state = authReducer(undefined, setError('Auth failed'))
      expect(state.error).toBe('Auth failed')
    })
  })

  describe('clearError', () => {
    it('clears error', () => {
      const withError = authReducer(undefined, setError('Error'))
      const state = authReducer(withError, clearError())
      expect(state.error).toBeNull()
    })
  })
})
