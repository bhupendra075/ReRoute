import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { EmergencySession } from '@/types'

interface SessionState {
  activeSession: EmergencySession | null
  sessions: EmergencySession[]
  loading: boolean
  error: string | null
}

const initialState: SessionState = {
  activeSession: null,
  sessions: [],
  loading: false,
  error: null,
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setActiveSession(state, action: PayloadAction<EmergencySession | null>) {
      state.activeSession = action.payload
    },
    addSession(state, action: PayloadAction<EmergencySession>) {
      state.sessions.unshift(action.payload)
      state.activeSession = action.payload
    },
    updateSessionStatus(
      state,
      action: PayloadAction<{ sessionId: string; status: EmergencySession['status'] }>,
    ) {
      state.sessions = state.sessions.map((s) =>
        s.id === action.payload.sessionId ? { ...s, status: action.payload.status } : s,
      )
      if (state.activeSession?.id === action.payload.sessionId) {
        state.activeSession = {
          ...state.activeSession,
          status: action.payload.status,
        }
      }
    },
    setSessions(state, action: PayloadAction<EmergencySession[]>) {
      state.sessions = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    clearError(state) {
      state.error = null
    },
  },
})

export const {
  setActiveSession,
  addSession,
  updateSessionStatus,
  setSessions,
  setLoading,
  setError,
  clearError,
} = sessionSlice.actions
export default sessionSlice.reducer
