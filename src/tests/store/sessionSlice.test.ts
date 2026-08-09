import { describe, it, expect } from '@jest/globals'
import sessionReducer, {
  setActiveSession,
  addSession,
  updateSessionStatus,
  setSessions,
  setLoading,
  setError,
  clearError,
} from '@/store/sessionSlice'
import type { EmergencySession } from '@/types'

const mockSession: EmergencySession = {
  id: 'session-1',
  patientId: 'user-1',
  status: 'active',
  originLat: 40.7128,
  originLng: -74.006,
  priority: 'urgent',
}

describe('sessionSlice', () => {
  it('returns initial state', () => {
    const state = sessionReducer(undefined, { type: 'unknown' })
    expect(state.activeSession).toBeNull()
    expect(state.sessions).toEqual([])
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
  })

  describe('setActiveSession', () => {
    it('sets the active session', () => {
      const state = sessionReducer(undefined, setActiveSession(mockSession))
      expect(state.activeSession).toEqual(mockSession)
    })

    it('clears the active session when null', () => {
      const withSession = sessionReducer(undefined, setActiveSession(mockSession))
      const state = sessionReducer(withSession, setActiveSession(null))
      expect(state.activeSession).toBeNull()
    })
  })

  describe('addSession', () => {
    it('adds a session to the front of the list and sets it active', () => {
      const state = sessionReducer(undefined, addSession(mockSession))
      expect(state.sessions).toHaveLength(1)
      expect(state.sessions[0]).toEqual(mockSession)
      expect(state.activeSession).toEqual(mockSession)
    })

    it('prepends to existing sessions', () => {
      const existing = sessionReducer(undefined, addSession(mockSession))
      const newSession: EmergencySession = {
        ...mockSession,
        id: 'session-2',
        status: 'en_route',
      }
      const state = sessionReducer(existing, addSession(newSession))
      expect(state.sessions).toHaveLength(2)
      expect(state.sessions[0]!.id).toBe('session-2')
      expect(state.activeSession?.id).toBe('session-2')
    })
  })

  describe('updateSessionStatus', () => {
    it('updates the status of a session in the list', () => {
      const withSession = sessionReducer(undefined, addSession(mockSession))
      const state = sessionReducer(
        withSession,
        updateSessionStatus({ sessionId: 'session-1', status: 'en_route' }),
      )
      expect(state.sessions[0]!.status).toBe('en_route')
    })

    it('updates the active session status when it matches', () => {
      const withSession = sessionReducer(undefined, addSession(mockSession))
      const state = sessionReducer(
        withSession,
        updateSessionStatus({ sessionId: 'session-1', status: 'arrived' }),
      )
      expect(state.activeSession?.status).toBe('arrived')
    })

    it('does not affect other sessions', () => {
      const session2: EmergencySession = {
        ...mockSession,
        id: 'session-2',
        status: 'active',
      }
      const withSessions = sessionReducer(undefined, addSession(mockSession))
      const withSecond = sessionReducer(withSessions, addSession(session2))
      const state = sessionReducer(
        withSecond,
        updateSessionStatus({ sessionId: 'session-1', status: 'completed' }),
      )
      expect(state.sessions[0]!.status).toBe('active')
      expect(state.sessions[1]!.status).toBe('completed')
    })
  })

  describe('setSessions', () => {
    it('replaces the sessions list', () => {
      const state = sessionReducer(undefined, setSessions([mockSession]))
      expect(state.sessions).toHaveLength(1)
      expect(state.sessions[0]!.id).toBe('session-1')
    })

    it('clears sessions when given an empty array', () => {
      const withSession = sessionReducer(undefined, addSession(mockSession))
      const state = sessionReducer(withSession, setSessions([]))
      expect(state.sessions).toEqual([])
    })
  })

  describe('loading and error', () => {
    it('sets loading state', () => {
      const state = sessionReducer(undefined, setLoading(true))
      expect(state.loading).toBe(true)
    })

    it('sets error state', () => {
      const state = sessionReducer(undefined, setError('Something went wrong'))
      expect(state.error).toBe('Something went wrong')
    })

    it('clears error', () => {
      const withError = sessionReducer(undefined, setError('Error'))
      const state = sessionReducer(withError, clearError())
      expect(state.error).toBeNull()
    })
  })
})
