import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { EmergencySession } from '@/types'

interface TriageState {
  sessions: EmergencySession[]
  activeSession: EmergencySession | null
  loading: boolean
  error: string | null
}

const initialState: TriageState = {
  sessions: [],
  activeSession: null,
  loading: false,
  error: null,
}

const triageSlice = createSlice({
  name: 'triage',
  initialState,
  reducers: {
    setSessions(state, action: PayloadAction<EmergencySession[]>) {
      state.sessions = action.payload
    },
    setActiveSession(state, action: PayloadAction<EmergencySession | null>) {
      state.activeSession = action.payload
    },
    addSession(state, action: PayloadAction<EmergencySession>) {
      state.sessions.unshift(action.payload)
    },
    updateSession(state, action: PayloadAction<EmergencySession>) {
      state.sessions = state.sessions.map((s) =>
        s.id === action.payload.id ? action.payload : s,
      )
      if (state.activeSession?.id === action.payload.id) {
        state.activeSession = action.payload
      }
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
  setSessions,
  setActiveSession,
  addSession,
  updateSession,
  setLoading,
  setError,
  clearError,
} = triageSlice.actions
export default triageSlice.reducer
