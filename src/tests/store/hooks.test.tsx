import { describe, it, expect, beforeEach } from '@jest/globals'
import { renderHook, act } from '@testing-library/react'
import { useHospitals, useTriageSessions, useEmergencySessions, useHospitalById } from '@/store/hooks'
import { useAppSelector } from '@/store/hooks'
import type { RootState } from '@/store'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/store/authSlice'
import triageReducer from '@/store/triageSlice'
import hospitalReducer from '@/store/hospitalSlice'
import sessionReducer from '@/store/sessionSlice'
import settingsReducer from '@/store/settingsSlice'
import type { Hospital } from '@/types'
import type { TriageSession } from '@/types/triage'
import type { EmergencySession } from '@/types/triage'

const mockHospitals: Hospital[] = [
  { id: 'hosp-1', name: 'Hospital A', latitude: 0, longitude: 0, specializations: ['ICU'], capacity: { icu: 10, general: 50 }, isActive: true },
  { id: 'hosp-2', name: 'Hospital B', latitude: 1, longitude: 1, specializations: ['TRAUMA'], capacity: { icu: 5, general: 30 }, isActive: false },
]

const mockTriageSessions: TriageSession[] = [
  { id: 'session-1', patientId: 'patient-1', status: 'pending' },
  { id: 'session-2', patientId: 'patient-2', status: 'active' },
]

const mockEmergencySessions: EmergencySession[] = [
  { id: 'emerg-1', patientId: 'patient-1', status: 'active', originLat: 0, originLng: 0, priority: 'standard' },
]

function createTestStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: {
      auth: authReducer,
      triage: triageReducer,
      hospitals: hospitalReducer,
      session: sessionReducer,
      settings: settingsReducer,
      supabaseApi: () => ({}), // Mock reducer for supabaseApi
    },
    preloadedState: {
      auth: { user: { id: 'user-1', email: 'test@example.com', name: 'Test User' }, loading: false, error: null },
      hospitals: { hospitals: mockHospitals, selectedHospital: mockHospitals[0], loading: false, error: null },
      triage: { sessions: mockTriageSessions, activeSession: mockTriageSessions[0], loading: false, error: null },
      session: { activeSession: mockEmergencySessions[0], sessions: mockEmergencySessions, loading: false, error: null },
      settings: { theme: 'dark', notificationsEnabled: true, dataSharingEnabled: false, loading: false, error: null },
      supabaseApi: {},
      ...preloadedState,
    } as RootState,
  })
}

function renderHookWithStore<T>(hook: () => T, store = createTestStore()) {
  return { ...renderHook(hook, {
    wrapper: ({ children }) => (
      <Provider store={store}>{children}</Provider>
    ),
  }), store }
}

