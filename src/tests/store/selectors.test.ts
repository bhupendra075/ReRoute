import { describe, it, expect } from '@jest/globals'
import {
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectHospitals,
  selectSelectedHospital,
  selectHospitalsLoading,
  selectHospitalsError,
  selectHospitalById,
  selectTriageSessions,
  selectTriageActiveSession,
  selectTriageLoading,
  selectTriageError,
  selectEmergencySessions,
  selectActiveSession,
  selectSessionLoading,
  selectSessionError,
  selectTheme,
  selectNotificationsEnabled,
  selectDataSharingEnabled,
  selectSettingsLoading,
  selectSettingsError,
} from '@/store/hooks'
import type { RootState } from '@/store'

const mockRootState: RootState = {
  auth: {
    user: { id: 'user-1', email: 'test@example.com', name: 'Test User' },
    loading: false,
    error: null,
  },
  hospitals: {
    hospitals: [
      { id: 'hosp-1', name: 'Hospital A', latitude: 0, longitude: 0, specializations: ['ICU'], capacity: { icu: 10, general: 50 }, isActive: true },
      { id: 'hosp-2', name: 'Hospital B', latitude: 1, longitude: 1, specializations: ['TRAUMA'], capacity: { icu: 5, general: 30 }, isActive: false },
    ],
    selectedHospital: { id: 'hosp-1', name: 'Hospital A', latitude: 0, longitude: 0, specializations: ['ICU'], capacity: { icu: 10, general: 50 }, isActive: true },
    loading: false,
    error: null,
  },
  triage: {
    sessions: [
      { id: 'session-1', patientId: 'patient-1', status: 'pending' },
      { id: 'session-2', patientId: 'patient-2', status: 'active' },
    ],
    activeSession: { id: 'session-1', patientId: 'patient-1', status: 'pending' },
    loading: false,
    error: null,
  },
  session: {
    sessions: [
      { id: 'emerg-1', patientId: 'patient-1', status: 'active' },
    ],
    activeSession: { id: 'emerg-1', patientId: 'patient-1', status: 'active' },
    loading: false,
    error: null,
  },
  settings: {
    theme: 'dark',
    notificationsEnabled: true,
    dataSharingEnabled: false,
    loading: false,
    error: null,
  },
  supabaseApi: {} as any,
}

