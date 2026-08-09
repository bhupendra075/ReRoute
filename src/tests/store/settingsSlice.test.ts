import { describe, it, expect } from '@jest/globals'
import settingsReducer, {
  setTheme,
  setNotificationsEnabled,
  setDataSharingEnabled,
  setLoading,
  setError,
  clearError,
} from '@/store/settingsSlice'

describe('settingsSlice', () => {
  it('returns initial state', () => {
    const state = settingsReducer(undefined, { type: 'unknown' })
    expect(state.theme).toBe('system')
    expect(state.notificationsEnabled).toBe(true)
    expect(state.dataSharingEnabled).toBe(false)
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
  })

  describe('setTheme', () => {
    it('sets theme to light', () => {
      const state = settingsReducer(undefined, setTheme('light'))
      expect(state.theme).toBe('light')
    })

    it('sets theme to dark', () => {
      const state = settingsReducer(undefined, setTheme('dark'))
      expect(state.theme).toBe('dark')
    })
  })

  describe('setNotificationsEnabled', () => {
    it('enables notifications', () => {
      const state = settingsReducer(undefined, setNotificationsEnabled(true))
      expect(state.notificationsEnabled).toBe(true)
    })

    it('disables notifications', () => {
      const state = settingsReducer(undefined, setNotificationsEnabled(false))
      expect(state.notificationsEnabled).toBe(false)
    })
  })

  describe('setDataSharingEnabled', () => {
    it('enables data sharing', () => {
      const state = settingsReducer(undefined, setDataSharingEnabled(true))
      expect(state.dataSharingEnabled).toBe(true)
    })

    it('disables data sharing', () => {
      const state = settingsReducer(undefined, setDataSharingEnabled(false))
      expect(state.dataSharingEnabled).toBe(false)
    })
  })

  describe('loading and error', () => {
    it('sets loading state', () => {
      const state = settingsReducer(undefined, setLoading(true))
      expect(state.loading).toBe(true)
    })

    it('sets error state', () => {
      const state = settingsReducer(undefined, setError('Save failed'))
      expect(state.error).toBe('Save failed')
    })

    it('clears error', () => {
      const withError = settingsReducer(undefined, setError('Error'))
      const state = settingsReducer(withError, clearError())
      expect(state.error).toBeNull()
    })
  })
})
