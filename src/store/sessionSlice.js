import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  activeSession: null,
  sessions: [],
  loading: false,
  error: null,
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setActiveSession(state, action) {
      state.activeSession = action.payload
    },
    addSession(state, action) {
      state.sessions.unshift(action.payload)
      state.activeSession = action.payload
    },
    updateSessionStatus(state, action) {
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
    setSessions(state, action) {
      state.sessions = action.payload
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    setError(state, action) {
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