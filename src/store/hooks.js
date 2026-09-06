import { useDispatch, useSelector, shallowEqual } from 'react-redux'

export const useAppDispatch = () => useDispatch()
export const useAppSelector = (selector, equalityFn) =>
  useSelector(selector, equalityFn)

export const useHospitals = () => useAppSelector((s) => s.hospitals.hospitals, shallowEqual)
export const useTriageSessions = () => useAppSelector((s) => s.triage.sessions, shallowEqual)
export const useEmergencySessions = () => useAppSelector((s) => s.session.sessions, shallowEqual)
export const useHospitalById = (id) => useAppSelector((s) => s.hospitals.hospitals.find((h) => h.id === id))

// Selector utilities (pure functions) used by tests and elsewhere
export const selectUser = (s) => s.auth.user
export const selectIsAuthenticated = (s) => Boolean(s.auth.user)
export const selectAuthLoading = (s) => s.auth.loading
export const selectAuthError = (s) => s.auth.error

export const selectHospitals = (s) => s.hospitals.hospitals
export const selectSelectedHospital = (s) => s.hospitals.selectedHospital
export const selectHospitalsLoading = (s) => s.hospitals.loading
export const selectHospitalsError = (s) => s.hospitals.error
export const selectHospitalById = (s, id) => s.hospitals.hospitals.find((h) => h.id === id)

export const selectTriageSessions = (s) => s.triage.sessions
export const selectTriageActiveSession = (s) => s.triage.activeSession
export const selectTriageLoading = (s) => s.triage.loading
export const selectTriageError = (s) => s.triage.error

export const selectEmergencySessions = (s) => s.session.sessions
export const selectActiveSession = (s) => s.session.activeSession
export const selectSessionLoading = (s) => s.session.loading
export const selectSessionError = (s) => s.session.error

export const selectTheme = (s) => s.settings.theme
export const selectNotificationsEnabled = (s) => s.settings.notificationsEnabled
export const selectDataSharingEnabled = (s) => s.settings.dataSharingEnabled
export const selectSettingsLoading = (s) => s.settings.loading
export const selectSettingsError = (s) => s.settings.error