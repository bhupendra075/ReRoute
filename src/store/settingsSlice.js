import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  theme: 'system',
  notificationsEnabled: true,
  dataSharingEnabled: false,
  loading: false,
  error: null,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload
    },
    setNotificationsEnabled(state, action) {
      state.notificationsEnabled = action.payload
    },
    setDataSharingEnabled(state, action) {
      state.dataSharingEnabled = action.payload
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
  setTheme,
  setNotificationsEnabled,
  setDataSharingEnabled,
  setLoading,
  setError,
  clearError,
} = settingsSlice.actions
export default settingsSlice.reducer