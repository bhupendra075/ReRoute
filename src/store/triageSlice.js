import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  sessions: [],
  activeSession: null,
  loading: false,
  error: null,
}

const triageSlice = createSlice({
  name: 'triage',
  initialState,
  reducers: {
    setSessions(state, action) {
      state.sessions = action.payload
    },
    setActiveSession(state, action) {
      state.activeSession = action.payload
    },
    addSession(state, action) {
      state.sessions.unshift(action.payload)
    },
    updateSession(state, action) {
      state.sessions = state.sessions.map((s) =>
        s.id === action.payload.id ? action.payload : s,
      )
      if (state.activeSession?.id === action.payload.id) {
        state.activeSession = action.payload
      }
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
  setSessions,
  setActiveSession,
  addSession,
  updateSession,
  setLoading,
  setError,
  clearError,
} = triageSlice.actions
export default triageSlice.reducer