describe('memoized selectors', () => {
  describe('Auth selectors', () => {
    it('selectUser returns user object', () => {
      expect(selectUser(mockRootState)).toEqual(mockRootState.auth.user)
    })

    it('selectIsAuthenticated returns true when user exists', () => {
      expect(selectIsAuthenticated(mockRootState)).toBe(true)
    })

    it('selectIsAuthenticated returns false when user is null', () => {
      const state = { ...mockRootState, auth: { ...mockRootState.auth, user: null } }
      expect(selectIsAuthenticated(state)).toBe(false)
    })

    it('selectAuthLoading returns loading state', () => {
      expect(selectAuthLoading(mockRootState)).toBe(false)
    })

    it('selectAuthError returns error state', () => {
      expect(selectAuthError(mockRootState)).toBeNull()
    })
  })

  describe('Hospitals selectors', () => {
    it('selectHospitals returns hospitals array', () => {
      expect(selectHospitals(mockRootState)).toHaveLength(2)
    })

    it('selectSelectedHospital returns selected hospital', () => {
      expect(selectSelectedHospital(mockRootState)).toEqual(mockRootState.hospitals.selectedHospital)
    })

    it('selectHospitalsLoading returns loading state', () => {
      expect(selectHospitalsLoading(mockRootState)).toBe(false)
    })

    it('selectHospitalsError returns error state', () => {
      expect(selectHospitalsError(mockRootState)).toBeNull()
    })

    it('selectHospitalById returns matching hospital', () => {
      expect(selectHospitalById(mockRootState, 'hosp-1')).toEqual(mockRootState.hospitals.hospitals[0])
    })

    it('selectHospitalById returns undefined for non-existent id', () => {
      expect(selectHospitalById(mockRootState, 'hosp-999')).toBeUndefined()
    })
  })

  describe('Triage selectors', () => {
    it('selectTriageSessions returns sessions array', () => {
      expect(selectTriageSessions(mockRootState)).toHaveLength(2)
    })

    it('selectTriageActiveSession returns active session', () => {
      expect(selectTriageActiveSession(mockRootState)).toEqual(mockRootState.triage.activeSession)
    })

    it('selectTriageLoading returns loading state', () => {
      expect(selectTriageLoading(mockRootState)).toBe(false)
    })

    it('selectTriageError returns error state', () => {
      expect(selectTriageError(mockRootState)).toBeNull()
    })
  })

  describe('Session selectors', () => {
    it('selectEmergencySessions returns sessions array', () => {
      expect(selectEmergencySessions(mockRootState)).toHaveLength(1)
    })

    it('selectActiveSession returns active session', () => {
      expect(selectActiveSession(mockRootState)).toEqual(mockRootState.session.activeSession)
    })

    it('selectSessionLoading returns loading state', () => {
      expect(selectSessionLoading(mockRootState)).toBe(false)
    })

    it('selectSessionError returns error state', () => {
      expect(selectSessionError(mockRootState)).toBeNull()
    })
  })

  describe('Settings selectors', () => {
    it('selectTheme returns theme', () => {
      expect(selectTheme(mockRootState)).toBe('dark')
    })

    it('selectNotificationsEnabled returns notifications setting', () => {
      expect(selectNotificationsEnabled(mockRootState)).toBe(true)
    })

    it('selectDataSharingEnabled returns data sharing setting', () => {
      expect(selectDataSharingEnabled(mockRootState)).toBe(false)
    })

    it('selectSettingsLoading returns loading state', () => {
      expect(selectSettingsLoading(mockRootState)).toBe(false)
    })

    it('selectSettingsError returns error state', () => {
      expect(selectSettingsError(mockRootState)).toBeNull()
    })
  })

  describe('Memoization (reference stability)', () => {
    it('returns same reference for identical inputs (selectHospitals)', () => {
      const result1 = selectHospitals(mockRootState)
      const result2 = selectHospitals(mockRootState)
      expect(result1).toBe(result2) // Same reference due to memoization
    })

    it('returns same reference for identical inputs (selectTriageSessions)', () => {
      const result1 = selectTriageSessions(mockRootState)
      const result2 = selectTriageSessions(mockRootState)
      expect(result1).toBe(result2)
    })

    it('returns same reference for identical inputs (selectEmergencySessions)', () => {
      const result1 = selectEmergencySessions(mockRootState)
      const result2 = selectEmergencySessions(mockRootState)
      expect(result1).toBe(result2)
    })

    it('returns different reference when input changes (selectHospitals)', () => {
      const result1 = selectHospitals(mockRootState)
      const modifiedState = {
        ...mockRootState,
        hospitals: { ...mockRootState.hospitals, hospitals: [...mockRootState.hospitals.hospitals, { id: 'hosp-3', name: 'Hospital C', latitude: 2, longitude: 2, specializations: ['PEDS'], capacity: { icu: 3, general: 20 }, isActive: true }] },
      }
      const result2 = selectHospitals(modifiedState)
      expect(result1).not.toBe(result2) // Different reference when input changes
    })

    it('returns different reference when input changes (selectHospitalById)', () => {
      const result1 = selectHospitalById(mockRootState, 'hosp-1')
      const modifiedState = {
        ...mockRootState,
        hospitals: { ...mockRootState.hospitals, hospitals: [{ ...mockRootState.hospitals.hospitals[0]!, name: 'Updated Hospital' }] },
      }
      const result2 = selectHospitalById(modifiedState, 'hosp-1')
      expect(result1).not.toBe(result2)
    })
  })
})