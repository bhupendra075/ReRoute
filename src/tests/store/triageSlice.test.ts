import { describe, it, expect } from '@jest/globals'
import triageReducer, {
  setSessions,
  setActiveSession,
  addSession,
  updateSession,
  setLoading,
  setError,
  clearError,
} from '@/store/triageSlice'
import type { EmergencySession } from '@/types'

const mockSession: EmergencySession = {
  id: 'session-1',
  patientId: 'user-1',
  status: 'active',
  originLat: 40.7128,
  originLng: -74.006,
  priority: 'urgent',
}

const mockSession2: EmergencySession = {
  id: 'session-2',
  patientId: 'user-1',
  status: 'en_route',
  originLat: 40.7128,
  originLng: -74.006,
  priority: 'standard',
}

describe('triageSlice', () => {
  it('returns initial state', () => {
    const state = triageReducer(undefined, { type: 'unknown' })
    expect(state.sessions).toEqual([])
    expect(state.activeSession).toBeNull()
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
  })

  describe('setSessions', () => {
    it('sets the sessions list', () => {
      const state = triageReducer(undefined, setSessions([mockSession]))
      expect(state.sessions).toHaveLength(1)
      expect(state.sessions[0]!.id).toBe('session-1')
    })

    it('replaces existing sessions', () => {
      const withSessions = triageReducer(undefined, setSessions([mockSession]))
      const state = triageReducer(withSessions, setSessions([mockSession2]))
      expect(state.sessions).toHaveLength(1)
      expect(state.sessions[0]!.id).toBe('session-2')
    })
  })

  describe('setActiveSession', () => {
    it('sets the active session', () => {
      const state = triageReducer(undefined, setActiveSession(mockSession))
      expect(state.activeSession).toEqual(mockSession)
    })

    it('clears the active session when null', () => {
      const withSession = triageReducer(undefined, setActiveSession(mockSession))
      const state = triageReducer(withSession, setActiveSession(null))
      expect(state.activeSession).toBeNull()
    })
  })

  describe('addSession', () => {
    it('adds a session to the list', () => {
      const state = triageReducer(undefined, addSession(mockSession))
      expect(state.sessions).toHaveLength(1)
      expect(state.sessions[0]!.id).toBe('session-1')
    })

    it('prepends to existing sessions', () => {
      const existing = triageReducer(undefined, addSession(mockSession))
      const state = triageReducer(existing, addSession(mockSession2))
      expect(state.sessions).toHaveLength(2)
      expect(state.sessions[0]!.id).toBe('session-2')
    })
  })

  describe('updateSession', () => {
    it('updates an existing session in the list', () => {
      const withSessions = triageReducer(undefined, addSession(mockSession))
      const updated = { ...mockSession, status: 'en_route' as const }
      const state = triageReducer(withSessions, updateSession(updated))
      expect(state.sessions[0]!.status).toBe('en_route')
    })

    it('updates the active session when it matches', () => {
      const withSession = triageReducer(undefined, addSession(mockSession))
      const withActive = triageReducer(withSession, setActiveSession(mockSession))
      const updated = { ...mockSession, status: 'arrived' as const }
      const state = triageReducer(withActive, updateSession(updated))
      expect(state.activeSession?.status).toBe('arrived')
    })

    it('does not affect other sessions', () => {
      const withSessions = triageReducer(undefined, addSession(mockSession))
      const withSecond = triageReducer(withSessions, addSession(mockSession2))
      const withActive = triageReducer(withSecond, setActiveSession(mockSession))
      const updated = { ...mockSession, status: 'completed' as const }
      const state = triageReducer(withActive, updateSession(updated))
      expect(state.sessions[0]!.status).toBe('en_route')
      expect(state.sessions[1]!.status).toBe('completed')
    })
  })

  describe('loading and error', () => {
    it('sets loading state', () => {
      const state = triageReducer(undefined, setLoading(true))
      expect(state.loading).toBe(true)
    })

    it('sets error state', () => {
      const state = triageReducer(undefined, setError('Triage failed'))
      expect(state.error).toBe('Triage failed')
    })

    it('clears error', () => {
      const withError = triageReducer(undefined, setError('Error'))
      const state = triageReducer(withError, clearError())
      expect(state.error).toBeNull()
    })
  })
})