describe('shallowEqual hooks', () => {
  beforeEach(() => {
    createTestStore()
  })
  describe('useHospitals', () => {
    it('returns hospitals array', () => {
      const { result } = renderHookWithStore(() => useHospitals())
      expect(result.current).toHaveLength(2)
    })

    it('returns same reference when hospital contents are identical', () => {
      const { result, rerender } = renderHookWithStore(() => useHospitals())
      const firstResult = result.current
      rerender()
      expect(result.current).toBe(firstResult) // Same reference due to shallowEqual
    })

    it('returns new reference when hospital array changes', () => {
      const { result, store: testStore } = renderHookWithStore(() => useHospitals())
      const firstResult = result.current

      // Dispatch action to update hospitals
      act(() => {
        testStore.dispatch({ type: 'hospitals/setHospitals', payload: [
          { id: 'hosp-1', name: 'Hospital A', latitude: 0, longitude: 0, specializations: ['ICU'], capacity: { icu: 10, general: 50 }, isActive: true },
          { id: 'hosp-2', name: 'Hospital B', latitude: 1, longitude: 1, specializations: ['TRAUMA'], capacity: { icu: 5, general: 30 }, isActive: false },
          { id: 'hosp-3', name: 'Hospital C', latitude: 2, longitude: 2, specializations: ['PEDS'], capacity: { icu: 3, general: 20 }, isActive: true },
        ]})
      })

      expect(result.current).not.toBe(firstResult) // Different reference
      expect(result.current).toHaveLength(3)
    })

    it('returns new reference when hospital object properties change', () => {
      const { result, store: testStore } = renderHookWithStore(() => useHospitals())
      const firstResult = result.current

      act(() => {
        testStore.dispatch({ type: 'hospitals/setHospitals', payload: [
          { id: 'hosp-1', name: 'Hospital A Updated', latitude: 0, longitude: 0, specializations: ['ICU'], capacity: { icu: 10, general: 50 }, isActive: true },
          { id: 'hosp-2', name: 'Hospital B', latitude: 1, longitude: 1, specializations: ['TRAUMA'], capacity: { icu: 5, general: 30 }, isActive: false },
        ]})
      })

      expect(result.current).not.toBe(firstResult)
      expect(result.current[0]?.name).toBe('Hospital A Updated')
    })
  })

  describe('useTriageSessions', () => {
    it('returns triage sessions array', () => {
      const { result } = renderHookWithStore(() => useTriageSessions())
      expect(result.current).toHaveLength(2)
    })

    it('returns same reference when contents are identical', () => {
      const { result, rerender } = renderHookWithStore(() => useTriageSessions())
      const firstResult = result.current
      rerender()
      expect(result.current).toBe(firstResult)
    })

    it('returns new reference when sessions array changes', () => {
      const { result, store: testStore } = renderHookWithStore(() => useTriageSessions())
      const firstResult = result.current

      act(() => {
        testStore.dispatch({ type: 'triage/addSession', payload: { id: 'session-3', patientId: 'patient-3', status: 'pending' } })
      })

      expect(result.current).not.toBe(firstResult)
    })
  })

  describe('useEmergencySessions', () => {
    it('returns emergency sessions array', () => {
      const { result } = renderHookWithStore(() => useEmergencySessions())
      expect(result.current).toHaveLength(1)
    })

    it('returns same reference when contents are identical', () => {
      const { result, rerender } = renderHookWithStore(() => useEmergencySessions())
      const firstResult = result.current
      rerender()
      expect(result.current).toBe(firstResult)
    })
  })

  describe('useHospitalById', () => {
    it('returns hospital by id', () => {
      const { result } = renderHookWithStore(() => useHospitalById('hosp-1'))
      expect(result.current).toEqual(
        { id: 'hosp-1', name: 'Hospital A', latitude: 0, longitude: 0, specializations: ['ICU'], capacity: { icu: 10, general: 50 }, isActive: true }
      )
    })

    it('returns undefined for non-existent id', () => {
      const { result } = renderHookWithStore(() => useHospitalById('hosp-999'))
      expect(result.current).toBeUndefined()
    })

    it('returns same reference when hospital data is identical', () => {
      const { result, rerender } = renderHookWithStore(() => useHospitalById('hosp-1'))
      const firstResult = result.current
      rerender()
      expect(result.current).toBe(firstResult)
    })
  })

  describe('useAppSelector with shallowEqual', () => {
    it('prevents re-render when object contents are shallow equal', () => {
      const selector = jest.fn((state: RootState) => state.hospitals.hospitals)
      const { result, rerender } = renderHookWithStore(() => useAppSelector(selector, (a, b) => a === b || (Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((v, i) => v === b[i]))))

      const firstResult = result.current
      rerender()
      expect(result.current).toBe(firstResult)
    })

    it('returns new reference when array contents differ', () => {
      const selector = jest.fn((state: RootState) => state.hospitals.hospitals)
      const { result, store: testStore } = renderHookWithStore(() => useAppSelector(selector, (a, b) => a === b || (Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((v, i) => v === b[i]))))

      const firstResult = result.current

      act(() => {
        testStore.dispatch({ type: 'hospitals/setHospitals', payload: [
          { id: 'hosp-1', name: 'Hospital A', latitude: 0, longitude: 0, specializations: ['ICU'], capacity: { icu: 10, general: 50 }, isActive: true },
        ]})
      })

      expect(result.current).not.toBe(firstResult)
    })

    it('returns same reference for primitive values without shallowEqual', () => {
      const selector = jest.fn((state: RootState) => state.auth.loading)
      const { result, rerender } = renderHookWithStore(() => useAppSelector(selector))

      const firstResult = result.current
      rerender()
      expect(result.current).toBe(firstResult)
      expect(typeof result.current).toBe('boolean')
    })
  })
})