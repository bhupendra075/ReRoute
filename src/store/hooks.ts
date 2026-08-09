import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import type { AppDispatch, RootState } from './index'

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useAppSelector = <T>(selector: (state: RootState) => T, equalityFn?: (a: T, b: T) => boolean): T =>
  useSelector(selector, equalityFn)

export const useHospitals = () => useAppSelector((s) => s.hospitals.hospitals, shallowEqual)
export const useTriageSessions = () => useAppSelector((s) => s.triage.sessions, shallowEqual)
export const useEmergencySessions = () => useAppSelector((s) => s.session.sessions, shallowEqual)
export const useHospitalById = (id?: string) => useAppSelector((s) => s.hospitals.hospitals.find((h) => h.id === id))

// Selector utilities (pure functions) used by tests and elsewhere
export const selectUser = (s: RootState) => s.auth.user
export const selectIsAuthenticated = (s: RootState) => Boolean(s.auth.user)
export const selectAuthLoading = (s: RootState) => s.auth.loading
export const selectAuthError = (s: RootState) => s.auth.error

export const selectHospitals = (s: RootState) => s.hospitals.hospitals
export const selectSelectedHospital = (s: RootState) => s.hospitals.selectedHospital
export const selectHospitalsLoading = (s: RootState) => s.hospitals.loading
export const selectHospitalsError = (s: RootState) => s.hospitals.error
export const selectHospitalById = (s: RootState, id?: string) => s.hospitals.hospitals.find((h) => h.id === id)

export const selectTriageSessions = (s: RootState) => s.triage.sessions
export const selectTriageActiveSession = (s: RootState) => s.triage.activeSession
export const selectTriageLoading = (s: RootState) => s.triage.loading
export const selectTriageError = (s: RootState) => s.triage.error

export const selectEmergencySessions = (s: RootState) => s.session.sessions
export const selectActiveSession = (s: RootState) => s.session.activeSession
export const selectSessionLoading = (s: RootState) => s.session.loading
export const selectSessionError = (s: RootState) => s.session.error

export const selectTheme = (s: RootState) => s.settings.theme
export const selectNotificationsEnabled = (s: RootState) => s.settings.notificationsEnabled
export const selectDataSharingEnabled = (s: RootState) => s.settings.dataSharingEnabled
export const selectSettingsLoading = (s: RootState) => s.settings.loading
export const selectSettingsError = (s: RootState) => s.settings.error
