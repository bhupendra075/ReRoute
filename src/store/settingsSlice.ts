import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SettingsState {
  theme: 'light' | 'dark' | 'system'
  notificationsEnabled: boolean
  dataSharingEnabled: boolean
  loading: boolean
  error: string | null
}

const initialState: SettingsState = {
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
    setTheme(state, action: PayloadAction<'light' | 'dark' | 'system'>) {
      state.theme = action.payload
    },
    setNotificationsEnabled(state, action: PayloadAction<boolean>) {
      state.notificationsEnabled = action.payload
    },
    setDataSharingEnabled(state, action: PayloadAction<boolean>) {
      state.dataSharingEnabled = action.payload
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
  setTheme,
  setNotificationsEnabled,
  setDataSharingEnabled,
  setLoading,
  setError,
  clearError,
} = settingsSlice.actions
export default settingsSlice.reducer
